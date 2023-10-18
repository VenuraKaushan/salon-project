import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/users.model.js";
import jwt from "jsonwebtoken";


//generate client Id
const generateWClientId = async () => {
  //get last client object, if there is a client, then return that client object, otherwise return empty array
  const lastClientDetails = await User.find({ role: "CLIENT" }).sort({ _id: -1 }).limit(1);

  //check if the result array is empty or not, if its empty then return first client ID
  if (lastClientDetails.length == 0) {
    return "CLT-1";
  }

  //if array is not null, last get last client Id
  const clientId = lastClientDetails.map((data) => {
    return data.id;
  });


  //then we get the Integer value from the last part of the ID
  const oldClientId = parseInt(clientId[0].split("-")[1]);

  const newClientId = oldClientId + 1; //then we add 1 to the past value

  return `CLT-${newClientId}`;//return new client Id
};



//register client
export const registerClient = async (req, res) => {

  try {
    const existingClient = await User.findOne({ email: req.body.email });
    if (existingClient) {
      console.log("user exist");
      return res.status(409).json({ message: "User already exists" });
    }

    // generating the custom ID
    const customId = await generateWClientId();

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const newClient = new User({
      id: customId,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      role: "CLIENT",
      address: req.body.address,
    });


    const savedClient = await newClient.save();

    console.log(savedClient);

    res.status(201).json(savedClient);
  } catch (error) {
    res.status(500).json({ message: "Failed to register to the system", error });
  }
};

//client login
export const clientLogin = async (req, res) => {
  // get details from the request body
  const email = req.body.email;
  const password = req.body.password;

  User.find({ email: email })
    .then((data) => {
      if (data.length > 0) {
        // extract user details from user array
        data = data[0];

        //   compare database password and user entered password and role
        if (
          bcrypt.compareSync(password, data.password) &&
          (data.role === "CLIENT")
        ) {

          // create access Token
          const accessToken = jwt.sign(
            { _id: data._id, role: data.role },
            process.env.SECRET_KEY,
            { expiresIn: 24 * 60 * 60 }
          ); //access Token will expires in 1 day



          //   set access Token as a http only cookie
          res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: false });//this cookie expires in 1 day

          //   create user details
          const userDetails = {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone
          };

          //   sends the user details
          res.status(200).json(userDetails);

        } else {
          throw new Error("Password is wrong");
        }
      } else {
        throw new Error("Does not exist this user");
      }
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
};