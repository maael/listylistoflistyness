import { observable, computed, autorun } from 'mobx'
import optionalParams from './lib/optionalParams'

export default function (...args) {
  function getExtended (ToExtend, prop) {
    return class Rewired extends ToExtend {
      rewire (...args) {
        const [ useable, ...funcArgs ] = args
        const implementation = this.__proto__[useable]
        if (typeof implementation === 'function') return implementation.apply(this, funcArgs)
        return implementation
      }
    }
  }
  return optionalParams(args, getExtended)
}
