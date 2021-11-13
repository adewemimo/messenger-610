import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { register } from './store/utils/thunkCreators';
import { theme } from './themes/theme';
import SignupForm from './components/Form/SignupForm';
import AuthSidebar from './components/Form/Sidebar';
import FormHeader from './components/Form/Header';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  formContainer: {
    height: '100%',
    padding: '0 4rem',
  },
}));

const Register = props => {
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async event => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }

    await register({ username, email, password });
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
      <AuthSidebar />
      <Grid
        container
        xs={12}
        md={7}
        direction="column"
        className={classes.formContainer}>
        <FormHeader formType="register" />
        <SignupForm
          handleRegister={handleRegister}
          formErrorMessage={formErrorMessage}
        />
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
    register: credentials => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
