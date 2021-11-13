import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { theme } from '../../themes/theme';
import AppTextField from '../Form/AppTextField';

const useStyles = makeStyles(theme => ({
  form: {
    padding: '0 4rem',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    }
  },
  loginButton: {
    fontFamily: 'Montserrat, sans-serif',
    marginTop: '4rem',
    padding: '1rem 4rem',
    fontSize: '1.24rem',
  },
  headerText: {
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
}));

const LoginForm = props => {
  const classes = useStyles();
  return (
    <form onSubmit={props.handleLogin}>
      <Grid className={classes.form}>
        <Typography variant="h4" className={classes.headerText}>
          Welcome Back!
        </Typography>
        <Grid>
          <FormControl required fullWidth margin="normal">
            <AppTextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              margin="normal"
              fullWidth
            />
          </FormControl>
        </Grid>
        <FormControl required fullWidth margin="normal">
          <AppTextField
            aria-label="password"
            label="Password"
            name="password"
            type="password"
            margin="normal"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Link href="#">Forgot?</Link>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Grid container alignItems="center" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.loginButton}>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
