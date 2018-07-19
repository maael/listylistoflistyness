import { observable, computed, autorun } from 'mobx'
import optionalParams from './lib/optionalParams'

export default function (...args) {
  function getExtended (ToExtend, prop) {
    return class Filterable extends ToExtend {
      @observable activeFilter = 'hey now'

      constructor (...args) {
        super(...args)
        autorun(() => {
          console.log(this.activeFilter === 'now')
        })
      }

      filter (fields) {
        this.activeFilter = fields
      }

      @computed get results () {
        return this.activeFilter
      }
    }
  }
  return optionalParams(args, getExtended)
}
