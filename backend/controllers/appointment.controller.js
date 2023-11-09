import Appointment from "../models/appointment.model.js"
import "dotenv/config";
import { sendAppointmentMail } from "../mails/appointment.mails.js";



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

export const addGuestAppointment = async (req, res) => {
    try {
        const customAppointmentId = await generateAppointmentID();

        const newAppointment = new Appointment({
            id: customAppointmentId,
            clientName: req.body.clientName,
            clientEmail: req.body.clientEmail,
            clientPhone: req.body.clientPhone,
            serviceType: req.body.serviceType,
            time: req.body.time,
            date: req.body.date,
        });

        const cusName = req.body.clientName;
        const cusEmail = req.body.clientEmail;
        const time = req.body.time;
        const date = new Date(req.body.date);
        const formattedDate = date.toDateString();


        console.log(newAppointment);

        const savedAppointment = await newAppointment.save()

        //send an email to the user
        sendAppointmentMail(cusName, cusEmail, time, formattedDate)

        res.status(201).json(savedAppointment);

    } catch (error) {
        res.status(500).json({ message: "Failed to add Appointment", error });
    }
};


export const checkDate = async (req, res) => {
    try {
        const date = req.body.date;
        const booked = [];
        const free = [];

        // Use Mongoose to find all appointments with the given date
        const appointments = await Appointment.find({ date });

        // Get all appointments time
        appointments.forEach((index) => {
            if (index.status === "PENDING") {
                booked.push(index.time);
            }
        });

        console.log("Booked slots:", booked);

        // Generate times between 8:00 AM and 9:00 PM
        const startTime = new Date();
        startTime.setHours(8, 0, 0, 0);
        const endTime = new Date();
        endTime.setHours(21, 0, 0, 0);

        const currentTime = new Date(startTime);

        // Function to check if a time is at least 60 minutes away from any other time
        const isTimeFree = (timeToCheck) => {
            for (const bookedTime of booked) {
                const bookedDate = new Date(`2000-01-01 ${bookedTime}`);
                const currentDate = new Date(`2000-01-01 ${timeToCheck}`);
                const diffInMinutes = (bookedDate - currentDate) / (1000 * 60);
                if (Math.abs(diffInMinutes) < 60) {
                    return false;
                }
            }
            return true;
        };

        // Loop through times and check if they are in the booked array and have at least 60 minutes before and after
        while (currentTime <= endTime) {
            const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (!booked.includes(timeString) && isTimeFree(timeString)) {
                free.push(timeString);
            }

            currentTime.setMinutes(currentTime.getMinutes() + 60); // Increment by 15 minutes
        }

        console.log("Free slots:", free);

        res.status(200).json({ free });
    } catch (error) {
        res.status(500).json({ message: "Failed to Check appointment times", error });
    }
};


export const getAllAppointmentsByAdmin = async (req, res) => {
    try {
        const appointments = await Appointment.find({ workr: "NaN" })

        res.status(200).json(appointments)
    } catch (err) {
        res.status(500).json({ message: "Failed to Get Appointments", err });
    }

}

export const getAllAssignedAppointmentsByAdmin = async (req, res) => {

    try {
        const assignedAppointments = await Appointment.find({ workr: { $ne: "NaN" } });
        res.status(200).json(assignedAppointments)


    } catch (err) {

        res.status(500).json({ message: "Failed to Get Appointments", err });

    }
}
