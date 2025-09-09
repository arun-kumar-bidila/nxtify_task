const Product = require("../models/product");

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ADD new product
exports.addProduct = async (req, res) => {
  const { name, price, category, description, image } = req.body;

  if (!name || !price || !category || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      category,
      description,
      image, // if image not provided, default from model will be used
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};

// DELETE product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

// UPDATE product by ID
exports.updateProduct = async (req, res) => {
  const { name, price, category, description, image } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, description, image },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};
