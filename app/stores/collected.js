import { action, observable, computed } from 'mobx'
import axios from 'axios'

export default class CollectedStore {
  @observable loaded = false
  @observable pets = { collected: [] }
  @observable mounts = { collected: [] }
  @observable characterAchievements = {}
  @observable characterItems = {}
  @observable characterTitles = {}
  @observable characterReputations = {}
  @observable characterProgression = {}
  @observable characterProfessions = {}

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
    if (!isServer) this.load()
  }

  @action.bound
  load ({ realm, name }) {
    axios(`${this.endpoint}${realm}/${name}`).then(({ data, status }) => {
      if (status === 200) {
        const { titles, mounts, pets, reputation, progression, professions } = data
        this.mounts = mounts
        this.pets = pets
        this.characterTitles[`${realm}-${name}`] = titles.map((title) =>
          Object.assign({}, title, { full: title.name.replace('%s', name) })
        )
        this.characterReputations[`${realm}-${name}`] = reputation.map((item) =>
          Object.assign({}, item, this.reputationMapping[item.standing])
        )
        this.characterProfessions[`${realm}-${name}`] = professions
        this.characterProgression[`${realm}-${name}`] = progression
        console.log('say what', this)
      }
    }).catch(console.error)
  }
}
