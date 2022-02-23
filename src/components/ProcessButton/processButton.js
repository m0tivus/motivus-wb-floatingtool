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

function ProcessButton({
  isProcessing,
  tasks,
  isMobile,
  slots,
  last_result_datetime,
  tasks_available,
  ...props
}) {
  const classes = useStyles()
  const tasksRunningCount = _(tasks).values().value().length

  const [timeElapsed, setTimeElapsed] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (last_result_datetime) {
        const secs = differenceInSeconds(new Date(), last_result_datetime)
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
                <Box
                  display='flex'
                  justifyContent='flex-end'
                  alignItems='flex-end'
                >
                  <Typography className={classes.text}>
                    Using{' '}
                    <span className={classes.textTime}>
                      {tasksRunningCount} threads
                    </span>
                  </Typography>
                </Box>
                <Box display='flex' justifyContent='flex-end'>
                  <Typography className={classes.text}>
                    <span className={classes.textTime}>{timeElapsed} s</span>{' '}
                    since last result
                  </Typography>
                </Box>
                <Box display='flex' justifyContent='flex-end'>
                  <Typography className={classes.text}>
                    <span className={classes.textTime}>
                      {tasks_available || 0} tasks
                    </span>{' '}
                    available
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
                  <Box
                    display='flex'
                    justifyContent='flex-end'
                    alignItems='flex-end'
                  >
                    <Typography className={classes.text}>
                      Using{' '}
                      <span className={classes.textTime}>
                        {tasksRunningCount} threads
                      </span>
                    </Typography>
                  </Box>
                  <Box display='flex'>
                    <Typography className={classes.text}>
                      <span className={classes.textTime}>{timeElapsed} s</span>{' '}
                      since last result
                    </Typography>
                  </Box>
                  <Box display='flex'>
                    <Typography className={classes.text}>
                      <span className={classes.textTime}>
                        {tasks_available || 0} tasks
                      </span>{' '}
                      available
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
  ({
    processing: { isProcessing, tasks, slots, last_result_datetime },
    stats: { tasks_available },
  }) => ({
    isProcessing,
    tasks,
    slots,
    last_result_datetime,
    tasks_available,
  }),
  {
    startProcessing,
    stopProcessing,
  },
)(ProcessButton)
