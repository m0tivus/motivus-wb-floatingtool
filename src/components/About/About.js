import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 2),
  },
  //heading: { color: theme.palette.primary.dark },
}))

export default function DiscreteSlider() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography
        align='center'
        className={classes.heading}
        variant='h2'
        id='discrete-slider-restrict'
        gutterBottom
      >
        Get started!
      </Typography>

      <Typography align='center'>
        Instead of using a supercomputer or an expensive cloud service, Motivus
        empowers regular computer users to share their computing resources to
        create a powerful and collaborative high computing network. Our network
        is able to tackle the most demanding data science problems.
      </Typography>
    </div>
  )
}
