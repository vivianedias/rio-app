const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const sgMail = require('@sendgrid/mail')
const crypto = require('crypto')

// Load Input Validation
const validateRegisterInput = require('../../validator/register')
const validateLoginInput = require('../../validator/login')
// Load Candidate model
const Candidate = require('../../models/Candidate')

// @route   POST api/candidate/register
// @desc    Register candidate
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Candidate.findOne({ email: req.body.email })
    .then(candidate => {
      if (candidate) {
        errors.email = 'Favor checar as suas informações.'
        return res.status(400).json(errors)
      } else {
        const newCandidate = new Candidate({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          birthday: req.body.birthday,
          gender: req.body.gender,
          pcd: req.body.pcd,
          homeState: req.body.homeState,
          currentState: req.body.currentState,
          currentCity: req.body.cityResidence,
          selfDeclaration: req.body.selfDeclaration,
          address: req.body.address,
          education: req.body.education,
          formationInstitution: req.body.formationInstitution, 
          cnpj: req.body.cnpj,
          cnpjType: req.body.cnpjType,
          identityContent: req.body.identityContent,
          identitySegments: req.body.identitySegments,
          expertiseAreas: req.body.expertiseAreas,
          apanAssociate: req.body.apanAssociate,
          phone: req.body.phone,
          links: req.body.links,
          bio: req.body.bio,
          sexualOrientation: req.body.sexualOrientation
        })

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err
          bcrypt.hash(newCandidate.password, salt, (err, hash) => {
            if (err) throw err
            newCandidate.password = hash
            newCandidate
              .save()
              .then(candidate => res.json(candidate))
              .catch(err => console.error(err))
          })
        })
      }
    })
})

module.exports = router
