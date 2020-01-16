const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const AdministratorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false, 
  },
  resetPasswordToken: {
    type: String,
    unique: true
  },
  resetPasswordExpires: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Administrator = mongoose.model('Administrator', AdministratorSchema)

module.exports = Administrator
