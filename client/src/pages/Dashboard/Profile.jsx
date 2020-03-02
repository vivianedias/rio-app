import React from 'react'
import styled from 'styled-components'

import Star from '@material-ui/icons/Star'
import Typography from '@material-ui/core/Typography'

const StyledProfile = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .image {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    color: #f7cc94;
    background: #200122;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .associate {
    display: flex;
    align-items: center;
  }

  .bio {
    text-align: justify;
  }
`

function Profile({ icon, name, associate, bio, type }) {
  return (
    <StyledProfile className='profile'>
      <span className="image">{icon}</span>
      <Typography component="h2" variant="h4"><strong>{name}</strong></Typography>
      <Typography component="h3" variant="h6"><strong>Perfil {type}</strong></Typography>
      { associate && (
        <div className="associate">
          <Star color="secondary" />
          <Typography color="secondary">Associado APAN</Typography>
        </div>) 
      }
      <Typography className="bio">{bio}</Typography>
    </StyledProfile>
  )
}

export default Profile