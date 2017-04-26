import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'components/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export default (initialState = {}) => {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
}
