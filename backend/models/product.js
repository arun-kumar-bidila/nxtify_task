
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Plants",
                "Seeds",
                "Accessories",
                "Gardening",
                "Pebbles",
                "Soil",
                "Fertilizers", 
                "Pots", 
                "Flowers", 
                "Others"
            ],
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            default:
                "https://res.cloudinary.com/demo/image/upload/v1690000000/default-product.png", // fallback default image
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
