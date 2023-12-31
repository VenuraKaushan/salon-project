import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    product_id:{
        type : String,
        unique : true,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    brand :{
        type : String,
        required : true,
    },
    price :{
        type : Number,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    category :{
        type : String,
        required : true,
    },
    code : {
        type : String,
        required : true,
    },
    quantity: {
        type : Number,
        required : true,
    },
    added_date : {
        type : String,
        required : true
    },
    expire_date:{
        type : String,
        required : true
    },
    supplier : {
        type : String,
        required : true
    },
    image: {
        type : String,
        required : true
    },
    // usageHistory: [
    //     {
    //         quantityUsed: {
    //             type: Number,
    //         },
    //         reasonForUse: {
    //             type: String,
    //         },
    //         timestamp: {
    //             type: Date,
    //             default: Date.now,
    //         },
    //     },
    // ],  
    

},{timeStamps : true});


const Product = mongoose.model("product",productSchema);

export default Product;