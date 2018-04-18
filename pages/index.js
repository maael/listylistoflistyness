import CssBaseline from 'material-ui/CssBaseline'
import { Provider } from 'mobx-react'
import { initStore } from '../app/stores'
import withRoot from '../app/lib/withRoot'
import HeaderBar from '../app/components/HeaderBar'
import TrackablesBlock from '../app/components/block/Trackables'
import BattleNetBlock from '../app/components/block/Battlenet'
import CharactersBlock from '../app/components/block/Characters'

import AuthVisible from '../app/components/hoc/AuthVisible'

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
          <AuthVisible>
            <BattleNetBlock />
          </AuthVisible>
          <AuthVisible requireBattleNet>
            <CharactersBlock />
            <TrackablesBlock />
          </AuthVisible>
        </div>
      </Provider>
    )
  }
}

export default withRoot(Page)
