import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { purple } from '@material-ui/core/colors'
import { startProcessing, stopProcessing } from 'actions'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import style from './loader.module.css'

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

function ProcessButton({ isProcessing, ...props }) {
  const classes = useStyles()

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
            <Typography className={classes.text}>
              Keep the blender running, don't close this website
            </Typography>
            <Box display='flex' flexDirection='row' justifyContent='flex-end'>
              <Box display='flex'>
                <Typography className={classes.text}>
                  <span className={classes.textTime}>N° s</span> Time
                  processing: Package name
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography className={classes.text}>Ready to begin?</Typography>
        )}
      </Box>
    </Box>
  )
}
export default connect(
  ({ processing: { isProcessing } }) => ({ isProcessing }),
  {
    startProcessing,
    stopProcessing,
  },
)(ProcessButton)
