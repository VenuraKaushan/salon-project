import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    clientName: {
        type: String,
        required: true,
    },
    clientEmail: {
        type: String,
        required: true,

    },
    clientPhone: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "GUEST",
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "PENDING",
    },
    workr:{
        type: String,
        default: "NaN",
    },
    serviceCharge:{
        type: String,
    },
}, { timeStamps: true });


const Appointment = mongoose.model("appointments", userSchema);

export default Appointment;