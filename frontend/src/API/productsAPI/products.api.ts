import axios from 'axios';

const BASE_URL = "http://localhost:3001";

const newAxios = axios.create({
  baseURL : "http://localhost:3001",
  withCredentials : true
});

class ProductsAPI{
    //add a product
    static addProduct = (productData: {
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
      image: any;
    }) => {
      console.log("Product add API");
      return newAxios.post("/product/addProduct", productData)
        .catch((error) => {
          // Handle the error, e.g., log it or throw an exception.
          console.error("API request failed:", error);
          throw error;
        });
    };
    // static addProduct = (values: {
    //     name: string;
    //     brand: string;
    //     price: string;
    //     description: string;
    //     category: string;
    //     code: string;
    //     quantity: string;
    //     added_date: string;
    //     expire_date: string;
    //     supplier: string;
    //     image: string;
    //   }) => {
    //     console.log(values);
    //     return axios.post(`${BASE_URL}/product/addProduct`, values, {
    //       withCredentials: true,
    //     });
    //   };

      //get all products
      static getAllItems = () => {
        return axios.get(`${BASE_URL}/product`, { withCredentials: true });
      };

      //get a product by id
      static getProductById = (values: {_id : string}) => {
        return axios.get(`${BASE_URL}/product/${values._id}`, { withCredentials: true });
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
        image: any;
      }) => {
        return axios.put(`${BASE_URL}/product/update/${values._id}`, values, {
          withCredentials: true,
        });
      };

      //update use quantity
      static updateUseProduct = (values: {
        _id: string;
        product_id: string;
        quantity: string;
      }) => {
        return axios.put(`${BASE_URL}/product/updateUse/${values._id}`, values, {
          withCredentials: true,
        });
      };
      // static updateUseProduct = (values: {
      //   _id: string;
      //   product_id: string;
      //   quantityUsed: number;
      //   reasonForUse: string;
      // }) => {
      //   return axios.put(`${BASE_URL}/product/updateUse/${values._id}`, {
      //     quantityUsed: values.quantityUsed,
      //     reasonForUse: values.reasonForUse,
      //   }, {
      //     withCredentials: true,
      //   });
      // };

      // //delete a product
      // static deleteProduct = (values : {_id : string}) => {
      //   return axios.delete(`${BASE_URL}/product/delete/${values._id}`, {
      //     withCredentials: true,
      //   });
      // };
      
}


export default ProductsAPI;