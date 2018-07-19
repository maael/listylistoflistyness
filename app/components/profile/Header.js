import React from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

const styles = {
  root: {
    backgroundColor: 'grey',
    height: '30vh'
  },
  mainBlock: {
    position: 'relative',
    height: '20vh',
    top: '-10vh'
  }
}

class ProfileHeader extends React.Component {
  render () {
    const { classes, user = {} } = this.props
    return (
      <div>
        <div className={classes.root} style={{ backgroundImage: `url(${''})` }}></div>
        <Grid container justify='center'>
          <Grid item xs={4}>
            <Paper className={classes.mainBlock} elevation={4}>
              {user.username}
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(ProfileHeader)
