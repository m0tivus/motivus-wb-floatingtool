import React from 'react'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import { Box } from '@material-ui/core'
import style from './floatingTool.module.css'
import { connect, useSelector } from 'react-redux'
import Footer from '../Footer/Footer'
import Login from '../LogIn/Login'
import { startProcessing, stopProcessing } from 'actions'

import TabLinks from '../TabLinks/tablinks'

var Motivus = window.Motivus || {}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'fixed',
    /* width: 100 + theme.spacing(2), */
    [theme.breakpoints.down('sm')]: {
      bottom: '10px',
      right: '3px',
    },
    [theme.breakpoints.up('md')]: {
      bottom: '60px',
      right: '5px',
    },
    right: '5px',
    zIndex: 2,
  },
  widgetContainer: {
    zIndex: -1,
    position: 'fixed',
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      bottom: '20px',
      right: '5px',
      maxWidth: '94vw',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      bottom: '85px',
      right: '10px',
    },

    maxWidth: '480px',
    // width: '100%',
    height: 550,
  },
  content: {
    witdh: '100%',
    height: '100%',
  },

  toggler: {
    background:
      'radial-gradient(circle, rgba(72,0,158,1) 0%, rgba(109,5,215,1) 65%, rgba(245,70,252,1) 100%)',
    margin: theme.spacing(1),
    boxShadow: '0px 0px 7px 1px rgba(0,0,0,0.64);',
  },
  bottomAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'sticky',
    bottom: '0px',
  },
  divider: {
    backgroundColor: 'white',
    margin: '10px',
  },
}))

function FloatingTool(props) {
  const isProcessing = useSelector((state) => state.processing.isProcessing)
  const classes = useStyles()
  const [open, setOpen] = React.useState(Motivus.startOpen || false)
  const isUserGuest = useSelector(({ app }) => app.isUserGuest)

  const toggleOpen = React.useCallback(() => {
    setOpen((prev) => !prev)
  }, [setOpen])

  React.useEffect(() => {
    window.Motivus = {
      ...window.Motivus,
      openFloatingTool: toggleOpen,
      startProcessing: props.startProcessing,
      stopProcessing: props.stopProcessing,
    }
  }, [props.startProcessing, props.stopProcessing, toggleOpen])

  React.useEffect(() => {
    if (Motivus.gaTrackEvent) {
      open &&
        Motivus.gaTrackEvent({
          category: 'Click',
          action: 'Open widget',
          label: 'Widget opens',
        })
    }
  }, [open])

  return (
    <div className={classes.wrapper}>
      <Fab aria-label='add' className={classes.toggler} onClick={toggleOpen}>
        <img
          src='https://widget.motivus.cl/logo.svg'
          alt='logo'
          width='50'
          height='50'
          className={isProcessing && !open ? style.floatingTool : null}
        />
      </Fab>
      <Slide direction='left' in={open} mountOnEnter unmountOnExit>
        <Box className={classes.widgetContainer}>
          <Card className={classes.content} variant='outlined'>
            <CardContent style={{ padding: '0px', height: '90%' }}>
              <TabLinks />
            </CardContent>

            <CardActions className={classes.bottomAction}>
              {isUserGuest ? <Login /> : <Footer />}
            </CardActions>
          </Card>
        </Box>
      </Slide>
    </div>
  )
}

export default connect(null, { startProcessing, stopProcessing })(FloatingTool)
