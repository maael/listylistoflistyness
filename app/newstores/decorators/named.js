import { observable, computed, autorun } from 'mobx'
import optionalParams from './lib/optionalParams'

export default function (...args) {
  function getExtended (ToExtend, prop) {
    return class Named extends ToExtend {
      static storeName = `${ToExtend.name.charAt(0).toLowerCase()}${ToExtend.name.slice(1)}`
    }
  }
  return optionalParams(args, getExtended)
}
