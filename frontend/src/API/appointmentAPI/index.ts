import axios from "axios";

const BASE_URL = "http://localhost:3001";


class AppointmentAPI{

    //add appointment
    static addAppointment (values:{
        clientName:string,
        clientEmail:string,
        clientPhone:string,
        time :Date,
        serviceType :string,
    }){
        console.log(values)
        return axios.post(`${BASE_URL}/appointment/add`,values,{withCredentials:true});

    };

    static checkDate (values:{
        date:string,
    }){
        console.log(values)
        return axios.post(`${BASE_URL}/appointment/date`,values,{withCredentials:true});
    }


}
export default AppointmentAPI;