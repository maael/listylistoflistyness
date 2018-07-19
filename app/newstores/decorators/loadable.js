import { observable, computed, action, autorun, toJS } from 'mobx'
import axios from 'axios'
import optionalParams from './lib/optionalParams'

export default function (...args) {
  function getExtended (ToExtend, loadUrl, withUser) {
    if (!loadUrl) throw new Error('Loadable requires a loadUrl')
    return class Loadable extends ToExtend {
      @observable loaded = false
      @observable loadedData = []
      withUser = !!withUser
      url = loadUrl

      constructor (...args) {
        super(...args)
        autorun(() => {
          this.onLoad && this.loaded && this.onLoad(toJS(this.loadedData))
        })
      }

      load () {
        const user = this.withUser && this.rootStore.authStore.user && this.rootStore.authStore.user.id
        const url = `${this.url}${user ? `/${user}` : ''}`
        axios(url).then(({ data, status }) => {
          if (status === 200) {
            this.loadedData = data
            this.loaded = true
          }
        }).catch(console.error)
      }

      @computed get data () {
        return this.loadedData
      }
    }
  }
  return optionalParams(args, getExtended)
}
