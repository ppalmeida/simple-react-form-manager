import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import fieldPropTypes from './fieldPropTypes';

import FormFieldFactory from './FormFieldFactory';
import FormFieldComponent from '../../components/FormFieldComponent/FormFieldComponent';
import formInputValue from '../../utils/formInputValue';
import useErrorMessages from '../../hooks/useErrorMessages';
import usePristineField from '../../hooks/useIsPristineField';

function FormField({
  children,
  rules,
  name,
  label,
  id,
  type = 'text',
  value = null,
  onChange,
  ...props
}) {
  const pristine = usePristineField(value);

  useEffect(() => {
    onChange({
      pristine,
      name,
      rules,
      value: value ? value.value : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const internalOnChange = useCallback(
    event => onChange({
      pristine,
      name,
      rules,
      value: formInputValue(event, type),
    }),

    [name, onChange, pristine, rules, type],
  );

  const onBlur = useCallback(
    (event) => {
      onChange({
        pristine: false,
        name,
        rules,
        value: formInputValue(event),
      });
    },
    [onChange, name, rules],
  );

  const [errorMessages, showErrors] = useErrorMessages(value, pristine);

  return (
    <FormFieldComponent
      errorMessages={errorMessages}
      id={id || label}
      label={label}
      showErrors={showErrors}
    >
      <FormFieldFactory
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={internalOnChange}
        pristine={pristine}
        type={type}
        value={value}
        {...props}
      >
        {children}
      </FormFieldFactory>
    </FormFieldComponent>
  );
}

FormField.propTypes = {
  ...fieldPropTypes,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default FormField;
