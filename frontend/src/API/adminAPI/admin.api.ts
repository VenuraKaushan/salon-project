import axios from "axios";

const BASE_URL = "http://localhost:3001";

class AdminAPI {
    //login admin
    static login (values : {email : string, password : string}) {
        return axios.post(`${BASE_URL}/admin/login`,values,{withCredentials:true});
    }
}

export default AdminAPI;