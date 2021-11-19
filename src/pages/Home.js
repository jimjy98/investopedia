import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InfoIcon from '@mui/icons-material/Info';
import { theme } from '../theme';


const useStyles = makeStyles(({ palette }) => ({
  page: {
    height: '100vh',
    backgroundColor: palette.background.main,
    overflow: 'hidden',
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.page}>
        <br />
        <br />
        <Typography variant="h2" align="center" color="primary">Select Experience Level:</Typography>

        <br />
        <br />
        
        <div className={classes.buttonsWrapper}>
          <Button component={Link} to="/dashboard" color='primary' variant="contained" size="large">Beginner</Button>
          <div className={classes.infoWrapper}>
            <InfoIcon sx={{ color: 'lightgrey' }} />
            <Typography color='lightgrey'>You are new to the stock market and are looking for basic stock info</Typography>
          </div>

          <Button component={Link} to="/dashboard" variant="contained" color="primary" size="large">Moderate</Button>
          <div className={classes.infoWrapper}>
            <InfoIcon sx={{ color: 'lightgrey' }} />
            <Typography color='lightgrey'>It is not your first, and you are familiar with the information presented on most platforms</Typography>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Home;