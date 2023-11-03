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

    static getAllAppointmentsByAdmin = () =>{

        return axios.get(`${BASE_URL}/appointment`,{withCredentials:true})
    };

    static checkDate (values:{
        date:string,
    }){
        console.log(values)
        return axios.post(`${BASE_URL}/appointment/date`,values,{withCredentials:true});
    };
}

export default AdminAPI;