import { Product } from '../models/product.model.js';

// Add a new product
export const addProduct = async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log("Product saved");

        res.json({ success: true, name: req.body.name });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Remove a product
export const removeProduct = async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product removed");

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All products fetched");

        res.send(products);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Upload product image
export const uploadProductImage = (req, res) => {
    try {
        console.log("File uploaded:", req.file);
        res.json({
            success: 1,
            image_url: `http://localhost:${process.env.PORT || 8000}/api/v1/products/images/${req.file.filename}`,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
