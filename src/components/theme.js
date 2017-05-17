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

export const hoverAnimation = `
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);  
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  
  &:hover {
    transform: scale(1.05, 1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }
`