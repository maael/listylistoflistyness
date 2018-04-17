import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input from 'material-ui/Input'
import getStyles from './styles'
import SelectWrapped from './parts/SelectWrapped'

@inject('petStore') @observer
class PetAutocomplete extends React.Component {
  state = {
    pet: null
  };

  handleChange = name => value => {
    this.setState({ [name]: value }, () => {
      this.props.onSelect(this.state)
    })
  };

  render () {
    const { classes, petStore } = this.props
    const { pet } = this.state
    const suggestions = petStore.options
    return (
      <div className={classes.root}>
        <Input
          fullWidth
          inputComponent={SelectWrapped}
          value={pet}
          onChange={this.handleChange('pet')}
          placeholder='Choose Pet'
          id='react-select-single'
          inputProps={{
            classes,
            name: 'react-select-single',
            instanceId: 'react-select-single',
            simpleValue: true,
            options: suggestions
          }}
        />
      </div>
    )
  }
}

PetAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func
}

PetAutocomplete.defaultProps = {
  onSelect: () => {}
}

export default withStyles(getStyles())(PetAutocomplete)
