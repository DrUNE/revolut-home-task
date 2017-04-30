/**
 * Created by drune on 30/04/2017.
 */
import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'

import AccountComponent from 'components/Account'

const Container = styled.div`
  padding: 8px;
`

const Account = styled(AccountComponent)`
  margin-bottom: 32px;
`

export const AccountList = ({accounts, className}) => {
  const ids = Object.keys(accounts)
  return (
    <Container className={className} children={
      ids.map(id => (<Account key={id} {...accounts[id]}/>))
    }/>
  )
}

AccountList.propTypes = {
  accounts : PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default AccountList