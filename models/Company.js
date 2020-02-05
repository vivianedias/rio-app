const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CompanySchema = new Schema({
  userId:{
    required: true,
    unique: true,
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  userEmail:{
    required: true,
    unique: true,
    type: Schema.Types.String,
    ref: 'users'
  },
  gender: {
    type: String,
    required: true
  },
  selfDeclaration: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  foundationDate: {
    type: Date,
    require: true
  },
  companyPresentation: {
    type: String,
    require: true
  },
  companySocialMidia: {
    type: String,
    required: true
  },
  diversifyFunctions: {
    type: Array,
    required: true
  },
  identityContent: {
    type: Boolean,
    require: true,
  },
  identitySegments: {
    type: String,
    require: false
  },
  cnpjType: {
    type: Number,
    required: true
  },
  businessSegments: {
    type: Array,
    required: true,
  },
  businessFields: {
    type: Array,
    required: true
  },
  apanAssociate: {
    type: Boolean,
    require: true
  },
  otherStates: {
    type: Array,
    required: true
  },
  headOfficeCity: {
    type: String,
    required: true
  },
  headOfficeState: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


const Company = mongoose.model('Company', CompanySchema)

module.exports = Company
