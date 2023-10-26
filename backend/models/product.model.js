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
        type : String,
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
        type : String,
        required : true,
    },
    

},{timeStamps : true});


const Product = mongoose.model("product",productSchema);

export default Product;