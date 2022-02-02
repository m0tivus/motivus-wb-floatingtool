import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { Box, Grid } from '@material-ui/core'
import { autoPlay } from 'react-swipeable-views-utils'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const tutorialSteps = [
  {
    projectType: 'Scientific, biology',
    title: 'RNA folding',
    label:
      'The following implementation of the SPQR code runs a Monte Carlo simulation of a single strand of RNA.',
    imgPath: 'https://widget.motivus.cl/spqrgif.gif',
    state: 'Ready to process',
  },
  {
    projectType: 'Scientific, astrophysics',
    title: 'Cosmological simulation',
    label:
      'Galaxy simulations produce surprising insights into cosmic evolution.',
    imgPath: 'https://widget.motivus.cl/cosmological-simulation.jpg',
    state: 'Coming soon',
  },
  {
    projectType: 'Mathematical',
    title: 'Alpha benchmark',
    label:
      'Resolve matrix multiplication equations through the Motivus Framework',
    imgPath: 'https://widget.motivus.cl/benchmark-motivus.jpg',
    state: 'Ready to process',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '390px',
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
  bold: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
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

  const [autoPlay, setAutoPlay] = React.useState(true)

  return (
    <div className={classes.root}>
      {/*<Typography variant='h2' align='center' gutterBottom>
        <span className={classes.title}>With your help</span>, we will implement
  this technology in many science-related projects.
      </Typography>*/}
      <Paper elevation={3}>
        <AutoPlaySwipeableViews
          autoplay={autoPlay}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
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
        </AutoPlaySwipeableViews>

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
              <Typography align='center' variant='h1'>
                {tutorialSteps[activeStep].title}
              </Typography>
              <Typography variant='h3' align='center'>
                Proyect Tipe:{' '}
                <span className={classes.title}>
                  {tutorialSteps[activeStep].projectType}
                </span>
              </Typography>
              <Typography variant='body1' align='center' gutterBottom>
                {tutorialSteps[activeStep].label}
              </Typography>
              <Typography variant='body2' align='right'>
                Proyect state:
                <span className={classes.bold}>
                  {' '}
                  {tutorialSteps[activeStep].state}
                </span>
              </Typography>
            </Box>
            <Typography></Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProjectsCarousel
