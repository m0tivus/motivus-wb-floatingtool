import React from 'react'
import Switch from '@material-ui/core/Switch'
import Slide from '@material-ui/core/Slide'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import { Box, Grid, Divider } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import TabLinks from '../TabLinks/tablinks'

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100vh',
  },
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
  body: {
    zIndex: -1,
    position: 'fixed',
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      bottom: '20px',
      right: '5px',
    },
    [theme.breakpoints.up('md')]: {
      bottom: '85px',
      right: '10px',
    },

    maxWidth: '480px',
    height: 600,
  },
  content: {
    witdh: '100%',
    height: '100%',
  },

  coloredButton: {
    background: 'rgb(72,0,158)',
    background:
      'radial-gradient(circle, rgba(72,0,158,1) 0%, rgba(109,5,215,1) 65%, rgba(245,70,252,1) 100%)',
    margin: theme.spacing(1),
    boxShadow: '0px 0px 7px 1px rgba(0,0,0,0.64);',
  },
  bottomAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: 'white',
    margin: '10px',
  },
}))

export default function SimpleSlide() {
  const classes = useStyles()
  const [checked, setChecked] = React.useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label='add'
          className={classes.coloredButton}
          onClick={handleChange}
        >
          <img src='logomotivuswhite.svg' width='50' height='50' />
        </Fab>
        <Box className={classes.body}>
          <Slide direction='left' in={checked} mountOnEnter unmountOnExit>
            <Card className={classes.content} variant='outlined'>
              <CardContent style={{ padding: '0px', height: '90%' }}>
                <TabLinks />
              </CardContent>

              <CardActions className={classes.bottomAction}>
                <Button
                  variant='contained'
                  color='secondary'
                  className={classes.button}
                  startIcon={<AccountCircleIcon />}
                  size='small'
                >
                  Login
                </Button>
                {/* <Divider
                  className={classes.divider}
                  orientation='vertical'
                  flexItem
                  variant='middle'
                /> */}
                <p style={{ zIndex: 5 }}>
                  Powered by <a href='http://motivus.cl/'> Motivus</a>{' '}
                </p>
              </CardActions>
            </Card>
          </Slide>
        </Box>
      </div>
    </div>
  )
}
