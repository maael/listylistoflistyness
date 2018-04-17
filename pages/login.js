import CssBaseline from 'material-ui/CssBaseline'
import { Provider } from 'mobx-react'
import { initStore } from '../app/stores'
import withRoot from '../app/lib/withRoot'
import HeaderBar from '../app/components/HeaderBar'
import AuthBlock from '../app/components/block/Auth'

class Page extends React.Component {
  static getInitialProps ({ req }) {
    const isServer = !!req
    const store = initStore(isServer)
    return { isServer }
  }

  constructor (props) {
    super(props)
    this.store = initStore(props.isServer)
  }

  componentDidMount () {
    this.store.onClientLoad()
  }

  render () {
    return (
      <Provider {...this.store.getStores()}>
        <div>
          <CssBaseline />
          <HeaderBar />
          <AuthBlock />
        </div>
      </Provider>
    )
  }
}

export default withRoot(Page)
