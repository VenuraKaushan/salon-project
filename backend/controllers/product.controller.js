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
  
      //generate Stock ID
      const customStockId = await generateStockId();
  
      const newProduct = new Product({
        product_id: customStockId,
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

      });
  
      const savedProduct = await newProduct.save(); // Save the new product document to the database
  
      console.log(savedProduct);
  
      res.status(201).json(savedProduct); // Send the saved product as the response
    } catch (error) {
      res.status(500).json({ message: "Failed to add Product", error });
    }
  };  

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

//update only use products
export const updateUseProduct = async (req, res) => {
  const product_id = req.params.id;

  // Ensure that 'quantityUsed' is a valid positive number
  const quantityUsed = parseInt(req.body.quantityUsed);

  if (isNaN(quantityUsed) || quantityUsed <= 0) {
      return res.status(400).json({ message: "Invalid quantityUsed value" });
  }

  try {
      const product = await Product.findById(product_id);

      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      if (product.quantity < quantityUsed) {
          return res.status(400).json({ message: "Not enough quantity available" });
      }

      // Subtract 'quantityUsed' from the current 'quantity'
      product.quantity -= quantityUsed;

      // Add usage history to the product
      const newUsage = {
          quantityUsed,
          reasonForUse: req.body.reasonForUse,
      };

      product.usageHistory.push(newUsage);

      // Save the updated product
      const updatedProduct = await product.save();

      res.status(200).json(updatedProduct);
  } catch (error) {
      res.status(500).json({ message: "Failed to update Product", error });
  }
};
// export const updateUseProduct = async (req, res) => {
//   const product_id = req.params.id;

//   console.log(req.body);
//   const updateFields = {
//     quantity: req.body.quantity,
//   };

//   try {
//     const updateProduct = await Product.findByIdAndUpdate(
//       product_id,
//       updateFields,
//       { new: true }
//     );

//     if (!updateProduct) {
//       // If the product is not found, send a 404 status code with a message
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json(updateProduct); // Send the updated Product as the response
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update Product", error });
//   }
// };

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