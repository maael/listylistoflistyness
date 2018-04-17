import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu, { MenuItem } from 'material-ui/Menu'
import Link from 'next/link'
import AuthDialog from './dialogs/Auth'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

@inject('authStore') @observer
class MenuAppBar extends React.Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = action => () => {
    console.log('handing close')
    const { authStore } = this.props
    this.setState({ anchorEl: null })
    if (action === 'logout') authStore.logout()
  };

  render () {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    const { classes, authStore } = this.props

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' className={classes.flex}>
              Listy List of Listyness {authStore.user && authStore.user.username}
            </Typography>
            {authStore.token ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup='true'
                  onClick={this.handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose()}><Link prefetch href='/profile'><a>Profile</a></Link></MenuItem>
                  <MenuItem onClick={this.handleClose()}>My account</MenuItem>
                  <MenuItem onClick={this.handleClose('logout')}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <AuthDialog />
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuAppBar)
