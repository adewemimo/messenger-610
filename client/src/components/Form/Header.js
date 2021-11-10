import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';
import { useHistory } from 'react-router';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '2rem 0 4rem',
    marginBottom: '6rem',
    alignSelf: 'flex-end',
  },
  copy: {
    color: grey[400],
    fontSize: '1.2rem',
    marginRight: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      marginRight: '0.5rem',
    },
  },
  actionButton: {
    padding: '1rem 2rem',
    marginLeft: '1rem',
    backgroundColor: 'white',
    color: '#3A8DFF',
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      marginLeft: '0.5rem',
    },
  },
}));

const FormHeader = ({ formType }) => {
  const classes = useStyles();
  const history = useHistory();

  const [header, setHeader] = useState({});

  useEffect(() => {
    if (formType === 'login') {
      setHeader({
        title: "Don't have an account?",
        actionLabel: 'Create account',
        actionLink: '/register',
      });
    } else if (formType === 'register') {
      setHeader({
        title: 'Already have an account?',
        actionLabel: 'Login',
        actionLink: '/login',
      });
    }
  }, [formType]);

  return (
    <Grid
      alignItems="center"
      justifyContent="center"
      className={classes.container}>
      <Typography variant="caption" className={classes.copy}>
        {header.title}
      </Typography>
      <Button
        variant="contained"
        onClick={() => history.push(header.actionLink)}
        className={classes.actionButton}>
        {header.actionLabel}
      </Button>
    </Grid>
  );
};

export default FormHeader;
