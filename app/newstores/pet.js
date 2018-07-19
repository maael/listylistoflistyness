import { computed } from 'mobx'
import { filterable, trackable, loadable, rewired, withRoot, named } from './decorators'

@withRoot
@rewired
@loadable('/api/llol/tracked/pet', true)
@filterable('pet')
@trackable('pet')
@named
export default class PetStore {
  constructor (...args) {
    console.log('made a test!', args, this.rootStore)
  }

  @computed get isLoaded () {
    return this.loaded
  }
}
