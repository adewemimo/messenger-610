import { FormHelperText, makeStyles, TextField } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  floatingLabelFocus: {
    marginTop: '-1rem',
    '&.focused': {
      color: grey[400],
      fontSize: '1.4rem',
    },
  },
}));

const AppTextField = props => {
  const classes = useStyles();
  const { formErrorMessage, ...rest } = props;
  return (
    <TextField
      {...rest}
      InputLabelProps={{
        classes: {
          root: classes.floatingLabelFocus,
          focused: 'focused',
        },
      }}>
      <FormHelperText error>{formErrorMessage}</FormHelperText>
    </TextField>
  );
};

export default AppTextField;
