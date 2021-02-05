import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { Box } from '@material-ui/core'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import _ from 'lodash'
import { connect, useSelector } from 'react-redux'
import * as selectors from 'sagas/selectors'
import { setThreadCount } from 'actions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 2),
    height: '380px',
  },
  //heading: { color: theme.palette.primary.dark },
}))

//TODO hook de las opciones

const getSuffix = (i, maxThreads) =>
  maxThreads > 8 ? '' : `thread${i > 0 ? 's' : ''}`
const maxThreads = navigator.hardwareConcurrency - 1
const marks = _(new Array(maxThreads))
  .map((_t, i) => ({
    value: i + 1,
    label: `${i + 1} ${getSuffix(i, maxThreads)}`,
    disabled: i === 0,
  }))
  .value()

function valuetext(value) {
  return `${value}%`
}

function valueLabelFormat(value) {
  return ''
}

function Options(props) {
  const classes = useStyles()
  const threadCount = useSelector(selectors.threadCount)

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
          CPU threads:
        </Typography>
        <Slider
          value={threadCount}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-restrict'
          step={null}
          valueLabelDisplay='off'
          marks={marks}
          min={1}
          max={maxThreads}
          onChangeCommitted={(_e, value) => props.setThreadCount(value)}
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
export default connect(null, { setThreadCount })(Options)
