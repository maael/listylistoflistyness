import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Button from 'material-ui/Button'
import UsernameInput from '../input/Username'
import PasswordInput from '../input/Password'

const styles = theme => ({
  root: theme.mixins.gutters({
    margin: theme.spacing.unit * 2,
    padding: '0 !important'
  }),
  internal: theme.mixins.gutters({
    paddingLeft: '0 !important',
    paddingRight: '0 !important'
  })
})

@inject('authStore') @observer
class AuthBlock extends React.Component {
  state = {
    value: this.props.defaultTab,
    username: '',
    password: ''
  }

  handleClick = (e) => {
    e.preventDefault()
    document.activeElement.blur()
    const { authStore } = this.props
    const { value, username, password } = this.state
    const method = value === 0 ? 'login' : 'register'
    authStore[method](username, password)
  }

  onChange = prop => (e, value) => {
    this.setState({ [prop]: value !== undefined ? value : e })
  }

  render () {
    const { classes } = this.props
    const { value } = this.state

    return (
      <Grid container justify='center'>
        <Grid item xs={4}>
          <Paper className={classes.root} elevation={4}>
            <Tabs
              value={value}
              onChange={this.onChange('value')}
              fullWidth
              centered
              indicatorColor='secondary'
              textColor='secondary'
            >
              <Tab label='LOGIN' />
              <Tab label='REGISTER' />
            </Tabs>
            <div className={classes.internal}>
              <form onSubmit={this.handleClick}>
                <UsernameInput onChange={this.onChange('username')} />
                <PasswordInput onChange={this.onChange('password')} />
                {value === 0 && <Button fullWidth variant='raised' color='primary' type='submit' onClick={this.handleClick}>Login</Button>}
                {value === 1 && <Button fullWidth variant='raised' color='primary' type='submit' onClick={this.handleClick}>Register</Button>}
              </form>
            </div>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

AuthBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  defaultTab: PropTypes.number
}

AuthBlock.defaultProps = {
  defaultTab: 0
}

export default withStyles(styles)(AuthBlock)
