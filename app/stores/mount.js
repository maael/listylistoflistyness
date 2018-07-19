import { action, observable, computed } from 'mobx'
import axios from 'axios'
import iconFormatter from '../lib/iconFormatter'

export default class MountStore {
  @observable loaded = false
  @observable mounts = []
  @observable activeFilter = { search: '', collected: false, tracked: false }
  @observable pageSize = 20

  endpoint = '/api/blizzard/mount'

  constructor (rootStore, isServer) {
    if (!isServer) this.load()
    this.rootStore = rootStore
  }

  prepare () {
    this.load()
  }

  load () {
    axios(this.endpoint).then(({ data, status }) => {
      if (status === 200) {
        this.mounts = data.mounts
        this.loaded = true
      }
    }).catch(console.error)
  }

  match (item, subField) {
    return (toCompare) => {
      const comparison = subField ? toCompare[subField] : toCompare
      return item.itemId === comparison.itemId && item.creatureId === comparison.creatureId
    }
  }

  @action.bound
  filter (newFilter) {
    this.activeFilter = Object.assign({}, this.activeFilter, newFilter)
  }

  @computed get options () {
    return this.mounts.map(({ name, slug, icon }) => ({ value: slug, label: name, src: iconFormatter(icon) }))
  }

  @observable
  @computed get filtered () {
    return this.mounts.reduce((result, item) => {
      if (!item.name.toLowerCase().includes(this.activeFilter.search.toLowerCase())) return result
      const collected = this.rootStore.collectedStore.mounts.collected.some(this.match(item))
      if (this.activeFilter.collected && !collected) return result
      const tracked = this.rootStore.trackedStore.mounts.some(this.match(item, 'details'))
      if (this.activeFilter.tracked && !tracked) return result
      return result.concat(Object.assign({}, item, { collected, tracked }))
    }, [])
  }
}
