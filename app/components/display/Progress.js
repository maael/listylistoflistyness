import React from 'react'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'

const styles = {
  outer: { position: 'relative', height: '20px', backgroundColor: '#eeeeee' },
  inner: { height: '20px' },
  label: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  Hated: { backgroundColor: '#cc2222' },
  Hostile: { backgroundColor: 'red' },
  Unfriendly: { backgroundColor: '#ee6622' },
  Neutral: { backgroundColor: 'yellow' },
  Friendly: { backgroundColor: 'lime' },
  Honoured: { backgroundColor: '#00ff88' },
  Revered: { backgroundColor: '#00ffcc' },
  Exalted: { backgroundColor: 'cyan' }
}

function Progress ({ classes, value, max, label, color }) {
  return (
    <div className={classes.outer}>
      <div className={classnames(classes.inner, classes[color])} style={{ width: `${(value / max) * 100}%` }} />
      <span className={classes.label}>{value}/{max}</span>
    </div>
  )
}

export default withStyles(styles)(Progress)
