import { css } from 'styled-components'

export const px = (value, defaultValue) => {
  if (value && typeof value === 'string') {
    return value
  }

  const newValue = `${value || defaultValue || 0}px`
  return css`${newValue}`
}

export const emailValidation = () => (
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
)

export const isEmpty = (value) => {  
  return value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)
}

export const parseText = input => input.toLowerCase().split(' ').join('_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
