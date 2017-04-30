/**
 * Created by drune on 15/03/2017.
 */

import 'normalize.css/normalize.css'
import styled, { injectGlobal } from 'styled-components'

export const globalStyle = injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    font-size: 16px;
    background-color: #EDEDED;
  }
  
  #root {
    height: 100%;
  }
`

export const centerHorisontally = Component => styled(Component)`
  margin-left: auto;
  margin-right: auto;
`