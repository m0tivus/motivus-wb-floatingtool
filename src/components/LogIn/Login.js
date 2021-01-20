import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Box, SvgIcon } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import FacebookIcon from '@material-ui/icons/Facebook'
import GitHubIcon from '@material-ui/icons/GitHub'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  bold: {
    color: theme.palette.secondary.light,
    fontWeight: 'bold',
    fontStyle: 'Italic',
    fontFamily: 'Asap',
    cursor: 'pointer',
  },
  iconHover: {
    '&:hover': {
      color: theme.palette.secondary.light,
    },
  },
}))

function GoogleIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M 12.24718,10.28125 H 23.80864 Q 24,11.328125 24,12.28125 24,15.671875 22.54884,18.335937 21.09767,21 18.41063,22.5 15.72359,24 12.24718,24 9.74352,24 7.47907,23.054687 5.21462,22.109375 3.57209,20.5 1.92957,18.890625 0.96478,16.671875 0,14.453125 0,12 0,9.5468752 0.96478,7.3281248 1.92957,5.1093748 3.57209,3.4999999 5.21462,1.8906248 7.47907,0.94531185 9.74352,-1.5e-7 12.24718,-1.5e-7 q 4.78405,0 8.21262,3.14062505 l -3.33289,3.1406249 q -1.96146,-1.859375 -4.87973,-1.859375 -2.05715,0 -3.80333,1.015625 Q 6.69767,6.4531248 5.67708,8.1953122 4.65648,9.9375002 4.65648,12 q 0,2.0625 1.0206,3.804687 1.02059,1.742188 2.76677,2.757813 1.74618,1.015625 3.80333,1.015625 1.38737,0 2.55149,-0.375 1.16412,-0.375 1.91362,-0.9375 0.7495,-0.5625 1.30764,-1.28125 0.55814,-0.71875 0.82127,-1.359375 0.26312,-0.640625 0.3588,-1.21875 h -6.95282 z'></path>
    </SvgIcon>
  )
}

export default function Login() {
  const classes = useStyles()

  return (
    <Box display='flex' flexDirection='column' my={2}>
      <Box display='flex' mb={1}>
        <Typography align='center' gutterBottom>
          <span className={classes.bold}>Log in </span> into your{' '}
          <span className={classes.bold}>Motivus account,</span> sign with:
        </Typography>
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-evenly'
      >
        <Box display='flex'>
          <GoogleIcon className={classes.iconHover} />
        </Box>
        <Box display='flex'>
          <FacebookIcon className={classes.iconHover} fontSize='large' />
        </Box>
        <Box display='flex'>
          <GitHubIcon className={classes.iconHover} fontSize='large' />
        </Box>
      </Box>
    </Box>
  )
}
