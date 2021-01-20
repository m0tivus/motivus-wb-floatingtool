import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Box, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme) => ({}))

export default function Footer({ logOut, ...props }) {
  const classes = useStyles()

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      width='240px'
    >
      <Button
        variant='contained'
        color='secondary'
        startIcon={<AccountCircleIcon />}
        onClick={logOut}
        size='small'
      >
        logOut
      </Button>

      <Typography>Powered by </Typography>
      <Link href='http://motivus.cl/' target='_blank' rel='noopener noreferrer'>
        <Typography> Motivus</Typography>
      </Link>
    </Box>
  )
}
