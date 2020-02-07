const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Input Validation
// const validateRegisterInput = require('../../validator/register')

// Load Enterprise model
const Enterprise = require('../../models/Enterprise')

// @route   POST api/enterprise/register
// @desc    Register Enterprise
// @access  Public
router.post('/register', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateRegisterInput(req.body)

    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors)
    // }

    if (req.user) {
      // Create new company
      const newEnterprise = new Enterprise({
        user_id: req.user.id,
        user_email: req.user.email,
        name_enterprise: req.body.name_enterprise,
        foundation_date: req.body.foundation_date,
        presentation: req.body.presentation,
        links: req.body.links,
        diversity_functions: req.body.diversity_functions,
        identity_content: req.body.identity_content,
        cnpj_type: req.body.cnpjType,
        identity_segments: req.body.identity_segments,
        business_segments: req.body.business_segments,
        business_fields: req.body.business_fields,
        other_states: req.body.other_states,
        city: req.body.city,
        state: req.body.state,
        apan_associate: req.body.apan_associate
      })

      newEnterprise
        .save()
        .then(enterprise => res.json(enterprise))
        .catch(err => console.log(err))

    } else {
      errors.user = 'Usuário não encontrado para a criação da empresa'
      return res.status(400).json(errors)
    }
  })

module.exports = router
