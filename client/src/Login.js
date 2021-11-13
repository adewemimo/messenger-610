import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { login } from './store/utils/thunkCreators';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from './themes/theme';
import LoginForm from './components/Form/LoginForm';
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

const Login = props => {
  const classes = useStyles();
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
      <AuthSidebar />
      <Grid
        container
        xs={12}
        md={7}
        direction="column"
        className={classes.formContainer}>
        <FormHeader formType="login" />
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
