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

// Load User model
const User = require('../../models/User')
const Candidate = require('../../models/Candidate')
const Enterprise = require('../../models/Enterprise')


// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Opa! Já existe um usuário com esse e-mail.'
        return res.status(400).json(errors)
      }

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        gender: req.body.gender,
<<<<<<< HEAD
        phone: req.body.phone,
        self_declaration: req.body.self_declaration
=======
        phone: req.body.phone
>>>>>>> parent of a11bd86... Merge branch 'feature/candidate'
      })

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    })
})

// @route   GET api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'Usuário não encontrado'
      return res.status(400).json(errors)
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.type
        }

        // Sign Token
        jwt.sign(
          payload,
          process.env.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      } else {
        errors.password = 'Senha incorreta'
        return res.status(400).json(errors)
      }
    })
  })
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      type: req.user.type
    })
  }
)

// @route   GET api/users/has-additional-register
// @desc    Return if user has related enterprise or candidate
// @access  Private
router.get('/has-additional-register',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return Enterprise.findOne({ user_id: req.user.id })
      .then(enterprise => {
        if (enterprise) return res.json({
          hasAdditionalRegister: true
        })

        else {
          Candidate.findOne({ user_id: req.user.id })
            .then(candidate => {
              if (candidate) return res.json({
                hasAdditionalRegister: true
              })
              else {
                res.json({ hasAdditionalRegister: false })
              }
            })
            .catch(err => res.status(500).json(err))
        }
      })
      .catch(err => res.status(500).json(err))
  }
)

// @route   POST api/user/forgot-password
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

  User.findOne({ email: req.body.email })
    .then(user => {
      // Check for user
      if (!user) {
        errors.recovery = 'Usuário não encontrado'
        return res.status(400).json(errors)
      }

      // Update reset password token and exp date
      User.findOneAndUpdate(
        { email },
        { $set: update },
        { new: true }
      )
        .then(() => {
          sgMail.setApiKey(process.env.sendgridApiKey)

          const msg = {
            to: email,
            from: 'raio@gmail.com',
            subject: 'Recuperação de Senha - Raio',
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
  User.findOne({
    reset_password_token: req.params.token,
    reset_password_expires: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        errors.resetPassword = 'Recuperação de senha é inválida ou expirou'
        return res.status(404).json(errors)
      }

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err
          const passwordHash = hash
          // Update password and set password token and exp date to null
          const updatePassword = {
            password: passwordHash,
            reset_password_token: null,
            reset_password_expires: null
          }
          User.findOneAndUpdate(
            { reset_password_token: req.params.token },
            { $set: updatePassword },
            { new: true }
          )
            .then(user => res.json('Sua senha foi redefinida com sucesso'))
            .catch(() => {
              errors.resetPassword = 'Um erro ocorreu ao atualizar a senha'
              return res.status(404).json(errors)
            })
        })
      })
    })
    .catch(() => {
      errors.resetPassword = 'Um erro ocorreu ao localizar usuário'
      return res.status(404).json(errors)
    })
})

module.exports = router
