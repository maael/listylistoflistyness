import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
// import CheckIcon from 'material-ui-icons/Check'
// import CachedIcon from 'material-ui-icons/Cached'
import ErrorIcon from '@material-ui/icons/Error'

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
    username: ''
  };

  handleChange = prop => event => {
    const { onChange } = this.props
    this.setState({ [prop]: event.target.value }, () => {
      onChange(this.state.username)
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
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor='adornment-username'>Username</InputLabel>
          <Input
            id='adornment-username'
            type='text'
            value={this.state.username}
            onChange={this.handleChange('username')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton disabled>
                  <ErrorIcon />
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
