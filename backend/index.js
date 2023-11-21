import express from 'express';
import "dotenv/config";
import cors from 'cors';
import dbConnect from './configs/dbConfig.js';
import AdminRoutes from './routes/admin.routes.js';
import ClientRoutes from './routes/client.routes.js';
import cookieParser from "cookie-parser";
import AppointmentRoutes from "./routes/appointment.routes.js";
import ProductRoutes from "./routes/product.routes.js";

//initialized express
const app = express();

// SERVER PORT
const PORT = process.env.PORT || 6001;

// CORS [allow the pass the cookies to orin localhost]
app.use(cors({credentials : true,origin : 'http://localhost:3000'}));

// initialized cookie parser middleware
app.use(cookieParser());

// accept JSONS
app.use(express.json({limit : "100mb"}));

// config the urlEncoded middleware
app.use(express.urlencoded({extended : false}));


app.use((req,res,next)=>{
    console.log(`${req.method} =====> URL: ${req.url}`);
    next();
});

// root end point
app.get("/",(req,res)=>{
    res.send("Welcome to Salon!"); 
});


// redirect to admin routes
app.use('/admin',AdminRoutes);

// redirects to client routes
app.use('/client',ClientRoutes);

// redirects to appointment routes
app.use('/appointment',AppointmentRoutes)

//redirects to product routes
app.use('/product',ProductRoutes)


app.listen(PORT,()=>{
    console.log(`🚀💀 Server is started on port ${PORT}!`);
    dbConnect();
});
