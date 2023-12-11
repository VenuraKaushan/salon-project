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
    },
    appointmentDate:{
        type: String,
    },
    serviceType: {
        type: String,
    },
    workr:{
        type: String,
    },
    isHide:{
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Invoice = mongoose.model("invoice", invoiceSchema);

export default Invoice;