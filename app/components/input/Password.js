import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  }
})

class InputAdornments extends React.Component {
  state = {
    password: '',
    showPassword: false
  };

  handleChange = prop => event => {
    const { onChange } = this.props
    this.setState({ [prop]: event.target.value }, () => {
      onChange(this.state.password)
    })
  };

  handleMouseDownPassword = event => {
    event.preventDefault()
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  };

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <FormControl fullWidth className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor='adornment-password'>Password</InputLabel>
          <Input
            id='adornment-password'
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='Toggle password visibility'
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    )
  }
}

InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

InputAdornments.defaultProps = {
  onChange: () => {}
}

export default withStyles(styles)(InputAdornments)
