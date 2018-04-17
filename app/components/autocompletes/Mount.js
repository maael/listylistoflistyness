import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input from 'material-ui/Input'
import getStyles from './styles'
import SelectWrapped from './parts/SelectWrapped'

@inject('mountStore') @observer
class MountAutocomplete extends React.Component {
  state = {
    mount: null
  };

  handleChange = name => value => {
    this.setState({ [name]: value }, () => {
      this.props.onSelect(this.state)
    })
  };

  render () {
    const { classes, mountStore } = this.props
    const { mount } = this.state
    const suggestions = mountStore.options
    return (
      <div className={classes.root}>
        <Input
          fullWidth
          inputComponent={SelectWrapped}
          value={mount}
          onChange={this.handleChange('mount')}
          placeholder='Choose Mount'
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

MountAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func
}

MountAutocomplete.defaultProps = {
  onSelect: () => {}
}

export default withStyles(getStyles())(MountAutocomplete)
