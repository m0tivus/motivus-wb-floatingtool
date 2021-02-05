import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { Box } from '@material-ui/core'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 2),
    height: '380px',
  },
  //heading: { color: theme.palette.primary.dark },
}))

//TODO hook de las opciones

const marks = [
  {
    value: 25,
    label: '1 thread',
    disabled: false,
  },
  {
    value: 50,
    label: '2 threads',
    disabled: true,
  },
  {
    value: 75,
    label: '3 threads',
    disabled: true,
  },
  {
    value: 100,
    label: '4 threads',
    disabled: true,
  },
]

function valuetext(value) {
  return `${value}%`
}

function valueLabelFormat(value) {
  return ''
}

export default function DiscreteSlider() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography
        className={classes.heading}
        variant='h2'
        id='discrete-slider-restrict'
        gutterBottom
        align='center'
      >
        Make my device SWEAT!
      </Typography>
      <Box pt={2}>
        <Typography align='left' id='discrete-slider-restrict' gutterBottom>
          CPU Usage:
        </Typography>
        <Slider
          defaultValue={25}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-restrict'
          step={null}
          valueLabelDisplay='off'
          marks={marks}
          disabled
        />
      </Box>
      <Box pt={2}>
        <FormGroup row>
          <FormControlLabel
            disabled
            control={<Switch />}
            label='Allow processing on GPU'
          />
        </FormGroup>
      </Box>
    </div>
  )
}
