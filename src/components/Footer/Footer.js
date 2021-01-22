import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Box, Link } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { connect } from 'react-redux'
import { logOutUser } from 'actions'

function Footer(props) {
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
        onClick={props.logOutUser}
        size='small'
      >
        Logout
      </Button>

      <Typography>Powered by </Typography>
      <Link href='http://motivus.cl/' target='_blank' rel='noopener noreferrer'>
        <Typography> Motivus</Typography>
      </Link>
    </Box>
  )
}
export default connect(null, { logOutUser })(Footer)
