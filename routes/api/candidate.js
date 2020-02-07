const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Input Validation
// const validateRegisterInput = require('../../validator/register')
// Load Candidate model
const Candidate = require('../../models/Candidate')

// @route   POST api/candidate/register
// @desc    Register candidate
// @access  Public
router.post('/register', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {}

    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors)
    // }

    Candidate.findOne({ user_id: req.user.id })
      .then(candidate => {
        if (candidate) {
          errors.user = 'Esse usuário já possui um cadastro.'
          return res.status(400).json(errors)
        } else {
          const newCandidate = new Candidate({
            user_id: req.user.id,
            user_email: req.user.email,
            birthday: req.body.birthday,
            pcd: req.body.pcd,
            home_state: req.body.home_state,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            education: req.body.education,
            formation_institution: req.body.formation_institution,
            cnpj: req.body.cnpj,
            cnpj_type: req.body.cnpj_type,
            identity_content: req.body.identity_content,
            identity_segments: req.body.identity_segments,
            expertise_areas: req.body.expertise_areas,
            apan_associate: req.body.apan_associate,
            sexual_orientation: req.body.sexual_orientation,
            links: req.body.links,
            bio: req.body.bio,
          })

          newCandidate
            .save()
            .then(candidate => res.json(candidate))
            .catch(err => res.status(400).json(err))
        }
      })
      .catch(err => res.status(400).json(err))
  })

// @route   GET api/candidate/
// @desc    Get candidate by id
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}
  Candidate.findOne({ user_id: req.user.id })
    .then(candidate => {
      if (!candidate) {
        errors.nocandidate = 'Esse profissional não existe'
        res.status(404).json(errors)
      }
      res.json(candidate)
    })
    .catch(() => res.status(404).json({ project: 'Não existe um usuário com esse identificador' }))
})

// @route   GET api/candidate/all
// @desc    Get candidates
// @access  Public
router.get('/all', (req, res) => {
  const errors = {}
  Candidate.find()
    .sort({ createdAt: -1 })
    .then(candidates => {
      if (!candidates) {
        errors.nocandidates = 'Não existem candidatos cadastradas ainda'
        return res.status(404).json(errors)
      }
      res.json(candidates)
    })
    .catch(() => res.status(404).json({
      candidates: 'Não existem candidatos cadastradas ainda'
    }))
})

module.exports = router
