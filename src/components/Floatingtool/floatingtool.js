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

import TabLinks from '../TabLinks/tablinks'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  wrapper: {
    position: 'fixed',
    /* width: 100 + theme.spacing(2), */
    bottom: '60px',
    right: '5px',
    zIndex: 2,
  },
  paper: {
    zIndex: -1,
    position: 'fixed',
    margin: theme.spacing(1),
    bottom: '85px',
    right: '30px',
    width: '250',
    height: 500,
    background: '#762fec',
  },
  coloredButton: {
    background: 'rgb(72,0,158)',
    background:
      'radial-gradient(circle, rgba(72,0,158,1) 0%, rgba(109,5,215,1) 65%, rgba(245,70,252,1) 100%)',
    margin: theme.spacing(1),
    boxShadow: '0px 0px 7px 1px rgba(0,0,0,0.64);',
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

        <Slide direction='left' in={checked} mountOnEnter unmountOnExit>
          <Card className={classes.paper} variant='outlined'>
            <CardContent style={{padding: '0px'}}>
              <TabLinks />

              {/*   <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant='h5' component='h2'>
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                adjective
              </Typography>
              <Typography variant='body2' component='p'>
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>

               */}
            </CardContent>

            {/*  <CardActions>
              <Button size='small'>Learn More</Button>
            </CardActions> */}
          </Card>
        </Slide>
      </div>
    </div>
  )
}
