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

const selectedStyle = ({selected}) => selected ? 'border: 1px solid white;' : ''

const Account = styled(AccountComponent)`
  margin-bottom: 32px;
`

export const AccountList = ({accounts, className, selectAccount, selectedId}) => {
  const ids = Object.keys(accounts)
  return (
    <Container className={className}>{
      ids.map(id => (
        <Account key={id} {...accounts[id]} selected={selectedId === id} onClick={() => selectAccount(id)}/>))
    }</Container>
  )
}

AccountList.propTypes = {
  accounts     : PropTypes.object.isRequired,
  className    : PropTypes.string,
  selectAccount: PropTypes.func.isRequired,
  selectedId   : PropTypes.string
}

export default AccountList