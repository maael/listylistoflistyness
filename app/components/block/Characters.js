import React from 'react'
import { inject, observer } from 'mobx-react'
import Grid from 'material-ui/Grid'
import CharacterCard from '../cards/Character'

@inject('characterStore') @observer
class CharactersBlock extends React.Component {
  render () {
    const { characterStore } = this.props

    return (
      <Grid container justify='center'>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={24}>
            {characterStore.characters.map((c) => <CharacterCard key={c.thumbnail} character={c} />)}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default CharactersBlock
