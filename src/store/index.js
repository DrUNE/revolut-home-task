import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer , {initialState} from 'containers/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export default (state = initialState) => {
  return createStore(rootReducer, state, composeWithDevTools(applyMiddleware(thunk)))
}
