import { action, observable, computed } from 'mobx'
import axios from 'axios'

export default class SettingsStore {
  @observable loaded = false
  @observable settings = {}

  endpoint = '/api/llol/user/settings'

  set (field, data) {
    axios.patch(this.endpoint, { [field]: data })
      .then(({ status, data }) => {
        if (status === 200) {
          this.settings = settings
          this.loaded = true
        }
      })
      .catch(console.error)
  }

  load () {
    axios.get(this.endpoint)
      .then(({ status, data }) => {
        if (status === 200) {
          this.settings = data
          this.loaded = true
        }
      })
      .catch(console.error)
  }
}
