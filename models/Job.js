const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const JobSchema = new Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    require: true,
  },
  companyName: {
    type: Schema.Types.String,
    ref: 'Company'
  },
  name: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  requeriment: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  cnpj: {
    type: Boolean,
    required: true
  },
  cache: {
    type: String,
    required: true
  },
  setForecast: {
    type: String,
    required: true
  },
  totalPeriod: {
    type: String,
    required: true
  },
  availableJobs: {
    type: Boolean,
    require: true,
    default: false
  },
  countJobs: {
    type: Number,
    require: true
  },
  totalJobs: {
    type: Number,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now,
  }
})

const JobSchema = mongoose.model('Job', JobSchema)

module.exports = Job
