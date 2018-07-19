import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

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
class BattleNetBlock extends React.Component {
  revoke = (id) => () => {
    const { authStore } = this.props
    authStore.revoke(id)
  }

  render () {
    const { classes, authStore } = this.props
    console.log(authStore.user && authStore.user.battlenet)
    return (
      <Grid container justify='center'>
        <Grid item xs={4}>
          <Paper className={classes.root} elevation={4}>
            <div className={classes.internal}>
              <List>
                { authStore.user && authStore.user.battlenet && authStore.user.battlenet.length ? (
                  authStore.user.battlenet.map(({ id, battletag }) => (
                    <ListItem key={id}>
                      <ListItemText>Account: {battletag}</ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton aria-label='Remove' onClick={this.revoke(id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <ListItem><ListItemText>No Battle.net Associated</ListItemText></ListItem>
                )
                }
              </List>
              <Button href='/auth/bnet' size='small' fullWidth variant='raised' color='primary'>Add Battlenet</Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

BattleNetBlock.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BattleNetBlock)
