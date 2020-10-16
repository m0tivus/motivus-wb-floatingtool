import React from 'react';
import Switch from '@material-ui/core/Switch';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  wrapper: {
    position: 'fixed',
    width: 100 + theme.spacing(2),
    bottom: "10%",
    right: "5%",
    zIndex: 2,
  },
  paper: {
    zIndex: -1,
    position: 'fixed',
    margin: theme.spacing(1),
    bottom: "10%",
    right: "5%",
    width: 250,
    height: 500,
    background: "#9468e9",
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
    color: '#9468e9',
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },

}));

export default function SimpleSlide() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  
  
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <FormControlLabel
            
          control={<Button onClick={handleChange}>
              <img src="logomotivuswhite.svg" width="150" height="150" />
             </Button>
             }
          
          label="Show"
        />
        <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                    <Card className={classes.paper} variant="outlined">
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </Card>
        </Slide>
      </div>
    </div>
  );
}