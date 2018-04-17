import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = {
  card: {
    minWidth: 200
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  media: {
    height: 150
  }
}

class CharacterCard extends React.Component {
  render () {
    const { classes, character } = this.props
    return character ? (
      <Grid item xs={2}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={character.insetFull}
            title={character.name}
          />
          <CardContent>
            <Typography variant='headline' component='h2'>
              {character.name}
            </Typography>
            <Typography color='textSecondary'>
              {character.class} | Level {character.level}
            </Typography>
          </CardContent>
          { false && <img src={character.thumbnailFull} /> }
          { false && <img src={character.insetFull} /> }
          { false && <img src={character.mainFull} /> }
        </Card>
      </Grid>
    ) : null
  }
}

CharacterCard.propTypes = {
  classes: PropTypes.object.isRequired,
  character: PropTypes.object
}

export default withStyles(styles)(CharacterCard)
