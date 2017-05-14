/**
 * Created by drune on 26/04/2017.
 */
import { combineReducers } from 'redux'
import app, { appInitialState } from './App/reducer'

const reducer = combineReducers({
  app
})

export const initialState = {
  app: appInitialState
}

export default reducer