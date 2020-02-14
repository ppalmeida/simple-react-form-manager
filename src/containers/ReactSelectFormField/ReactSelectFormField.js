import React, { useMemo } from 'react';
import Select from 'react-select';
import fieldPropTypes from '../FormField/fieldPropTypes';

export default function ReactSelectFormElement({
  value, onChange, name, options,
}) {
  // From the form data value, take the "value" property to find it between the ReactSelect options:
  const internalValue = useMemo(() => options.find(opt => opt.value === value), [value, options]);

  return (
    <div>
      <Select
        classNamePrefix="reactSelect"
        isClearable
        name={name}
        onChange={onChange}
        options={options}
        value={internalValue}
      />
    </div>
  );
}

ReactSelectFormElement.propTypes = fieldPropTypes;
