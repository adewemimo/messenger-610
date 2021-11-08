import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography, Button } from '@material-ui/core';
import { login } from '../../store/utils/thunkCreators';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';
import { blue, grey } from '@material-ui/core/colors';
import LoginForm from './LoginForm';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  intro: {
    height: '100%',
    backgroundColor: blue[400],
    padding: '0 5rem',
  },
  form: {
    height: '100%',
    padding: '0 6rem',
  },
  formHeader: {
      padding: '4rem 0',
      alignSelf: 'flex-end'
  },
  register: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 50,
    color: grey[600],
  },
  registerButton: {
    borderRadius: 0.5,
    color: theme.palette.primary.main,
    borderRadius: 0.5,
    height: 56,
    width: 160,
    boxShadow: '0px 0px 12px 3px #C4C4C4',
  },
  sideLogin: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '267px',
    height: '186px',
    marginTop: 300,
    marginLeft: 77.71,
  },
  sideLoginContainer: {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.85,
    color: 'white',
    height: '100vh',
    width: '40%',
  },
  mainLoginContainer: {
    height: '100vh',
    width: '60%',
  },
}));

const Login = props => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async event => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.root}
      sx={{ width: 1 }}>
      <Grid
        container
        alignContent="center"
        xs={12}
        md={6}
        lg={5}
        className={classes.intro}>
        <Typography variant="subtitle1">
          Converse with anyone with any language
        </Typography>
      </Grid>
      <Grid
        container
        xs={12}
        md={7}
        lg={7}
        direction="column"
        className={classes.form}>
        <Grid
          alignItems="center"
          justifyContent="center"
          className={classes.formHeader}>
          <span>Don't have an account?</span>
          <Button
            onClick={() => history.push('/register')}
            className={classes.registerButton}>
            Create Account
          </Button>
        </Grid>

        <LoginForm handleLogin={handleLogin} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
