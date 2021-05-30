import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik } from 'formik';

import TextField from '../TextField';

import { useStyles } from './useStyles';

const FormDialog = ({
  isDisplay,
  title,
  description,
  closeText,
  submitText,
  onSubmit,
  handleClose,
  formConfig: { initialValues, validationSchema, textFieldsConfig },
}) => {
  const classes = useStyles();
  const isInitialValid = Object.values(initialValues).every((value) =>
    Boolean(value),
  );

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      isInitialValid={isInitialValid}
    >
      {(formik) => {
        const keys = Object.keys(formik.values);

        return (
          <Dialog
            open={isDisplay}
            classes={{ paper: classes.wrapper }}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <form onSubmit={formik.handleSubmit}>
              {title && (
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
              )}
              <DialogContent>
                {description && (
                  <DialogContentText>{description}</DialogContentText>
                )}
                {keys.map((key) => (
                  <TextField
                    key={key}
                    name={key}
                    fullWidth
                    {...textFieldsConfig[key]}
                  />
                ))}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {closeText || 'Отмена'}
                </Button>
                <Button
                  disabled={!formik.isValid}
                  type="submit"
                  color="primary"
                >
                  {submitText || 'Отправить'}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default FormDialog;
