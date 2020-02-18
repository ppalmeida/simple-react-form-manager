import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useFormStateReducer from '../../hooks/useFormStateReducer';
import useSubmitWithRules from '../../hooks/useSubmitWithRules';

function Form({
  children, id, onSubmit, ...props
}) {
  const [shouldSubmit, updateShouldSubmit] = useState(false);
  const [formState, updateFormState] = useFormStateReducer();
  const internalSubmit = useSubmitWithRules(updateFormState, updateShouldSubmit, formState);

  useEffect(() => {
    if (shouldSubmit === false) {
      return undefined;
    }

    updateShouldSubmit(false);
    const totalErrors = Object.values(formState).filter(field => field.success === false).length;

    if (totalErrors === 0) {
      onSubmit(formState);
    }

    return undefined;
  }, [shouldSubmit, updateShouldSubmit, formState, onSubmit]);

  return (
    <form id={id} onSubmit={internalSubmit} {...props}>
      {children({ onChange: updateFormState, formState })}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default Form;
