import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { purple } from '@material-ui/core/colors'
import { startProcessing, stopProcessing } from 'actions'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'

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
}))

function ProcessButton({ isProcessing, ...props }) {
  const classes = useStyles()

  return (
    <Box display='flex' alignItems='flex-end' flexDirection='column'>
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
        {isProcessing ? 'Stop processing' : 'Allow processing !'}
      </ColorButton>

      <Typography className={classes.text}>
        {isProcessing
          ? "Keep the blender running, don't close this website"
          : 'Ready to begin?'}
      </Typography>
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
