/**
 * Created by drune on 16/05/2017.
 */
import styled from 'styled-components'
import { hoverAnimation } from 'components/theme'

const stylesWhenDisabled = ({disabled}) => (
  disabled
    ? 'cursor: not-allowed;'
    : hoverAnimation
)

const ExchangeButton = styled.button`
  border: 1px solid black;
  border-radius: 2px;
  background-color: #1d95e7;
  
  margin-top: 50px;
  padding: 10px;
  
  ${stylesWhenDisabled}
`

export default ExchangeButton