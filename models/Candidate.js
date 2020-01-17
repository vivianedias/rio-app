const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// Create Schema
const CandidateSchema = new Schema({
  email:{
    type: String,
    required: true,
    lowercase: true
  },
  name:{
    type: String,
    required: true
  },
  selfDeclaration:{
    type: String, 
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  sexualOrientation:{
    type: String, 
    require: false
  },
  pcd:{
    type: String, 
    require: true
  }, 
  birthday:{
    type: Date, 
    required: true
  },
  homeState:{
    type: String, 
    required: true
  },
  stateResidence:{
    type: String,
    require: true,
  },

  cityResidence:{
    type: String, 
    require: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  kindEducation:{
    type: String, 
    required:true,
  },
  cpnj:{
    type: Boolean, 
    required: true
  },  
  cnpjType:{
    type: String,
    required: true
  },
  identityContent:{
    type: String, 
    required: true
  },
  identityContentSegment:{
    type: String,
    required: true
  },
  expertiseAreas: {
    type: String,
    required: true
  },
  ApanAssociate:{
    type: Boolean,
    require: true
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


const Candidate = mongoose.model('Candidate', CandidateSchema)

module.exports = Candidate
