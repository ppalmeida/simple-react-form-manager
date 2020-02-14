import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import fieldPropTypes from './fieldPropTypes';
import { InputTypes } from './constants';

function FormFieldFactory({
  children = null,
  id,
  name,
  onBlur,
  onChange,
  pristine,
  type,
  value,
  ...props
}) {
  const defaultInput = useMemo(() => {
    const textStyles = 'display w-full h-4 p-4 mb-2 text-md font-normal leading-normal text-gray-800 background-white border border-gray-500 rounded';
    const submitClasses = 'block bg-blue-900 mb-2 font-normal text-center cursor-pointer select-none py-2 px-3 text-sm leading-normal rounded text-white';

    return (
      <input
        {...props}
        className={
          type === InputTypes.SUBMIT || type === InputTypes.CHECKBOX ? submitClasses : textStyles
        }
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        value={value ? value.value : ''}
      />
    );
  }, [id, name, onBlur, onChange, props, type, value]);

  if (type === InputTypes.CUSTOM) {
    return typeof children === 'function'
      ? children({
        onChange,
        pristine,
        id,
        name,
        onBlur,
        type,
        value,
        ...props,
      })
      : children;
  }

  const matchTypes = Object.values(InputTypes).find(t => t === type);
  if (!matchTypes) {
    throw new Error(`Unknown HTML input type: ${type}`);
  }

  return defaultInput;
}

FormFieldFactory.propTypes = {
  ...fieldPropTypes,
  pristine: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default FormFieldFactory;
