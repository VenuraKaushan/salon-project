import Product from "../models/product.model.js";

//generate unique id
const generateStockId = async () => {
    //get last stock object, if there is a product, then return that product object, otherwise return empty array
    const lastStockDetails = await Product.find().sort({ _id: -1,"isDeleted.count": 0 }).limit(1);
  
    //check if the result array is empty or not, if its empty then return first stock ID
    if (lastStockDetails.length == 0) {
      return "PRD-1";
    }
  
    //if array is not null, last get last stock Id
    const stockId = lastStockDetails.map((data) => {
      return data.product_id;
    });
  
    //then we get the Integer value from the last part of the ID
    const oldStockId = parseInt(stockId[0].split("-")[1]);
  
    const newStockId = oldStockId + 1; //then we add 1 to the past value
  
    return  `PRD-${newStockId}`;//return new Stock ID
  };


//add items to the db
export const addProduct = async (req, res) => {
  try {
    const customStockId = await generateStockId();
    const product_id = customStockId;
    const proName = req.body.name;
    const proBrand = req.body.brand;
    const proPrice = req.body.price;
    const proDescription = req.body.description;
    const proCategory = req.body.category;
    const proCode = req.body.code;
    const proQuantity = req.body.quantity;
    const proAdded_date = req.body.added_date;
    const proExpire_date = req.body.expire_date;
    const proSupplier = req.body.supplier;
    const proImage = req.body.image;

    // Input validation can be added here

    const newProduct = await Product.create({
      product_id: product_id,
      name: proName,
      brand: proBrand,
      price: proPrice,
      description: proDescription,
      category: proCategory,
      code: proCode,
      quantity: proQuantity,
      added_date: proAdded_date,
      expire_date: proExpire_date,
      supplier: proSupplier,
      image: proImage,
    });

    console.log(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// export const addProduct = async (req, res) => {
//     try {
  
//       //generate Stock ID
//       const customStockId = await generateStockId();
  
//       const newProduct = new Product({
//         product_id: customStockId,
//         name: req.body.name,
//         brand: req.body.brand,
//         price: req.body.price,
//         description: req.body.description,
//         category: req.body.category,
//         code: req.body.code,
//         quantity: req.body.quantity,
//         added_date: req.body.added_date,
//         expire_date: req.body.expire_date,
//         supplier: req.body.supplier,
//         image: req.body.image,

//       });
  
//       const savedProduct = await newProduct.save(); // Save the new product document to the database
  
//       console.log(savedProduct);
  
//       res.status(201).json(savedProduct); // Send the saved product as the response
//     } catch (error) {
//       res.status(500).json({ message: "Failed to add Product", error });
//     }
//   };  

//get all added data
export const getAllItems = async (req, res) => {
  try {
    const product = await Product.find(); // Retrieve all product (not deleted by worker or admin) documents from the database

    res.status(200).json(product); // Send the product as the response
    console.log(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};

//get by id
export const getProductById = async (req, res) => {
  const productId = req.params.id; // Get the product ID from the request parameters

  try {
    const product = await Product.findById(productId); // Find the product by its ID

    if (!product) {
      // If the product is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product); // Send the product details as the response
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};


//update product details
export const updateProduct = async (req, res) => {
  const product_id = req.params.id;

  console.log(req.body);
  const updateFields = {
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    code: req.body.code,
    quantity: req.body.quantity,
    added_date: req.body.added_date,
    expire_date: req.body.expire_date,
    supplier: req.body.supplier,
    image: req.body.image,
    
  };

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      product_id,
      updateFields,
      { new: true }
    );

    if (!updateProduct) {
      // If the product is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updateProduct); // Send the updated Product as the response
  } catch (error) {
    res.status(500).json({ message: "Failed to update Product", error });
  }
};


export const updateUseProduct = async (req, res) => {
  const product_id = req.params.id;

  console.log(req.body);
  const updateFields = {
    quantity: req.body.quantity,
  };

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      product_id,
      updateFields,
      { new: true }
    );

    if (!updateProduct) {
      // If the product is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updateProduct); // Send the updated Product as the response
  } catch (error) {
    res.status(500).json({ message: "Failed to update Product", error });
  }
};

//delete product details
export const deleteProduct = async (req, res) => {
  const _id = req.params.id;

  try {
    const productDelete = await Product.findByIdAndDelete(_id);

    if (!productDelete) {
      // If the product is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Product", error });
  }
};