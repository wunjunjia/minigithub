import React from 'react'
import createStore from '../store'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(state) {
  if (isServer) {
    return createStore(state)
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(state)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default (App) => {
  class WithReduxApp extends React.PureComponent {
    constructor(props) {
      super(props)
      this.store = getOrCreateStore(props.storeState)
    }

    render() {
      // storeState没必要传给子组件
      const { storeState, ...rest } = this.props
      return <App {...rest} store={this.store}/>
    }
  }

  WithReduxApp.getInitialProps = async (ctx) => {
    let props = void 0
    let store = void 0
    if (isServer) {
      const { req: {session} } = ctx.ctx
      if (session && session.user) {
        store = getOrCreateStore({
          user: {
            login: true,
            data: session.user
          },
        })
      } else {
        store = getOrCreateStore()
      }
    } else {
      store = getOrCreateStore()
    }
    ctx.store = store
    if (typeof App.getInitialProps === 'function') {
      props = await App.getInitialProps(ctx)
    }
    return {
      ...props,
      // 不能直接返回store，否则prop接受到是空对象
      storeState: store.getState()
    }
  }

  return WithReduxApp
}
