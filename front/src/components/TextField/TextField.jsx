import React, { useMemo } from 'react';
import { useField } from 'formik';
import { TextField as TextFieldMui, Tooltip } from '@material-ui/core';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

const TextField = (props) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;

  const isDisplayError = useMemo(() => touched && Boolean(error), [
    touched,
    error,
  ]);

  return (
    <>
      <TextFieldMui
        {...field}
        {...props}
        error={isDisplayError}
        InputProps={{
          endAdornment: isDisplayError && (
            <Tooltip title={error}>
              <ErrorOutlineOutlinedIcon color="error" />
            </Tooltip>
          ),
        }}
        fullWidth
      />
    </>
  );
};

export default TextField;
