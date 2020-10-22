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
import { Box, Grid } from '@material-ui/core'

const tutorialSteps = [
  {
    projectType: 'Scientific, biology',
    title: 'RNA folding',
    label:
      'The following implementation of the SPQR code runs a Monte Carlo simulation of a single strand of RNA at constant temperature.',
    imgPath: 'http://www.motivus.cl/spqrgif.gif',
  },
  {
    projectType: 'Decentralized applications',
    title: 'Cryptocurrencies mining',
    label:
      'Kazakhstan is in talks to attract investments worth 300 billion tenge ($714 million) into the cryptocurrency sector, Digital Development Minister Bagdat Mussin said on Wednesday.',
    imgPath: 'https://i.blogs.es/503793/bitcoin-2007769_1280/450_1000.jpg',
  },
  {
    projectType: 'Scientific, Astronomic',
    title: 'Astronomical time series',
    label:
      'Galaxy simulations are at last matching reality—and producing surprising insights into cosmic evolution.',
    imgPath:
      'https://www.sciencemag.org/sites/default/files/styles/article_main_image_-_1280w__no_aspect_/public/cs_80601N_CosmicWeb_1280x720.jpg?itok=oa3zpYIh',
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
        Project Type: {tutorialSteps[activeStep].projectType}
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
                {tutorialSteps[activeStep].title}
              </Typography>
            </Box>
            <Typography>{tutorialSteps[activeStep].label}</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Box py={1} justifyContent='center' display='flex'>
            <ProcessButton />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProjectsCarousel
