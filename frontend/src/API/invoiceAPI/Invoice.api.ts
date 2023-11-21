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

    static addServiceInvoice = (values:any)=>{
        return axios.post(`${BASE_URL}/admin/addinvoice`,values,{withCredentials:true});
    }


};


export default InvoiceAPI;