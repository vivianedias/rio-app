import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import styled from 'styled-components'
import { parseText as parse } from '../utils/service'

const mobile = '576px'

const StyledDescription = styled.label`
  color: #fc9b44;
  font-weight: 500;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media(min-width: ${mobile}) {
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
  }
`
const Label = styled.label`
  display: flex;
  margin-bottom: 10px;
  color: #FFFF;
  font-weight: 500;
  @media(min-width: ${mobile}) {
    width: 50%;
  }
`
const Checkbox = styled.input`
  margin-right: 10px;
`

const Checkboxes = ({ label, register, name, fields }) => (
  <div className="field">
    <StyledDescription className="label">{label}</StyledDescription>
    <Wrapper>
      {fields.map((item, index) => {
        const checkedItem = typeof item !== 'string' ? item.name : item
        return (
          <Label key={index} className="control checkbox">
            <Checkbox
              type="checkbox"
              name={`${name}[${parse(checkedItem)}]`}
              ref={register}
            />
            <span>{checkedItem}</span>
          </Label>
        )
      })}
    </Wrapper>
  </div>
)

Checkboxes.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
}

export default Checkboxes