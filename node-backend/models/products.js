const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    address: {type: String},
    lat: {type: String},
    long: {type: String},
});


module.exports = mongoose.model('products', productSchema);