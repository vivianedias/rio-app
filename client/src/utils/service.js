import { css } from 'styled-components'

export const px = (value, defaultValue) => {
  if (value && typeof value === 'string') {
    return value
  }

  const newValue = `${value || defaultValue || 0}px`
  return css`${newValue}`
}