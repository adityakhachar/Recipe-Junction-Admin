const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define schema for Admin collection
const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        maxlength: 255
    },
    confirmPassword: {
        type: String,
        required: true,
        maxlength: 255
    },
    secureCode: {
        type: String,
        required: true,
        maxlength: 6,
        default: '161534' // Default value set to '161534'
    }
});

// Create model for Admin collection
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
