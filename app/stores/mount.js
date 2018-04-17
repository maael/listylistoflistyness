import { action, observable, computed } from 'mobx'
import axios from 'axios'
import iconFormatter from '../lib/iconFormatter'

export default class MountStore {
  @observable loaded = false
  @observable mounts = []
  @observable activeFilter = { search: '', collected: false, tracked: false }
  @observable pageSize = 20

  constructor (rootStore, isServer) {
    if (!isServer) this.load()
    this.rootStore = rootStore
  }

  prepare () {
    this.load()
  }

  load () {
    axios('/api/blizzard/mount').then(({ data, status }) => {
      if (status === 200) {
        this.mounts = data.mounts
        this.loaded = true
      }
    }).catch(console.error)
  }

  @action.bound
  filter (newFilter) {
    this.activeFilter = Object.assign({}, this.activeFilter, newFilter)
  }

  @computed get options () {
    return this.mounts.map(({ name, slug, icon }) => ({ value: slug, label: name, src: iconFormatter(icon) }))
  }

  @computed get filtered () {
    return this.mounts.reduce((result, item) => {
      if (!item.name.toLowerCase().includes(this.activeFilter.search.toLowerCase())) return result
      const collected = (this.rootStore.collectedStore.mounts.collected.some(({ creatureId }) => creatureId === item.creatureId))
      if (this.activeFilter.collected && !collected) return result
      return result.concat(Object.assign({}, item, { collected }))
    }, [])
  }
}
