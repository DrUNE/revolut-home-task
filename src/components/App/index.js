import React, { Component } from 'react'
import styled from 'styled-components'

import { centerHorisontally } from 'components/theme'
import ExchangeComponent from 'components/Exchange'

const Exchange = styled(centerHorisontally(ExchangeComponent))`
  margin-top: 50px;
  border-radius: 3px;
  min-height: 500px;
  box-shadow: rgba(0, 0, 0, 0.75) 9px 33px 91px -29px;
`

class App extends Component {
  render () {
    return (
      <Exchange/>
    )
  }
}

export default App