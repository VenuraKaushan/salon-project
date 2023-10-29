import axios from 'axios';

const BASE_URL = "http://localhost:3001";

class ProductsAPI{
    //add a product
    static addProduct = (values: {
        name: string;
        brand: string;
        price: string;
        description: string;
        category: string;
        code: string;
        quantity: string;
        added_date: string;
        expire_date: string;
        supplier: string;
        image: string;
      }) => {
        console.log(values);
        return axios.post(`${BASE_URL}/product/addProduct`, values, {
          withCredentials: true,
        });
      };

      //get all products
      static getAllItems = () => {
        return axios.get(`${BASE_URL}/product`, { withCredentials: true });
      };

      //update a product
      static updateProduct = (values: {
        _id: string;
        product_id: string;
        name: string;
        brand: string;
        price: string;
        description: string;
        category: string;
        code: string;
        quantity: string;
        added_date: string;
        expire_date: string;
        supplier: string;
      }) => {
        return axios.put(`${BASE_URL}/product/update/${values._id}`, values, {
          withCredentials: true,
        });
      };

      //delete a product
      static deleteProduct = (values : {_id : string}) => {
        return axios.delete(`${BASE_URL}/product/delete/${values._id}`, {
          withCredentials: true,
        });
      };
      
}


export default ProductsAPI;