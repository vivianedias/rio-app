const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CandidateSchema = new Schema({
<<<<<<< HEAD
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
=======
  email:{
    type: String,
    required: true,
    lowercase: true
  },
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
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
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
<<<<<<< HEAD
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
=======
    type: String,
    require: true,
  },
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
=======
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
  formationInstitution:{
    type: String, 
    required:true,
  },
  cpnj:{
    type: Boolean, 
    required: true
  },  
  cnpjType:{
<<<<<<< HEAD
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
=======
    type: String,
    required: true
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
  password: {
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
    type: String,
    required: true,
    select: false, 
  },
<<<<<<< HEAD
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
=======
  resetPasswordToken: {
    type: String,
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
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
