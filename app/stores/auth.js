import { action, observable, when } from 'mobx'
import axios from 'axios'

export default class AuthStore {
  @observable loaded = false
  @observable token
  @observable user

  endpoint = '/auth/'

  constructor (rootStore, isServer) {
    if (!isServer) this.prepare()
    this.rootStore = rootStore
  }

  prepare = () => {
    this.load()
    if (this.token) {
      this.rootStore.characterStore.load()
      this.rootStore.trackedStore.load()
      this.rootStore.settingsStore.load()
    }
  }

  save ({ token, user } = {}) {
    if (token) this.token = token
    if (user) this.user = user
    localStorage.setItem('token', this.token)
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  reset () {
    this.token = undefined
    this.user = undefined
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  load () {
    this.token = localStorage.getItem('token')
    this.user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
    this.refreshUser()
  }

  refreshUser () {
    axios.get(`${this.endpoint}refresh/`)
      .then(({ status, data }) => {
        if (status === 200) {
          this.user = data
          this.save()
        }
      })
  }

  @action.bound
  login (username, password) {
    axios.post(`${this.endpoint}login`, { username, password })
      .then(({ status, data }) => {
        if (status === 200) {
          this.save(data)
          this.rootStore.characterStore.load()
          this.loaded = true
        } else {

        }
      }, console.error)
  }

  @action.bound
  register (username, password) {
    axios.post(`${this.endpoint}register`, { username, password })
      .then(({ status, data }) => {
        if (status === 200) {
          this.save(data)
          this.loaded = true
        } else {

        }
      }, console.error)
  }

  @action.bound
  revoke (battlenetId) {
    axios.delete(`${this.endpoint}revoke/${this.user._id}/${battlenetId}`)
      .then(({ status, data }) => {
        if (status === 200) {
          this.save(data)
        }
      }, console.error)
  }

  @action.bound
  logout () {
    axios.get(`${this.endpoint}logout`)
      .then(({ status }) => {
        if (status === 200) {
          this.reset()
        } else {

        }
      }, console.error)
  }
}
