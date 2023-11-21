import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    cusName: {
        type: String,
        required: true,
    },
    invoice_id: {
        type: String,
        required: true,
    },
    cusAddress: {
        type: String,
        default: 'not mentioned'
    },
    cusPhone: {
        type: String,
        required: true,
    },
    cusEmail: {
        type: String,
    },
    issuedDate: {
        type: Date,
        required: true,
    },
    items: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
            },
            price: {
                type: Number,
                default: 0
            },
            brand: {
                type: String,
            },
            price: {
                type: Number,
                default: 0
            },
            quantity: {
                type: Number,
                default: 0
            },
            totalPrice: {
                type: Number,
                default: 0
            },
            warranty: {
                type: String,
            }
        }
    ],
    totalActualPrice: {
        type: Number,
        default: 0
    },
    totalSoldPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    appointmentTime: {
        type: String,
        required: true,
    },
    appointmentDate:{
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
    },
    workr:{
        type: String,
        required: true,
    },
    serviceCharge:{
        type: String,
        required: true,
    },
}, { timestamps: true });

const Invoice = mongoose.model("invoice", invoiceSchema);

export default Invoice;