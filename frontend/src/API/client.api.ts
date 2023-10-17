import axios from "axios";

const BASE_URL = "http://localhost:3001";


class ClientAPI{


    static clientReg (values : {name : string, email : string,password : string, phone : string,address:string}) {
        console.log(values);
        return axios.post(`${BASE_URL}/client/register`,values,{withCredentials:true});
    }

    //login
    static login (values : {email : string, password : string}) {
        return axios.post(`${BASE_URL}/client/login`,values,{withCredentials:true});
    }


}
export default ClientAPI;