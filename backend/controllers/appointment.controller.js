import Appointment from "../models/appointment.model.js"
import "dotenv/config";




//generate client Id
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

        //get last Appointment object, if there is a Appointment, then return that Appointment object, otherwise return empty array
        const lastGuestAppointment = await Appointment.findOne({ role: "GUEST" }).sort({ _id: -1 }).select('time');

        if (lastGuestAppointment) {
            const lastGuestAppointmentTime = lastGuestAppointment.time;
            console.log("Original Time:", lastGuestAppointmentTime);

            // Split the time into hours, minutes, and period (AM or PM)
            const timeParts = lastGuestAppointmentTime.split(' ');
            const time = timeParts[0]; // "HH:mm"
            const period = timeParts[1]; // "AM" or "PM"

            // Split the time into hours and minutes
            const [hours, minutes] = time.split(':').map(Number);

            // Convert to 24-hour format
            let updatedHours = hours;
            if (period === 'PM' && hours !== 12) {
                updatedHours += 12;
            }

            // Add one hour
            updatedHours += 1;

            // Format hours and minutes as "HH:mm"
            const updatedTime = `${updatedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

            console.log("Updated Time:", updatedTime);

            if (lastGuestAppointmentTime === newAppointment.time) {
                res.status(400).send("There is already an appointment within one hour of your requested time. Please choose another time.");

            }
            else if (updatedTime <= newAppointment.time) {

                const savedAppointment = await newAppointment.save();
                res.status(201).json(savedAppointment);
            }
            else {
                res.status(400).send("There is already an appointment within one hour of your requested time. Please choose another time.");
            }
        } else {
            // Handle the case where there are no "GUEST" appointments.
            console.log("No GUEST appointments found.");
        }


    } catch (error) {
        res.status(500).json({ message: "Failed to add Appointment", error });
    }
};



