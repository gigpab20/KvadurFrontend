const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    starAmount: { type: Number, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
});

const SizeSchema = new Schema({
    size: { type: String, required: true },
    stock: { type: Number, required: true },
});

const ProductSchema = new Schema({
    title: { type: String, required: true },
    color: { type: String, required: true },
    img: { type: String, required: true },
    desc: { type: [String], required: true },
    guidance: { type: String, required: true },
    sizes: { type: [SizeSchema], required: true },
    price: { type: String, required: true },
    currency: { type: String, required: true },
    reviews: { type: [ReviewSchema], required: true },
    fabric: { type: String, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);