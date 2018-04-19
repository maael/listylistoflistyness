import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import MountTable from '../tables/Mounts'
import PetTable from '../tables/Pets'
import ReputationTable from '../tables/Reputation'

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

class TrackablesBlock extends React.Component {
  state = {
    value: 0
  }

  onChange = prop => (e, value) => {
    this.setState({ [prop]: value !== undefined ? value : e })
  }

  render () {
    const { classes } = this.props
    const { value } = this.state

    return (
      <Grid container justify='center'>
        <Grid item xs={8}>
          <Paper className={classes.root} elevation={4}>
            <Tabs
              value={value}
              onChange={this.onChange('value')}
              fullWidth
              centered
              indicatorColor='secondary'
              textColor='secondary'
            >
              <Tab label='MOUNTS' />
              <Tab label='PETS' />
              <Tab label='REPUTATION' />
              <Tab label='PROGRESSION' />
              <Tab label='FEED' />
            </Tabs>
            <div className={classes.internal}>
              {value === 0 && <MountTable />}
              {value === 1 && <PetTable />}
              {value === 2 && <ReputationTable />}
              {value === 3 && <div>Progression</div>}
              {value === 4 && <div>Feed</div>}
            </div>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

TrackablesBlock.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TrackablesBlock)
