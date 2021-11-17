import {
  Button,
  FormControl,
  Grid,
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
  registerButton: {
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

const RegisterForm = ({ handleRegister, formErrorMessage }) => {
  const classes = useStyles();
  return (
    <form onSubmit={handleRegister}>
      <Grid className={classes.form}>
        <Typography variant="h4" className={classes.headerText}>
          Create an account.
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
        <Grid>
          <FormControl required fullWidth margin="normal">
            <AppTextField
              aria-label="email"
              label="E-mail address"
              name="email"
              type="email"
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
            inputProps={{ minLength: 6 }}
            formErrorMessage={formErrorMessage.justifyContent}
            fullWidth
          />
        </FormControl>
        <FormControl required fullWidth margin="normal">
          <AppTextField
            aria-label="confirm password"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            margin="normal"
            inputProps={{ minLength: 6 }}
            formErrorMessage={formErrorMessage.confirmPassword}
            fullWidth
          />
        </FormControl>
        <Grid container alignItems="center" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.registerButton}>
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
