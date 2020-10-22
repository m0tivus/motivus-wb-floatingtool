import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus
        lobortis interdum. Sed commodo faucibus orci a blandit. Sed interdum
        sapien ante, et porttitor purus blandit non. Phasellus vel rutrum
        turpis. Donec pellentesque quam nec purus hendrerit lobortis. Etiam
        eleifend orci nec eros eleifend, ac laoreet leo maximus. Nam et tellus
        risus.
      </Typography>
    </div>
  )
}
