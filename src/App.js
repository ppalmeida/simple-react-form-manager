import React, { useCallback, useMemo } from 'react';

import './styles.css';
import Form from './containers/Form/Form';
import FormField from './containers/FormField/FormField';

import ReactSelectFormElement from './containers/ReactSelectFormField/ReactSelectFormField';

import {
  required,
  minLength,
  maxLength,
  email,
  number,
  minValue,
  maxValue,
  date,
} from './utils/formRules';

export default function App() {
  const onSubmit = useCallback((data) => {
    // eslint-disable-next-line
    console.log('Successfully submited. Data:', data);
  }, []);

  const memoizedRules = useMemo(
    () => ({
      username: [required],
      company: [required, minLength(3), maxLength(16)],
      email: [required, email],
      age: [required, number, minValue(18), maxValue(85)],
      birthday: [required, date],
      terms: [required],
      plan: [required],
    }),
    [],
  );

  return (
    <div className="App">
      <h1 className="text-center my-8 text-xl">Create Your Account</h1>
      <Form id="form" onSubmit={onSubmit}>
        {({ onChange, formState }) => (
          <>
            <FormField
              label="Name"
              name="username"
              onChange={onChange}
              rules={memoizedRules.username}
              type="text"
              value={formState.username}
            />
            <FormField
              label="Company Name"
              name="company"
              onChange={onChange}
              rules={memoizedRules.company}
              type="text"
              value={formState.company}
            />
            <FormField
              label="Email"
              name="email"
              onChange={onChange}
              rules={memoizedRules.email}
              type="text"
              value={formState.email}
            />
            <FormField
              label="Your age"
              name="age"
              onChange={onChange}
              rules={memoizedRules.age}
              type="number"
              value={formState.age}
            />
            <FormField
              label="Starting date"
              name="birthday"
              onChange={onChange}
              rules={memoizedRules.birthday}
              type="date"
              value={formState.birthday}
            />
            <FormField
              label="Do you agree?"
              name="terms"
              onChange={onChange}
              rules={memoizedRules.terms}
              type="checkbox"
              value={formState.terms}
            />
            <FormField
              label="Select your plan"
              name="plan"
              onChange={onChange}
              rules={memoizedRules.plan}
              type="custom"
              value={formState.plan}
            >
              {fieldProps => (
                <ReactSelectFormElement
                  options={[
                    { label: 'Two years: $169.00', value: 'two-years' },
                    { label: 'One year: $99.00', value: 'one-year' },
                    { label: 'Monthly: $10.50', value: 'monthly' },
                  ]}
                  {...fieldProps}
                />
              )}
            </FormField>

            <input type="submit" value="Submit" />
          </>
        )}
      </Form>
    </div>
  );
}
