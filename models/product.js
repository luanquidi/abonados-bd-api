const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ProductSchema = Schema({
    name: String,
    description: String,
    stock: String,
    price: Number,
    active: Boolean,
    image: [
        [String]
    ],
    category: String
});

module.exports = mongoose.model('Product', ProductSchema);