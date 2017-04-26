/**
 * Created by drune on 15/03/2017.
 */
import styled, { injectGlobal } from 'styled-components';

export const globalStyle = injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    font-size: 16px;
    background-color: #EDEDED;
  }
`;

export const pageWidthPx = 1200;
export const pageMinWidthPx = 720;
export const pagePaddingPx = 32;
export const pageContentMaxWidthPx = 1080;

export const headerHeightPx = 40;
export const actionBarHeightPx = 80;

export const globalMarginTop = headerHeightPx + actionBarHeightPx;


export const Color = {
  panelBackground: '#FFFFFF',
  fontDefault: '#121212'
};

export const centerComponentHorisontally = (Component) => styled(Component)`
  margin-left: auto;
  margin-right: auto;
`;