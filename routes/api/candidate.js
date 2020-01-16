const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
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
          stateResidence: req.body.stateResidence,
          cityResidence: req.body.cityResidence,
          selfDeclaration: req.body.selfDeclaration,
          address: req.body.address,
          education: req.body.education,
          kindEducation: req.body.kindEducation, 
          cnpj: req.body.cnpj,
          cnpjType: req.body.cnpjType,
          identityContent: req.body.identityContent,
          identityContentSegment: req.body.identityContentSegment,
          expertiseAreas: req.body.expertiseAreas,
          ApanAssociate: req.body.ApanAssociate,
          phone: req.body.phone, 
        
        })

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err
          bcrypt.hash(newCandidate.password, salt, (err, hash) => {
            if (err) throw err
            newCandidate.password = hash
            newCandidate
              .save()
              .then(candidate => res.json(candidate))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

// @route   GET api/candidate/login
// @desc    Login Candidate / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find candidate by email
  Candidate.findOne({ email }).then(candidate => {
    // Check for candidate
    if (!candidate) {
      errors.email = 'Verifique seu email ou senha e tente novamente.'
      return res.status(400).json(errors)
    }

    // Check Password
    bcrypt.compare(password, candidate.password).then(isMatch => {
      if (isMatch) {
        // Candidate Matched
        // Create JWT Payload
        const payload = { id: candidate.id, name: candidate.name, email: candidate.email }

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      } else {
        errors.password = 'Verifique seu email ou senha e tente novamente.'
        return res.status(400).json(errors)
      }
    })
  })
})

// @route   GET api/candidate/current
// @desc    Return current candidate
// @access  Private
router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.candidate.id,
      name: req.candidate.name,
      email: req.candidate.email
    })
  }
)

// @route   POST api/candidate/forgot-password
// @desc    Send email to reset password
// @access  Public
router.post('/forgot-password', (req, res) => {
  const errors = {}
  const email = req.body.email
  const token = crypto.randomBytes(20).toString('hex')

  const update = { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }

  if (email === '') {
    errors.recovery = 'Campo obrigatório'
    return res.status(400).json(errors)
  }

  Candidate.findOne({ email: req.body.email })
    .then(candidate => {
      // Check for candidate
      if (!candidate) {
        errors.recovery = 'Usuário não encontrado'
        return res.status(400).json(errors)
      }

      // Update reset password token and exp date
      Candidate.findOneAndUpdate(
        { email },
        { $set: update },
        { new: true }
      )
        .then(() => {
          sgMail.setApiKey(keys.sendgridApiKey)

          const msg = {
            to: email,
            from: 'email@email.com',
            subject: 'Recuperação de Senha - Rio',
            text: 'Você está recebendo esse e-mail porque você (ou outra pessoa fez um pedido de recuperação de senha para sua conta. \n\n' + 'Por favor, clique no link abaixo ou cole em seu navegador para completar o processo: \n\n' + 'http://' + req.headers.host + '/reset/' + token + '\n\n' + 'Se você não fez essa requisição, por favor ignore esse email e sua senha se manterá a mesma. \n'
          }

          sgMail.send(msg)
            .then(() => res.json('Se esse e-mail estiver cadastrado em nossa base de usuários, enviaremos um e-mail com as instruções para redefinir sua senha :)'))
            .catch(() => {
              errors.recovery = 'Um erro ocorreu ao enviar o código de restauração'
              return res.status(404).json(errors)
            })
        })
        .catch(() => {
          errors.recovery = 'Um erro ocorreu ao atualizar o código de recuperação'
          return res.status(404).json(errors)
        })
    })
    .catch(() => {
      errors.recovery = 'Usuário não encontrado'
      return res.status(400).json(errors)
    })
})

router.post('/reset/:token', (req, res, next) => {
  const errors = {}

  const { password, confirmedPassword } = req.body

  // if passwords don't match, flash error and send back to form
  if (password !== confirmedPassword) {
    errors.resetPassword = 'Senhas não coincidem'
    return res.status(400).json(errors)
  } else if (password.length < 6) {
    errors.resetPassword = 'A senha precisa ter no mínimo 6 caracteres'
    return res.status(400).json(errors)
  }

  // if we get to here, the passwords match
  Candidate.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  })
    .then(candidate => {
      if (!candidate) {
        errors.resetPassword = 'Recuperação de senha é inválida ou expirou'
        return res.status(404).json(errors)
      }

      var passwordHash = password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(passwordHash, salt, (err, hash) => {
          if (err) throw err
          passwordHash = hash
          // Update password and set password token and exp date to null
          const updatePassword = {
            password: passwordHash,
            resetPasswordToken: null,
            resetPasswordExpires: null
          }
          Candidate.findOneAndUpdate(
            { resetPasswordToken: req.params.token },
            { $set: updatePassword },
            { new: true }
          )
            .then(candidate => {
              res.json('Sua senha foi redefinida com sucesso')
            })
            .catch(() => {
              errors.resetPassword = 'Um erro aconteceu ao atualizar sua senha'
              return res.status(404).json(errors)
            })
        })
      })
    })
    .catch(() => {
      errors.resetPassword = 'Um erro aconteceu ao tentar localizar o usuário'
      return res.status(404).json(errors)
    })
})

module.exports = router
