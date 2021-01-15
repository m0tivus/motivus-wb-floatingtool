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

const tutorialSteps = [
  {
    projectType: 'Scientific, biology',
    title: 'RNA folding',
    label:
      'The following implementation of the SPQR code runs a Monte Carlo simulation of a single strand of RNA at constant temperature.',
    imgPath: 'https://widget.motivus.cl/spqrgif.gif',
  },
  {
    projectType: 'Decentralized applications',
    title: 'Cryptocurrencies mining',
    label:
      'Kazakhstan is in talks to attract investments worth 300 billion tenge ($714 million) into the cryptocurrency sector.',
    imgPath: 'https://widget.motivus.cl/ethereum-calculator.jpg',
  },
  {
    projectType: 'Scientific, astrophysics',
    title: 'Cosmological simulation',
    label:
      'Galaxy simulations are at last matching reality—and producing surprising insights into cosmic evolution.',
    imgPath: 'https://widget.motivus.cl/cosmological-simulation.jpg',
  },
]

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
}))

function ProjectsCarousel() {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = tutorialSteps.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.typeLabel} align='center'>
        Project name:{' '}
        <span className={classes.title}>{tutorialSteps[activeStep].title}</span>
      </Typography>
      <Paper elevation={3}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={classes.img}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>

        <MobileStepper
          steps={maxSteps}
          position='static'
          variant='text'
          activeStep={activeStep}
          nextButton={
            <Button
              size='small'
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                  <KeyboardArrowRight />
                )}
            </Button>
          }
          backButton={
            <Button
              size='small'
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                  <KeyboardArrowLeft />
                )}
              Back
            </Button>
          }
        />
      </Paper>
      <Grid container flexGrow={1} direction='column' justify='space-between'>
        <Grid item>
          <Paper square elevation={0} className={classes.header}>
            <Box py={1}>
              <Typography variant='h2' align='center'>
                Join the <span className={classes.revolution}>revolution</span>{' '}
                in distributed computing!{' '}
                <span className={classes.revolutionText}>
                  Help scientific to reach they goals and get extra earning in
                  the process.
                </span>
              </Typography>
            </Box>
            <Typography></Typography>
          </Paper>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </div>
  )
}

export default ProjectsCarousel
