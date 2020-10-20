import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#cc00ff',
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'none',
  },
}));

export default function ProcessButton() {
  const classes = useStyles();

  return (
    <div>
      <ColorButton size="large"  variant="contained" color="primary" className={classes.margin}>
        Approve
      </ColorButton>
    </div>
  );
}