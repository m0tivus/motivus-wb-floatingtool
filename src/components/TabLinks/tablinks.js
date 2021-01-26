import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import ProjectsCarousel from '../ProjectsCarousel'
import Options from '../Options'
import Process from '../Process'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  selected: {
    fontWeight: 'bold',
    color: theme.palette.secondary.light,
  },
  indicator: {
    color: theme.palette.secondary.light,
  },
  panels: {
    width: '100%',
  },
}))

export default function FullWidthTabs() {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (_event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Tabs
          classes={{
            indicator: classes.indicator,
          }}
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          aria-label='full width tabs example'
          className={classes.tabsColor}
        >
          <Tab
            label='Process'
            classes={{
              selected: classes.selected,
            }}
            {...a11yProps(0)}
          />
          <Tab
            label='Options'
            classes={{
              selected: classes.selected,
            }}
            {...a11yProps(1)}
          />
          <Tab
            label='Projects'
            classes={{
              selected: classes.selected,
            }}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.panels}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Process />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Options />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ProjectsCarousel />
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}
