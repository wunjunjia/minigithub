import axios from 'axios'
const LOGOUT = 'LOGOUT'

const initState = {
  login: false,
  data: void 0
}

export default (state = {...initState}, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...initState }
    default:
      return state
  }
}

export function logout() {
  return dispatch => {
    axios.post('/logout')
      .then(res => {
        if (res.status === 200) {
          dispatch({type: LOGOUT})
        } else {
          console.log(res)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
