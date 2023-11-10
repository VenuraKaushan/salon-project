import axios from "axios";

const BASE_URL = "http://localhost:3001";

class AdminAPI {
    //login admin
    static login (values : {email : string, password : string}) {
        return axios.post(`${BASE_URL}/admin/login`,values,{withCredentials:true});
    }

    static addAppintmentAsAdmin = (values:{
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
}

export default AdminAPI;