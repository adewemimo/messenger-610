import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';
import { ChatOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  intro: {
    height: '100%',
    background:
      "linear-gradient(rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url('/bg-img.png')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'multiply',
    opacity: '0.85',
    padding: '5rem',
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
      lg={4}
      direction="column"
      className={classes.intro}>
      <ChatOutlined className={classes.icon} />
      <Typography variant="subtitle1" style={{ color: 'white' }}>
        Converse with anyone with any language
      </Typography>
    </Grid>
  );
};

export default AuthSidebar;
