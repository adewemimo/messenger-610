import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

const useStyles = makeStyles(theme => ({
  intro: {
    height: '100%',
    background: "linear-gradient(#3A8DFF, #86B9FF), url('/bg-img.png')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'multiply',
    opacity: '0.85',
    padding: '5rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  icon: {
    color: 'white',
    fontSize: '5rem',
    margin: '2rem',
  },
}));

const AuthSidebar = props => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      xs={12}
      md={5}
      direction="column"
      className={classes.intro}>
      <img src="/bubble.svg" alt="chat bubble" className={classes.icon} />
      <Typography variant="subtitle1" style={{ color: 'white' }}>
        Converse with anyone with any language
      </Typography>
    </Grid>
  );
};

export default AuthSidebar;
