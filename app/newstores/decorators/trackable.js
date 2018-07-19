import { observable, computed, autorun } from 'mobx'
import optionalParams from './lib/optionalParams'

export default function (...args) {
  function getExtended (ToExtend, prop) {
    return class Trackable extends ToExtend {
      @observable tracking = []

      constructor (...args) {
        super(...args)
        autorun(() => {
          console.log(this.tracking.length)
        })
      }

      track (item) {
        this.tracking.push(item)
      }

      @computed get results () {
        return this.tracking
      }
    }
  }
  return optionalParams(args, getExtended)
}
