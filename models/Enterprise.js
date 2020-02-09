const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const EnterpriseSchema = new Schema({
  user_id: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  user_email: {
    required: true,
    type: Schema.Types.String,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  foundation_date: {
    type: String,
    required: true
  },
  presentation: {
    type: String,
    required: true
  },
  links: {
    type: String,
    required: true
  },
  diversity_functions: {
    type: Array,
    required: true
  },
  identity_content: {
    type: Boolean,
    required: true,
  },
  identity_segments: {
    type: Array,
    required: false
  },
  cnpj_type: {
    type: String,
    required: String
  },
  business_segments: {
    type: Array,
    required: true,
  },
  business_fields: {
    type: Array,
    required: true
  },
  apan_associate: {
    type: Boolean,
    required: true
  },
  other_states: {
    type: Array,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const Enterprise = mongoose.model('Enterprise', EnterpriseSchema)

module.exports = Enterprise
