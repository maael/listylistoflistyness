import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input from 'material-ui/Input'
import getStyles from './styles'
import SelectWrapped from './parts/SelectWrapped'

@inject('dataStore') @observer
class RealmAutocomplete extends React.Component {
  state = {
    realm: null
  };

  handleChange = name => value => {
    this.setState({ [name]: value }, () => {
      this.props.onSelect(this.state)
    })
  };

  render () {
    const { classes, dataStore } = this.props
    const { realm } = this.state
    const suggestions = dataStore.realmOptions
    return (
      <div className={classes.root}>
        <Input
          fullWidth
          inputComponent={SelectWrapped}
          value={realm}
          onChange={this.handleChange('realm')}
          placeholder='Choose Realm'
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

RealmAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func
}

RealmAutocomplete.defaultProps = {
  onSelect: () => {}
}

export default withStyles(getStyles())(RealmAutocomplete)
