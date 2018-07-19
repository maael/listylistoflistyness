import { computed, observable } from 'mobx'
import axios from 'axios'
import Router from 'next/router'
import { withRoot, named } from './decorators'

@withRoot
@named
export default class AuthStore {
  @observable loaded = false
  @observable token
  @observable user = { id: '5ad46905d81b6090b43354ef' }

  endpoint = '/auth/'

  save ({ token, user } = {}) {
    if (token) this.token = token
    if (user) this.user = user
    this.loaded = true
  }

  reset () {
    this.token = undefined
    this.user = undefined
  }

  refresh () {
    axios.get(`${this.endpoint}refresh/`)
      .then(({ status, data }) => {
        if (status === 200) {
          this.save({ user: data })
        }
      })
  }

  login (username, password, redirect = false) {
    axios.post(`${this.endpoint}login`, { username, password })
      .then(({ status, data }) => {
        if (status === 200) {
          this.save(data)
          if (redirect) Router.push('/')
        } else {

        }
      }, console.error)
  }

  register (username, password, redirect = false) {
    axios.post(`${this.endpoint}register`, { username, password })
      .then(({ status, data }) => {
        if (status === 200) {
          this.save(data)
          if (redirect) Router.push('/')
        } else {

        }
      }, console.error)
  }

  logout () {
    axios.get(`${this.endpoint}logout`)
      .then(({ status }) => {
        if (status === 200) {
          console.log('logged out')
          this.reset()
        } else {

        }
      }, console.error)
  }

  registerBnet () {
    console.log('registering')
    window.location = 'http://google.com'
  }

  refreshBnet () {

  }

  revokeBnet (battlenetId) {
    axios.delete(`${this.endpoint}revoke/${this.user._id}/${battlenetId}`)
      .then(({ status, data }) => {
        if (status === 200) {
          this.save(data)
        }
      }, console.error)
  }
}
