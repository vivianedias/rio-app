const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// Load Input Validation
const validateRegisterInput = require('../../validator/register')
// Load Company model
const Company = require('../../models/Company')

// @route   POST api/company/register
// @desc    Register company
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(company => {
      if (company) {
        errors.email = 'Favor checar as suas informações.'
        return res.status(400).json(errors)
      } else {
        const newCompany = new Company({
          user_id: req.body.user_id,
          gender: req.body.gender,
          selfDeclaration: req.body.selfDeclaration,
          companyName: req.body.companyName,
          foundationDate: req.body.foundationDate,
          companyPresentation: req.body.companyPresentation,
          companySocialMidia: req.body.companySocialMidia,
          diversifyFunctions: req.body.diversifyFunctions,
          identityContent: req.body.identityContent,
          companyRegistry: req.body.companyRegistry,
          identityContentSegment: req.body.identityContentSegment,
          businessSegment: req.body.businessSegment,
          businessField: req.body.businessField, 
          otherStates: req.body.otherStates,
          city: req.body.city,
          state: req.body.state,
          apanAssociate: req.body.ApanAssociate,
          phone: req.body.phone, 
        })

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err
          bcrypt.hash(newCompany.password, salt, (err, hash) => {
            if (err) throw err
            newCompany.password = hash
            newCompany
              .save()
              .then(company => res.json(company))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

module.exports = router
