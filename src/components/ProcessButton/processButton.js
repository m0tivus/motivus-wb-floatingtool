import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { purple } from '@material-ui/core/colors'
import { startProcessing, stopProcessing } from 'actions'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { differenceInSeconds } from 'date-fns'
import _ from 'lodash'

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#cc00ff',
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button)

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: '8px',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'none',
    fontSize: '1rem',
    zIndex: '20000',
  },

  text: {
    fontWeight: 'regular',
    textTransform: 'none',
    fontSize: '0.8rem',
  },

  textTime: {
    fontWeight: 'bold',
    textTransform: 'none',
    fontSize: '1rem',
    color: theme.palette.secondary.light,
  },
}))

function ProcessButton({ isProcessing, task, isMobile, ...props }) {
  const classes = useStyles()
  const { ref, started_on } = task
  const [timeElapsed, setTimeElapsed] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (started_on) {
        const secs = differenceInSeconds(new Date(), started_on)
        !isNaN(secs) && setTimeElapsed(secs)
      } else {
        setTimeElapsed(0)
      }
    }, 1000)
    return () => clearInterval(timer)
  })

  return (
    <Box
      display='flex'
      alignItems='flex-end'
      justifyContent='flex-start'
      flexDirection='column'
    >
      <ColorButton
        size='large'
        variant='contained'
        color='primary'
        className={classes.margin}
        onClick={() => {
          if (!isProcessing) {
            props.startProcessing()
          } else {
            props.stopProcessing()
          }
        }}
      >
        {isProcessing ? 'Stop processing' : 'Start processing'}
      </ColorButton>
      <Box display='flex'>
        {isProcessing ? (
          <Box display='flex' flexDirection='column'>
            {!isMobile ? (
              <React.Fragment>
                <Box display='flex'>
                  <Typography className={classes.text}>
                    <span className={classes.textTime}>{timeElapsed} s</span>{' '}
                    Time processing
                  </Typography>
                </Box>
                <Box display='flex'>
                  <Typography className={classes.text}>
                    <span className={classes.textTime}>
                      {ref ? _(ref).split('-').value()[0] : 'Waiting input...'}{' '}
                    </span>
                    {ref && 'Package name'}
                  </Typography>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography className={classes.text}>
                  Keep the blender running, don't close this website
                </Typography>
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent='flex-end'
                  alignItems='flex-end'
                >
                  <Box display='flex'>
                    <Typography className={classes.text}>
                      <span className={classes.textTime}>{timeElapsed} s</span>{' '}
                      Time processing
                    </Typography>
                  </Box>
                  <Box display='flex'>
                    <Typography className={classes.text}>
                      <span className={classes.textTime}>
                        {ref
                          ? _(ref).split('-').value()[0]
                          : 'Waiting input...'}{' '}
                      </span>
                      {ref && 'Package name'}
                    </Typography>
                  </Box>
                </Box>
              </React.Fragment>
            )}
          </Box>
        ) : (
          <Typography className={classes.text}>Ready to begin?</Typography>
        )}
      </Box>
    </Box>
  )
}
export default connect(
  ({ processing: { isProcessing, task } }) => ({ isProcessing, task }),
  {
    startProcessing,
    stopProcessing,
  },
)(ProcessButton)
