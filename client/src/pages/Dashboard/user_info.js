export const getInfo = user => {
  console.log(user)

  return ({
    professional: [
      {
        title: 'Identificação',
        values: [
          {
            campo: 'Gênero',
            valor: user.gender
          },
          {
            campo: 'Auto declaração',
            valor: user.self_declaration
          },
          {
            campo: 'Data de nascimento',
            valor: user.birthday
          }
        ]
      },
      {
        title: 'Localização',
        values: [
          {
            campo: 'Endereço',
            valor: user.address
          },
          {
            campo: 'Cidade',
            valor: user.city
          },
          {
            campo: 'Estado',
            valor: user.home_state
          }
        ]
      },
      {
        title: 'Contato',
        values: [
          {
            campo: 'Telefone',
            valor: user.phone
          },
          {
            campo: 'E-mail',
            valor: user.user_email
          },
          {
            campo: 'Links',
            valor: user.links.split(';').join(', ')
          }
        ]
      },
      {
        title: 'Formação',
        values: [
          {
            campo: 'Tipo de Formação',
            valor: user.education
          },
          {
            campo: 'Instituição',
            valor: user.formation_institution
          },
          {
            campo: 'Áreas de atuação',
            valor: user.expertise_areas.join(', ')
          }
        ]
      },
    ],
    enterprise: [
      {
        title: 'Localização',
        values: [
          {
            campo: 'Endereço',
            valor: user.address
          },
          {
            campo: 'Cidade',
            valor: user.city
          },
          {
            campo: 'Estado',
            valor: user.state
          }
        ]
      }
    ]
  })
}