import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import ProcessButton from '../ProcessButton'
import Animation from '../Aniamtion'
import { Box, Grid } from '@material-ui/core'
import { FormatItalic } from '@material-ui/icons'
import GuestAvatar from '../../asset/GuestAvatar.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
    alignItems: 'center',
  },
  img: {
    [theme.breakpoints.down('sm')]: {
      height: 170,
    },
    [theme.breakpoints.up('md')]: {
      height: 200,
    },

    display: 'block',
    overflow: 'hidden',
    objectFit: 'cover',
    width: '100%',
  },

  typeLabel: {
    paddingBottom: '20px',
    fontSize: '1.2rem',
  },
  title: {
    fontFamily: 'Asap',
    fontWeight: 'Bold',
    fontStyle: 'Italic',
    color: theme.palette.secondary.light,
  },
  revolution: {
    color: theme.palette.secondary.light,
  },
  revolutionText: {
    fontFamily: 'Asap',
    fontWeight: '200',
    fontStyle: 'normal',
  },
  avatar: {
    border: `4px solid ${theme.palette.secondary.light}`,
    boxShadow: theme.shadows[6],
    borderRadius: '100px',
  },
}))

function ProjectsCarousel() {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.root}>
      <Box display='flex' mt={2}>
        <Typography variant='h2' align='center'>
          Join the <span className={classes.revolution}>revolution</span> in
          distributed computing!{' '}
          <span className={classes.revolutionText}>
            Help scientific to reach they goals and get extra earning in the
            process.
          </span>
        </Typography>
      </Box>
      <Box display='flex' my={3}>
        <Grid container>
          <Grid item xs={4}>
            <Box
              display='flex'
              width='100%'
              height='100%'
              justifyContent='center'
              alignItems='center'
            >
              <img
                src={GuestAvatar}
                width={110}
                alt='guestAvatar'
                className={classes.avatar}
              ></img>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display='flex' flexDirection='column' pl={2}>
              <Typography variant='body2'>user:</Typography>
              <Typography variant='h3'>Guest</Typography>
              <Typography variant='body2'>ranking:</Typography>
              <Typography variant='h3'>...</Typography>
              <Typography variant='body2'>Total task</Typography>
              <Typography variant='h3'>...</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body2'>Total floats:</Typography>
              <Typography variant='h3'>300 mgs</Typography>
              <Typography variant='body2'>Time porceses per day:</Typography>
              <Typography variant='h3'>...</Typography>
              <Typography variant='body2'>Data process per hour</Typography>
              <Typography variant='h3'>...</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box display='flex' mt={4}>
        <Typography variant='h1' align='center'>
          <span className={classes.revolution}>Log in now!</span> and transform
          your help in porfits:
        </Typography>
      </Box>
      <Box
        my={1}
        justifyContent='center'
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        <Box display='flex' justifyContent='flex-end' flex='2'>
          <ProcessButton />
        </Box>

        <Box display='flex' flex='1' width='100px' height='120px'>
          <Animation />
        </Box>
      </Box>
    </div>
  )
}

export default ProjectsCarousel
