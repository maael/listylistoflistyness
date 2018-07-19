import MountStore from './mounts'
import PetStore from './pet'
import AuthStore from './auth'

let store = null

class RootStore {
  constructor (isServer) {
    this.stores = [AuthStore, MountStore, PetStore].map((StoreClass) => {
      const storeName = StoreClass.storeName
      this[storeName] = new StoreClass(this, isServer)
      return storeName
    })
    global.newstores = this
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

export default function initStore (isServer) {
  console.log('initStore', isServer, store)
  if (isServer) {
    return new RootStore(isServer)
  } else {
    if (store === null) {
      store = new RootStore(isServer)
    }
    return store
  }
}
