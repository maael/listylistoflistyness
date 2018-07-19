import { action, observable } from 'mobx'
import axios from 'axios'

export default class CollectedStore {
  @observable loaded = false
  @observable pets = { collected: [] }
  @observable mounts = { collected: [] }
  /* character specific */
  @observable achievements = {}
  @observable items = {}
  @observable titles = {}
  @observable reputations = {}
  @observable progression = {}
  @observable professions = {}

  endpoint = '/api/blizzard/character/'

  reputationMapping = {
    0: { standingName: 'Hated' },
    1: { standingName: 'Hostile' },
    2: { standingName: 'Unfriendly' },
    3: { standingName: 'Neutral' },
    4: { standingName: 'Friendly' },
    5: { standingName: 'Honoured' },
    6: { standingName: 'Revered' },
    7: { standingName: 'Exalted' }
  }

  constructor (rootStore, isServer) {
    this.rootStore = rootStore
    if (!isServer) this.load()
  }

  @action.bound
  load ({ realm, name }) {
    axios(`${this.endpoint}${realm}/${name}`).then(({ data, status }) => {
      if (status === 200) {
        const { titles, mounts, pets, reputation, progression, professions } = data
        this.mounts = mounts
        this.pets = pets
        this.titles[`${realm}-${name}`] = titles.map((title) =>
          Object.assign({}, title, { full: title.name.replace('%s', name) })
        )
        this.reputations[`${realm}-${name}`] = reputation.map((item) =>
          Object.assign({}, item, this.reputationMapping[item.standing])
        )
        this.professions[`${realm}-${name}`] = professions
        this.progression[`${realm}-${name}`] = progression
      }
    }).catch(console.error)
  }

  @action.bound
  filterCurrentCharacter (type, filterFn = () => {}) {
    const selectedCharacter = this.rootStore.characterStore.selected
    const tracked = this.rootStore.characterTrackedStore.getField(type, selectedCharacter)
    return this[type][selectedCharacter] ? this[type][selectedCharacter].reduce((items, item) => {
      return filterFn(item, tracked) ? items.concat(item) : items
    }, []) : []
  }

  @action.bound
  match (type, item, subfield) {
    return (toCompare) => {
      const comparison = subField ? toCompare[subField] : toCompare
      return type.id === comparison.id
    }
  }
}
