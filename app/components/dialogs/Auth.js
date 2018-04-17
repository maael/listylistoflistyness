import React from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import Dialog from 'material-ui/Dialog'
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
class AuthDialog extends React.Component {
  state = {
    open: false,
    value: 0,
    username: '',
    password: ''
  }

  handleOpenChange = (open) => () => {
    this.setState({ open })
  }

  handleClick = (e) => {
    e.preventDefault()
    document.activeElement.blur()
    const { authStore } = this.props
    const { value, username, password } = this.state
    const method = value === 0 ? 'login' : 'register'
    authStore[method](username, password)
    this.handleOpenChange(false)()
  }

  onChange = prop => (e, value) => {
    this.setState({ [prop]: value !== undefined ? value : e })
  }

  render () {
    const { classes } = this.props
    const { open, value } = this.state

    return (
      <div>
        <Button onClick={this.handleOpenChange(true)} color='primary'>Login/Register</Button>
        <Dialog open={open} onClose={this.handleOpenChange(false)}>
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
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(AuthDialog)

