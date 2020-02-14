import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.module.css';

const FormFieldComponent = ({
  showErrors, errorMessages, children, label, id,
}) => (
  <div
    className={classnames(
      'flex flex-col mb-4 p-6 background-white w-full border-solid border border-gray-600',
      {
        [styles.error]: showErrors,
      },
    )}
  >
    <label className="flex flex-col" htmlFor={id}>
      <span className="block mb-4 mr-2 text-sm">{label}</span>
      <div className="block w-full">{children}</div>
    </label>
    {showErrors && errorMessages && errorMessages.length > 0 && (
      <div className={styles.errorMessages}>
        <ul className="block list-none" data-test-id="error-messages-list">
          {errorMessages.map(message => (
            <li key={message}>
              <span
                aria-label="error"
                className="rounded-full inline-block text-red-600 mr-2 text-xs"
                role="img"
              >
                ❌
              </span>
              <span className="text-red-600 text-sm">{message}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

FormFieldComponent.propTypes = {
  children: PropTypes.node,
  showErrors: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
};

export default FormFieldComponent;
