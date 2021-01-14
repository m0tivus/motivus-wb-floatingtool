import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { purple } from '@material-ui/core/colors'
import { startProcessing, stopProcessing } from 'actions'
import { connect } from 'react-redux'

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
    margin: theme.spacing(1),
    fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'none',
  },
}))

function ProcessButton({ isProcessing, ...props }) {
  const classes = useStyles()

  return (
    <div>
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
        {isProcessing ? 'Processing...' : 'Allow processing'}
      </ColorButton>
    </div>
  )
}
export default connect(
  ({ processing: { isProcessing } }) => ({ isProcessing }),
  {
    startProcessing,
    stopProcessing,
  },
)(ProcessButton)
