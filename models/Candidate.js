const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// Create Schema
const CandidateSchema = new Schema({
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
  self_declaration: {
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
    type: Boolean, 
    require: true
  }, 
  birthday:{
    type: String, 
    required: true
  },
  homeState:{
    type: String, 
    required: true
  },
  currentState:{
    type: String,
    require: true,
  },
  currentCity:{
    type: String, 
    require: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  formationInstitution:{
    type: String, 
    required:true,
  },
  cnpj:{
    type: Boolean, 
    required: true
  },  
  cnpjType:{
    type: String,
  },
  identityContent:{
    type: Boolean, 
    required: true
  },
  identitySegments:{
    type: String,
    required: true
  },
  expertiseAreas: {
    type: String,
    required: true
  },
  apanAssociate:{
    type: Boolean,
    require: true
  },
  bio: {
    type: String,
    required: true
  },
  links: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


const Candidate = mongoose.model('Candidate', CandidateSchema)

module.exports = Candidate
