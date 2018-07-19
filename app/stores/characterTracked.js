import { action, observable, toJS } from 'mobx'
import axios from 'axios'

export default class CharacterTrackedStore {
  @observable loaded = false
  @observable reputations = {}

  endpoint = '/api/llol/tracked/'

  trackedTypeMap = {
    reputation: { field: 'reputations', store: 'collectedStore' }
  }

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  setField (type, data) {
    console.log('setting', data, type, this.trackedTypeMap[type].field)
    this[this.trackedTypeMap[type].field] = data.reduce((obj, item) => {
      if (obj[item.character]) {
        obj[item.character].push(item)
      } else {
        obj[item.character] = [ item ]
      }
      return obj
    }, {})

  }

  @action.bound
  getField (type, character) {
    const foundType = this.trackedTypeMap[type]
      ? this.trackedTypeMap[type]
      : this.trackedTypeMap[type.slice(0, -1)]
    if (foundType) {
      return this[foundType.field][character]
    }
    return []
  }

  pushField (type, data) {
    this[this.trackedTypeMap[type].field][data.character].push(data)
  }

  @action.bound
  load () {
    Promise.all([ 'reputation' ].map(this.loadField))
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
      axios.post(`${this.endpoint}${type}`, Object.assign({}, item, { character: this.rootStore.characterStore.selected }))
        .then(({ status, data }) => {
          if (status === 200) {
            this.pushField(type, data)
          }
        }, console.error)
    } else {
      const toRemoveIndex = toJS(this[this.trackedTypeMap[type].field]).findIndex(this.rootStore[this.trackedTypeMap[type].store].match(type, item, 'details'))
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
