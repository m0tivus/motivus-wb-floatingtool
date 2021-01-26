import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ProcessButton from '../ProcessButton'
import Animation from '../Aniamtion'
import { Box, Grid, Link } from '@material-ui/core'
import { useSelector } from 'react-redux'

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
  const { ranking, quantity, base_time, elapsed_time, flops } = useSelector(
    (state) => state.stats,
  )

  const user = useSelector(({ user }) => user)

  return (
    <div className={classes.root}>
      <Box display='flex' mt={1}>
        <Typography variant='h2' align='center'>
          Welcome to the beta version of the{' '}
          <span className={classes.revolution}>Motivus Floating Tool.</span>{' '}
          Here you’ll be able to share your computing power with the world.{' '}
          <span className={classes.revolutionText}></span>
        </Typography>
      </Box>
      <Box display='flex' my={2}>
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
              <Typography variant='body2'>user:</Typography>
              <Typography variant='h3'>{user.name}</Typography>
              <Typography variant='body2'>ranking:</Typography>
              <Typography variant='h3'>{ranking ? ranking : 'n/a'}</Typography>
              <Typography variant='body2'>Total task</Typography>
              <Typography variant='h3'>{quantity}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body2'>Total GFLOPS:</Typography>
              <Typography variant='h3'>
                {Number.parseFloat(flops).toFixed(2)}
              </Typography>
              <Typography variant='body2'>Relative time:</Typography>
              <Typography variant='h3'>{base_time} s</Typography>
              <Typography variant='body2'>Elapsed Time:</Typography>
              <Typography variant='h3'>{elapsed_time} s</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box display='flex' mt={4}>
        <Typography variant='h1' align='center'>
          <span className={classes.revolution}>Log in </span> to enter our
          Benchmark Contest!{' '}
          <Link
            href='https://motivus.cl/blog/motivus-benchmark'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            Read more{' '}
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
          <Box display='flex' justifyContent='flex-end' mt={2}>
            <ProcessButton />
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
