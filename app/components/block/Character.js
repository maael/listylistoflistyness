import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Button from 'material-ui/Button'
import RealmAutocomplete from '../autocompletes/Realm'

import MountAutocomplete from '../autocompletes/Mount'
import PetAutocomplete from '../autocompletes/Pet'

const styles = theme => ({
  root: theme.mixins.gutters({
    margin: theme.spacing.unit * 2,
    padding: '0 !important',
    display: 'flex',
    flexWrap: 'wrap'
  }),
  input: {
    boxSizing: 'border-box',
    margin: theme.spacing.unit,
    width: '100%'
  }
})

@inject('characterStore') @observer
class CharacterBlock extends React.Component {
  state = {
    name: '',
    realm: ''
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  submit = event => {
    const { characterStore } = this.props
    characterStore.add(this.state)
  }

  render () {
    const { classes } = this.props
    const { name } = this.state
    return (
      <Grid container justify='center'>
        <Grid item xs={4}>
          <Paper className={classes.root} elevation={4}>
            <FormControl className={classes.input}>
              <InputLabel htmlFor='adornment-character-name'>Character Name</InputLabel>
              <Input
                id='adornment-character-name'
                type='text'
                value={name}
                onChange={this.handleChange('name')}
              />
            </FormControl>
            <RealmAutocomplete onSelect={({ realm }) => this.setState({ realm })} />
            <MountAutocomplete />
            <PetAutocomplete />
            <Button fullWidth variant='raised' color='primary' onClick={this.submit}>Add</Button>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

CharacterBlock.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CharacterBlock)
