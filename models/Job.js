const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const JobSchema = new Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  companyName: {
    type: Schema.Types.String,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  function: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  cache: {
    type: String,
    required: true
  },
  total_period: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now,
  }
})

const JobSchema = mongoose.model('Job', JobSchema)

module.exports = Job
