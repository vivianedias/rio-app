const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CandidateSchema = new Schema({
<<<<<<< HEAD
  user_id: {
=======
  email:{
    type: String,
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
    required: true,
    lowercase: true
  },
<<<<<<< HEAD
  user_email: {
    required: true,
    unique: true,
    type: Schema.Types.String,
    ref: 'User'
  },
  sexual_orientation: {
    type: String,
    required: true
  },
  pcd: {
    type: Boolean,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  home_state: {
    type: String,
    required: true
  },
  state: {
=======
  name:{
    type: String,
    required: true
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
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
    type: String,
    require: true,
  },
<<<<<<< HEAD
  city: {
    type: String,
    required: true
=======
  currentCity:{
    type: String, 
    require: true
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
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
<<<<<<< HEAD
  formation_institution: {
    type: String,
    required: true,
  },
  cnpj: {
    type: Boolean,
    required: true
  },
  cnpj_type: {
=======
  formationInstitution:{
    type: String, 
    required:true,
  },
  cpnj:{
    type: Boolean, 
    required: true
  },  
  cnpjType:{
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
    type: String,
    required: true
  },
<<<<<<< HEAD
  identity_content: {
    type: Boolean,
    required: true
  },
  identity_segments: {
    type: Array,
=======
  identityContent:{
    type: Boolean, 
    required: true
  },
  identitySegments:{
    type: String,
    required: true
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
  },
  expertiseAreas: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  apan_associate: {
=======
  apanAssociate:{
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
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
