import { observable, computed, autorun } from 'mobx'
import optionalParams from './lib/optionalParams'

export default function (...args) {
  function getExtended (ToExtend, prop) {
    return class withRoot extends ToExtend {
      constructor (...args) {
        super(...args)
        this.rootStore = args[0]
      }
    }
  }
  return optionalParams(args, getExtended)
}
