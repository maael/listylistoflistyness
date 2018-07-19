import { action, observable } from 'mobx'
import axios from 'axios'

export default class TrackedStore {
  @observable loaded = false
  @observable pets = []
  @observable mounts = []

  endpoint = '/api/llol/tracked/'

  trackedTypeMap = {
    pet: { field: 'pets', store: 'petStore' },
    mount: { field: 'mounts', store: 'mountStore' }
  }

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  setField (type, data) {
    this[this.trackedTypeMap[type].field] = data
  }

  pushField (type, data) {
    this[this.trackedTypeMap[type].field].push(data)
  }

  @action.bound
  load () {
    Promise.all([ 'mount', 'pet' ].map(this.loadField))
      .then((result) => {
        this.loaded = true
      }, console.error)
  }

  @action.bound
  loadField (type) {
    const { user } = this.rootStore.authStore
    return axios.get(`${this.endpoint}${type}/${user._id}`)
      .then(({ status, data }) => {
        if (status === 200) {
          this.setField(type, data)
        }
      }, console.error)
  }

  @action.bound
  track (type, item, isTrack) {
    console.log(type, item, isTrack)
    if (isTrack) {
      axios.post(`${this.endpoint}${type}`, item)
        .then(({ status, data }) => {
          if (status === 200) {
            this.pushField(type, data)
          }
        }, console.error)
    } else {
      const toRemoveIndex = this[this.trackedTypeMap[type].field].findIndex(this.rootStore[this.trackedTypeMap[type].store].match(item, 'details'))
      const removedItem = this[this.trackedTypeMap[type].field].splice(toRemoveIndex, 1)
      if (removedItem && removedItem.length) {
        axios.delete(`${this.endpoint}${removedItem[0]._id}`)
          .then(({ status, data }) => {
            if (status !== 200) this.pushField(type, removedItem[0])
          }, (err) => {
            this.pushField(type, removedItem[0])
            console.error(err)
          })
      }
    }
  }
}
