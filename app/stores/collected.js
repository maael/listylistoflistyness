import { action, observable, computed } from 'mobx'
import axios from 'axios'

export default class CollectedStore {
  @observable loaded = false
  @observable pets = { collected: [] }
  @observable mounts = { collected: [] }
  @observable achievements = {}
  @observable items = {}
  @observable titles = {}

  constructor (rootStore, isServer) {
    if (!isServer) this.load()
  }

  @action.bound
  load ({ realm, name }) {
    axios(`/api/blizzard/character/${realm}/${name}`).then(({ data, status }) => {
      if (status === 200) {
        const { titles, mounts, pets } = data
        this.titles = titles
        this.mounts = mounts
        this.pets = pets
      }
    }).catch(console.error)
  }
}
