import React, { useCallback } from 'react'
import { MenuItem, Select, Stack, SxProps, TextField, Typography } from '@mui/material';
import { Theme } from '@emotion/react';
import { capitalize } from '@/util/commonUtils';
import { FormikHandlers } from 'formik';

type OrientationType = 'horizontal' | 'vertical';

type FormType = 'text' | 'option';

interface DynamicFieldProps {
  label: string;
  value: string;
  orientationType?: OrientationType;
  formType?: FormType;
  formOptions?: string[];
  hideLabel?: boolean;
  editMode?: boolean;
  formik?: {
    values: { [key: string]: any };
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    touched: { [key: string]: boolean };
    errors: { [key: string]: string };
  };
  style?: SxProps<Theme>;
}

const DynamicField: React.FC<DynamicFieldProps> = ({ 
  label, 
  value, 
  orientationType = 'horizontal', 
  formType = 'text',
  formOptions = [],
  hideLabel = false,
  editMode = false, 
  formik, 
  style,
}) => {

  const renderForm = useCallback(() => {
    switch (formType) {
      case 'text':
        return (
          <TextField
              variant="standard"
              size="small"
              fullWidth
              name={label}
              value={formik?.values[label]}
              onChange={formik?.handleChange}
              error={formik?.touched[label] && Boolean(formik?.errors[label])}
              helperText={formik?.touched[label] && formik?.errors[label]}
          />
        );
      case 'option':
        return (
          <Select
              id="species-select"
              variant='standard'
              size="small"
              fullWidth              
              name={label}
              value={formik?.values[label]}
              onChange={formik?.handleChange as FormikHandlers['handleChange']}
              error={formik?.touched[label] && Boolean(formik?.errors[label])}
              renderValue={(selected: string) => {
                  if (selected === "") return capitalize(label);
                  return capitalize(selected);
              }}
          >
              {formOptions && formOptions.length > 0 ? (
                  formOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                          {capitalize(option)}
                      </MenuItem>
                  ))
              ) : null}
          </Select>
        );
      default:
        return null;
    }
  }, [formType, formik, label]);

  return (
    <Stack
      sx={style}
      direction={orientationType === 'vertical' ? 'column' : 'row'} 
      spacing={orientationType === 'vertical' ? 0 : 1}
      alignItems={orientationType === 'vertical' ? 'flex-start' : 'center'}>
        {!hideLabel && <Typography className='label' variant='subtitle1'>{capitalize(label)}:</Typography>}
        {!editMode ? (
          <Typography className='value' variant='body1'>{value}</Typography>
        ) : renderForm()}
    </Stack>
  )
}

export default DynamicField;