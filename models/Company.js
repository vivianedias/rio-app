const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// Create Schema
const CompanySchema = new Schema({
  institution: {
    type: String,
    required: true
  },
  cnpj: {
    type: Number,
    required: true,
    unique: true, 
  },
  cnpjType: {
    type: String,
    required: true
  },
  businessSegment: {
    type: String,
    required: true
  },
  businessField: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
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


const Company = mongoose.model('Candidate', CompanySchema)

module.exports = Company
