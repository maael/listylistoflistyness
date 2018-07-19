import { action, observable, computed } from 'mobx'
import axios from 'axios'

export default class CharacterStore {
  @observable loaded = false
  @observable characters = []
  @observable selected = ''

  endpoint = '/api/blizzard/character/'

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  load () {
    axios(this.endpoint).then(({ data, status }) => {
      if (status === 200) {
        this.characters = data.characters
        const viableCharacters = data.characters.filter(({ level }) => level > 5)
        if (viableCharacters.length) {
          this.selected = `${viableCharacters[0].realm}-${viableCharacters[0].name}`
          console.log('set', this.selected)
          viableCharacters.forEach((char) => {
            this.rootStore.collectedStore.load(char)
          })
        }
        this.loaded = true
      }
    }).catch(console.error)
  }

  @action.bound
  select (character) {
    this.selected = `${character.realm}-${character.name}`
    console.log('selected', this.selected)
  }

  add ({ realm, name }) {
    axios(`${this.endpoint}${realm}/${name}`).then(({ data, status }) => {
      if (status === 200) {
        this.characters.push(data)
        this.loaded = true
      }
    }).catch(console.error)
  }

  @computed get selectedCharacter () {
    const [ realm, name ] = this.selected.split('-')
    return characters.find((char) => (char.name === name && char.realm === realm))
  }
}
