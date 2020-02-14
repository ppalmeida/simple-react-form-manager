import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';

import FormFieldComponent from './FormFieldComponent';

const WrapperFieldComponent = ({ children, ...props }) => (
  <FormFieldComponent
    errorMessages={null}
    id="username"
    label="Username"
    name="username"
    onChange={jest.fn()}
    showErrors={false}
    {...props}
  >
    {children || <input type="text" />}
  </FormFieldComponent>
);
WrapperFieldComponent.propTypes = {
  children: PropTypes.node,
};

const validateBasicRender = (wrapper) => {
  expect(wrapper).toBeDefined();
  expect(wrapper.find('label').length).toBe(1);
  expect(wrapper.find('label').props().htmlFor).toBe('username');
  expect(wrapper.find('label').find('input[type="text"]').length).toBe(1);
};

describe('FormFieldComponent suit tests', () => {
  it('should render successfully', () => {
    const wrapper = mount(<WrapperFieldComponent />);
    validateBasicRender(wrapper);
  });

  it('should render error messages', () => {
    const errorMessages = [
      'This is an error message sample 1',
      'This is an error message sample 2',
      'This is an error message sample 3',
    ];
    const wrapper = mount(<WrapperFieldComponent errorMessages={errorMessages} showErrors />);
    validateBasicRender(wrapper);

    expect(wrapper.find('[data-test-id="error-messages-list"]').length).toBe(1);
    expect(wrapper.find('[data-test-id="error-messages-list"]').children().length).toBe(3);
    errorMessages.forEach((m) => {
      const wrapperMessage = wrapper.find(`[children="${m}"]`);
      expect(wrapperMessage.text()).toBe(m);
    });
  });

  it('should not break if error messages list is empty or null/undefined', () => {
    // Error messages is an empty array:
    let errorMessages = [];
    let wrapper = mount(<WrapperFieldComponent errorMessages={errorMessages} showErrors />);
    validateBasicRender(wrapper);

    expect(wrapper.find('input[type="text"]').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('[data-test-id="error-messages-list"]').length).toBe(0);

    // Error messages is undefined:
    errorMessages = undefined;
    wrapper = mount(<WrapperFieldComponent errorMessages={errorMessages} showErrors />);
    validateBasicRender(wrapper);

    expect(wrapper.find('input[type="text"]').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('[data-test-id="error-messages-list"]').length).toBe(0);

    // Error messages is null:
    errorMessages = null;
    wrapper = mount(<WrapperFieldComponent errorMessages={errorMessages} showErrors />);
    validateBasicRender(wrapper);

    expect(wrapper.find('input[type="text"]').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('[data-test-id="error-messages-list"]').length).toBe(0);
  });

  it('should NOT show error messages when showErrors is false (default is false)', () => {
    const errorMessages = [
      'This is an error message sample 1',
      'This is an error message sample 2',
      'This is an error message sample 3',
    ];

    // showErrors is falsy by default:
    let wrapper = mount(<WrapperFieldComponent errorMessages={errorMessages} />);
    expect(wrapper.find('[data-test-id="error-messages-list"]').length).toBe(0);

    // explicity set showErrors to false:
    wrapper = mount(<WrapperFieldComponent errorMessages={errorMessages} showErrors={false} />);
    expect(wrapper.find('[data-test-id="error-messages-list"]').length).toBe(0);
  });
});
