import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { Box } from '@material-ui/core'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { CenterFocusStrong } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 2),
  },
  //heading: { color: theme.palette.primary.dark },
}))

const marks = [
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
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
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

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
          CPU usage:
        </Typography>
        <Slider
          defaultValue={50}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-restrict'
          step={null}
          valueLabelDisplay='off'
          marks={marks}
        />
      </Box>
      <Box pt={2}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={state.checkedB}
                onChange={handleChange}
                name='checkedB'
                color='primary'
              />
            }
            label='Enable GPU'
          />
        </FormGroup>
      </Box>
    </div>
  )
}
