import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import PetsExpansion from '../expansions/Pets'
import MountsExpansion from '../expansions/Mounts'

const styles = theme => ({
  root: theme.mixins.gutters({
    margin: theme.spacing.unit * 2,
    padding: '0 !important'
  })
})

class ExpansionsBlock extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <Grid container justify='center'>
        <Grid item xs={8}>
          <Paper className={classes.root} elevation={4}>
            <PetsExpansion />
            <MountsExpansion />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

ExpansionsBlock.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ExpansionsBlock)
