import { computed } from 'mobx'
import { filterable, trackable, loadable, rewired, withRoot, named } from './decorators'

@withRoot
@rewired
@loadable('/api/llol/tracked/mount', true)
@filterable('mount')
@trackable('mount')
@named
export default class MountStore {
  constructor (...args) {
    console.log('made a test!', args, 'target', new.target)
  }

  onLoad (data) {
    console.log('change received', this.loaded, data)
  }

  @computed get isLoaded () {
    return this.loaded
  }
}
