import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { theme } from '../../themes/theme';

const useStyles = makeStyles(theme => ({
  LoginForm: {
    marginTop: 150,
    marginLeft: 100,
    width: '70%',
    height: 358,
  },
  loginButton: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 160,
    marginTop: 50,
    marginLeft: 250,
  },
  textField: {
    width: '100%',
  },
  textFieldLabel: {
    color: 'grey',
    '&.Mui-focused': {
      color: 'grey',
      fontSize: '1.5rem',
      maginBottom: '1rem',
    },
  },
}));

const LoginForm = props => {
  const classes = useStyles();
  return (
    <form onSubmit={props.handleLogin}>
      <Grid>
        <Typography variant="h4">Welcome Back!</Typography>
        <Grid>
          <FormControl margin="normal" required>
            <TextField
              aria-label="username"
              label="E-mail address"
              name="username"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                className: classes.textFieldLabel,
              }}
            />
          </FormControl>
        </Grid>
        <FormControl margin="normal" required>
          <TextField
            label="password"
            aria-label="password"
            type="password"
            name="password"
            className={classes.textField}
            InputLabelProps={{
              className: classes.textFieldLabel,
            }}
          />
        </FormControl>
        <Grid>
          <Button
            type="submit"
            variant="contained"
            size="large"
            className={classes.loginButton}>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
