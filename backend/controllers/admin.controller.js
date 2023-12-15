import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/users.model.js";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointment.model.js";
import { sendAppointmentMail } from "../mails/appointment.mails.js";
import { format } from 'date-fns';

//admin login function
export const adminLogin = async (req, res) => {
  // get details from the request body
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);
  User.find({ email: email })
    .then((data) => {
      if (data.length > 0) {
        // extract user details from user array
        data = data[0];

        //   compare database password and user entered password and role
        if (
          bcrypt.compareSync(password, data.password) &&
          data.role === "ADMIN"
        ) {
          // create access Token
          const accessToken = jwt.sign(
            { _id: data._id, role: data.role },
            process.env.SECRET_KEY,
            { expiresIn: 24 * 60 * 60 }
          ); //access Token will expires in 1 day

          //   set access Token as a http only cookie
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
          }); //this cookie expires in 1 day

          //   create user details
          const userDetails = {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone,
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

export const logout = (req, res) => {
  res.cookie("accessToken", "", { maxAge: 1 });
  res.status(200).json({});
};

//generate appintment Id
const generateAppointmentID = async () => {
  //get last Appointment object, if there is a Appointment, then return that Appointment object, otherwise return empty array
  const lastAppointmentDetails = await Appointment.find({ role: "GUEST" }).sort({ _id: -1 }).limit(1);

  //check if the result array is empty or not, if its empty then return first Appointment ID
  if (lastAppointmentDetails.length == 0) {
    return "APT-1";
  }

  //if array is not null, last get last Appointment Id
  const appointmentId = lastAppointmentDetails.map((data) => {
    return data.id;
  });


  //then we get the Integer value from the last part of the ID
  const oldAppointmentId = parseInt(appointmentId[0].split("-")[1]);

  const newAppointmentId = oldAppointmentId + 1; //then we add 1 to the past value

  return `APT-${newAppointmentId}`;//return newAppointmentId
};


//add appointment using admin dashboard
export const addAppintmentAsAdmin = async (req, res) => {
  try {
    const customAppointmentId = await generateAppointmentID();
    console.log('Input Time:', req.body.time);
    console.log('Input date:', req.body.date);

    const cusName = req.body.clientName;
    const cusEmail = req.body.clientEmail;
    const time = req.body.time;
    const date = new Date(req.body.date);
    const formattedDate = date.toDateString();

    const newAppointment = new Appointment({
      id: customAppointmentId,
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail,
      clientPhone: req.body.clientPhone,
      serviceType: req.body.serviceType,
      time: req.body.time,
      date: date,
    });

    console.log(date);
    console.log(formattedDate);
    console.log(newAppointment);

    const savedAppointment = await newAppointment.save()

    //send an email to the user
    sendAppointmentMail(cusName, cusEmail, time, formattedDate)

    res.status(201).json(savedAppointment);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to add Appointment", error });
  }
};

export const assignWorker = async (req, res) => {

  const _id = req.params.id;

  try {
    const updateFields = {
      workr: req.body.workerName
    }
    const savedWorker = await Appointment.findByIdAndUpdate(_id, updateFields, { new: true });

    res.status(201).json(savedWorker);

  } catch (err) {
    res.status(500).json({ message: "Failed to assign worker", err });

  }

};

export const addServiceChargeAndChangeStatus = async (req, res) => {

  const _id = req.params.id;

  try {

    const updateFields = {
      serviceCharge: req.body.amount,
      status: "COMPLETE"
    }

    const savedCharge = await Appointment.findByIdAndUpdate(_id, updateFields, { new: true });

    res.status(201).json(savedCharge);


  } catch (err) {
    res.status(500).json({ message: "Failed to add service charge", err });
  }
}

//secrete admin login function
export const secreteAdminLogin = async (req, res) => {
  // get details from the request body
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);
  User.find({ email: email })
    .then((data) => {
      if (data.length > 0) {
        // extract user details from user array
        data = data[0];

        //   compare database password and user entered password and role
        if (
          bcrypt.compareSync(password, data.password) &&
          data.role === "SECRETEADMIN"
        ) {
          // create access Token
          const accessToken = jwt.sign(
            { _id: data._id, role: data.role },
            process.env.SECRET_KEY,
            { expiresIn: 24 * 60 * 60 }
          ); //access Token will expires in 1 day

          //   set access Token as a http only cookie
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
          }); //this cookie expires in 1 day

          //   create user details
          const userDetails = {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone,
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
