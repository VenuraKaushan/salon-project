import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/users.model.js";
import jwt from "jsonwebtoken";


//generate client Id
const generateWClientId = async () => {
    //get last client object, if there is a client, then return that client object, otherwise return empty array
    const lastClientDetails = await User.find({role:"CLIENT"}).sort({ _id: -1 }).limit(1);
  
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
  
    return  `CLT-${newClientId}`;//return new client Id
  };
  


//register client
export const registerClient = async (req, res) => {

    try {
      const existingClient = await User.findOne({email:req.body.email });
    if (existingClient) {
      console.log("user exist");
      return res.status(409).json({ message: "User already exists" });
    }
  
    // generating the custom ID
    const customId = await generateWClientId();
    
    // hashing the password
    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    
    const newClient = new User({  
      id : customId,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      role:"CLIENT",
      address: req.body.address,
    });
    
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
    } catch (error) {
      res.status(500).json({ message: "Failed to register to the system", error });
    }
  };
  