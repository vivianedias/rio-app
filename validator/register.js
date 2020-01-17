const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput (data) {
  const errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.confirmedPassword = !isEmpty(data.confirmedPassword) ? data.confirmedPassword : ''
 //TO DO  - FIX AND INSERT OTHER INFORMATIONS

  // Name
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Nome deve ter entre 2 e 30 caracteres'
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Digite o seu nome'
  }

  // Email
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Digite seu e-mail'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'E-mail inválido'
  }

  // Password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Digite uma senha'
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Senha precisa conter no mínimo 6 caracteres'
  }
  if (Validator.isEmpty(data.confirmedPassword)) {
    errors.confirmedPassword = 'Confirme sua senha'
  }
  if (!Validator.equals(data.password, data.confirmedPassword)) {
    errors.confirmedPassword = 'Essas senhas não coincidem'
  }

   //TO DO  - FIX AND INSERT OTHER INFORMATIONS


  return {
    errors,
    isValid: isEmpty(errors)
  }
}
