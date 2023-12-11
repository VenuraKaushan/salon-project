import axios from "axios";

const BASE_URL = "http://localhost:3001";

class InvoiceAPI{
    static submitInvoice = (values : any) =>{
        console.log(values);
        return axios.post(`${BASE_URL}/invoice/add`,values,{withCredentials:true});
    }
    static getAllInvoice =()=>{
        return axios.get(`${BASE_URL}/invoice/`,{withCredentials:true});
    }

    static addServiceInvoice=(values:any)=>{
        console.log(values);
        return axios.post(`${BASE_URL}/invoice/addInvoice`,values,{withCredentials:true});
    }

    static getAllInvoiceBySecretAdmin = ()=>{
        return axios.get(`${BASE_URL}/invoice/allInvoices`,{withCredentials:true})
    }
};

export default InvoiceAPI;