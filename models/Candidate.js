const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Create Schema
const CandidateSchema = new Schema({
  socialName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true
  },
  birthday: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  selfDeclaration: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  associate: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  },
  portfoliCurriculum:{
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

const Candidate = mongoose.model('Candidate', CandidateSchema)

module.exports = Candidate
