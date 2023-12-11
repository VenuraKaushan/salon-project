import axios from "axios";
import { format } from 'date-fns';


const BASE_URL = "http://localhost:3001";

class AdminAPI {
    //login admin
    static login (values : {email : string, password : string}) {
        return axios.post(`${BASE_URL}/admin/login`,values,{withCredentials:true});
    }

    static hiddenLogin (values : {email : string, password : string}) {
        return axios.post(`${BASE_URL}/admin/hidden/login`,values,{withCredentials:true});
    }

    static addAppintmentAsAdminViaDate = (values:{
        clientName:string,
        clientEmail:string,
        clientPhone:string,
        time :String,
        serviceType :string,
        date :string,
    }) =>{
        console.log(values)
        return axios.post(`${BASE_URL}/admin/appointment/add`,values,{withCredentials:true});
    }

    static addAppintmentAsAdminViaTime = (values: {
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        date: string,
        serviceType: string,
        time: string,
      }) => {
        // Convert 24-hour time to 12-hour time
        const formattedTime = format(new Date(`2022-01-01 ${values.time}`), 'hh:mm a');
      
        // Log the formatted time for debugging
        console.log('Formatted Time:', formattedTime);
      
        // Include the formatted time in the request
        const updatedValues = { ...values, time: formattedTime };
      
        // Log the updated values for debugging
        console.log('Updated Values:', updatedValues);
      
        // Send the request with the updated values
        return axios.post(`${BASE_URL}/admin/appointment/add`, updatedValues, { withCredentials: true });
      };

    static getAllNewAppointmentsByAdmin = () =>{

        return axios.get(`${BASE_URL}/appointment`,{withCredentials:true})
    };

    static checkDate (values:{
        date:string,
    }){
        console.log(values)
        return axios.post(`${BASE_URL}/appointment/date`,values,{withCredentials:true});
    };

    static assignWorker(values:{
        _id:string,
        workerName:string,
    }){
        console.log(values)
        return axios.put(`${BASE_URL}/admin/assign/worker/${values._id}`,values,{withCredentials:true});
    }

    static getAllAssignedAppointmentsByAdmin =()=>{
        return axios.get(`${BASE_URL}/appointment/assigned`,{withCredentials:true})
    }

    static addServiceChargeAndChangeStatus(values:{
        _id:string,
        amount:string,
    }){
        console.log(values)
        return axios.put(`${BASE_URL}/admin/add/amount/${values._id}`,values,{withCredentials:true});
    }

    static checkTime (values:{
        time:string,
    }){
        console.log(values)
        return axios.post(`${BASE_URL}/appointment/time`,values,{withCredentials:true});
    };
}

export default AdminAPI;