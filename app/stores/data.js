import { action, observable, computed } from 'mobx'
import axios from 'axios'

export default class DataStore {
  @observable loaded = false
  @observable data = { realms: [] }

  constructor (rootStore, isServer) {
    if (!isServer) this.load()
  }

  prepare () {
    this.load()
  }

  load () {
    this.loadRealms()
  }

  loadRealms () {
    axios.get('/api/blizzard/data/realm')
      .then(({ data }) => {
        this.data.realms = data.realms
        this.loaded = true
      })
      .catch(console.error)
  }

  @computed get realmOptions () {
    return this.data.realms.map(({ name, slug }) => ({ value: slug, label: name }))
  }
}
