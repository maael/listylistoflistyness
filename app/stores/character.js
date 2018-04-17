import { action, observable } from 'mobx'
import axios from 'axios'

export default class CharacterStore {
  @observable loaded = false
  @observable characters = []

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  load () {
    axios('/api/blizzard/character').then(({ data, status }) => {
      if (status === 200) {
        this.characters = data.characters
        const viableCharacters = data.characters.filter(({ level }) => level > 5)
        if (viableCharacters.length) this.rootStore.collectedStore.load(viableCharacters[0])
        this.loaded = true
      }
    }).catch(console.error)
  }

  add ({ realm, name }) {
    axios(`/api/blizzard/character/${realm}/${name}`).then(({ data, status }) => {
      if (status === 200) {
        this.characters.push(data)
        this.loaded = true
      }
    }).catch(console.error)
  }
}
