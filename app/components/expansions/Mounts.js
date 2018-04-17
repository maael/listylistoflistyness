import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Table from '../tables/Mounts'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

function MountsPanel (props) {
  const { classes } = props
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>Mounts</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Table />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

MountsPanel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MountsPanel)
