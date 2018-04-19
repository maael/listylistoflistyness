import MountStore from './mount'
import PetStore from './pet'
import DataStore from './data'
import AuthStore from './auth'
import CharacterStore from './character'
import CollectedStore from './collected'
import TrackedStore from './tracked'
import SettingsStore from './settings'

let store = null

class RootStore {
  constructor (isServer) {
    this.stores = [AuthStore, MountStore, PetStore, DataStore, CharacterStore, CollectedStore, TrackedStore, SettingsStore].map((StoreClass) => {
      const storeName = `${StoreClass.name.charAt(0).toLowerCase()}${StoreClass.name.slice(1)}`
      this[storeName] = new StoreClass(this, isServer)
      return storeName
    })
  }

  onClientLoad () {
    this.stores.forEach((store) => {
      this[store].prepare && this[store].prepare()
    })
  }

  getStores () {
    return this.stores.reduce((stores, store) => {
      return Object.assign(stores, { [store]: this[store] })
    }, {})
  }
}

export function initStore (isServer) {
  if (isServer) {
    return new RootStore(isServer)
  } else {
    if (store === null) {
      store = new RootStore(isServer)
    }
    return store
  }
}
