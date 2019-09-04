import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'

export default function initialStore(state) {
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunk)))
}
