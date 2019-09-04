import App, { Container } from 'next/app'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import Router from 'next/router'
import withRedux from '../hoc/withRedux'
import Layout from '../layout'
import Loading from '../components/Loading'
import Authentication from '../components/Authentication'
import Media from '../lib/react-media'

class CustomApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  startLoading = () => {
    this.setState(() => ({
      loading: true
    }))
  }

  stopLoading = () => {
    this.setState(() => ({
      loading: false
    }))
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }

  static async getInitialProps(ctx) {
    let props = void 0
    const user = ctx.store.getState().user
    if (!user.login) {
      return { props }
    }
    const { Component } = ctx
    if (typeof Component.getInitialProps === 'function') {
      props = await Component.getInitialProps(ctx)
    }
    return {
      props
    }
  }

  render() {
    const { Component, props = {}, store } = this.props
    const { loading } = this.state
    return (
      <Container>
        <Provider store={store}>
          { loading ? <Loading /> : null }
          <Layout>
            <Authentication>
              <Media query={{ maxWidth: 767 }}>
                { isMobile => <Component {...props} isMobile={isMobile}/>}
              </Media>
            </Authentication>
          </Layout>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(CustomApp)
