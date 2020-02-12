import React from 'react'
import { If } from './If'
import Text from './Text'

const Error = ({ msg }) => (
  <If condition={typeof msg === 'string'}>
    <Text
      color="#f14668"
      size=".75rem"
      margin="0 0 .75rem 0"
      weight="600"
    >
      {msg}
    </Text>
  </If>
)

export default Error