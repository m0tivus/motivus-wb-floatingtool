import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ProcessButton from '../ProcessButton'
import Animation from '../Aniamtion'
import { Box, Grid, Link } from '@material-ui/core'
import { useSelector } from 'react-redux'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import _ from 'lodash'

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
  const {
    task_quantity,
    elapsed_time,
    season,
    processing_ranking,
    threads_available,
    threads_processing,
  } = useSelector((state) => state.stats)

  const user = useSelector(({ user }) => user)
  const formatHours = (number) => Number.parseFloat(number).toFixed(2)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const medalColor =
    processing_ranking === 1
      ? 'yellow'
      : processing_ranking === 2
        ? 'silver'
        : processing_ranking === 3
          ? '#f2aa8c'
          : null

  return (
    <div className={classes.root}>
      <Box display='flex' mt={1}>
        {isMobile ? (
          <Typography variant='h2' align='center'>
            Welcome to the beta version of the{' '}
            <span className={classes.revolution}>Motivus Floating Tool.</span>{' '}
          </Typography>
        ) : (
          <Typography variant='h2' align='center'>
            Welcome to the beta version of the{' '}
            <span className={classes.revolution}>Motivus Floating Tool.</span>{' '}
          </Typography>
        )}
      </Box>
      <Box display='flex' my={1}>
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
                src={
                  user.avatar
                    ? user.avatar
                    : 'https://widget.motivus.cl/GuestAvatar.svg'
                }
                width={110}
                alt={user.name ? user.name : 'guestAvatar'}
                className={classes.avatar}
              ></img>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display='flex' flexDirection='column' pl={2}>
              <Typography variant='body2'>User:</Typography>
              <Typography variant='h3'>
                {_.truncate(user.name, { length: 20 })}
              </Typography>
              <Typography variant='body2'>Season:</Typography>
              <Typography variant='h3'>
                {season && season.name ? season.name : 'n/a'}
              </Typography>
              <Typography variant='body2'>Connected Threads:</Typography>
              <Typography variant='h3'>
                {threads_available + threads_processing || 'n/a'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body2'>Contributions:</Typography>
              <Typography variant='h3'>{task_quantity || 0} tasks</Typography>
              <Typography variant='body2'>Elapsed Time:</Typography>
              <Typography variant='h3'>
                {elapsed_time ? formatHours(elapsed_time / 60 / 60) : 0} h
              </Typography>
              <Typography variant='body2'>Ranking:</Typography>
              <Box display='flex' alignItems='center'>
                <Typography variant='h2'>
                  {processing_ranking || 'n/a'}
                </Typography>
                {processing_ranking && processing_ranking <= 3 ? (
                  <Typography style={{ color: medalColor }}>
                    &nbsp;
                    <b>🏅</b>
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box display='flex' mt={2} width='100%' justifyContent='center'>
        <Typography variant='h2' align='center'>
          Learn more about the{' '}
          <Link
            href='https://motivus.cl/blog/welcome-rna-epic'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            RNA Epic{' '}
          </Link>
        </Typography>
      </Box>
      <Box
        my={1}
        justifyContent='center'
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='flex-start'
          width='95%'
        >
          <Box display='flex' justifyContent='flex-end' mt={1}>
            <ProcessButton isMobile={isMobile} />
          </Box>

          <Box display='flex' width='100px' height='120px'>
            <Animation />
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default ProjectsCarousel
