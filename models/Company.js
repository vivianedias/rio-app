const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// Create Schema
const CompanySchema = new Schema({
  answerableRegister:{
    type: String,
    required: true,
    lowercase: true
  },
  answerableGender:{
    type: String,
    required: true
  },
  awnserbleSelfDeclaration:{
    type: String, 
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  foundationDate:{
    type: Date, 
    require: true
  },
  companyPresentation:{
    type: String, 
    require: true
  }, 
  companySocialMidia:{
    type: String, 
    required: true
  },
  diversifyFunctions:{
    type: String, 
    required: true
  },
  identityContent:{
  type: Boolean,
  require: true,
  },

  identityContentSegment:{
    type: String, 
    require: false
  },
  cnpjType: {
    type: Number,
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
  ApanAssociate:{
    type: Boolean,
    require: true
  },
  otherStatesOperation:{
    type: String, 
    required: true
  },  
  headOfficeCity:{
    type: String,
    required: true
  },
  businessSegment:{
    type: String, 
    required: true
  },
  fieldsWork:{
    type: String,
    required: true
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


const Company = mongoose.model('Company', CompanySchema)

module.exports = Company
