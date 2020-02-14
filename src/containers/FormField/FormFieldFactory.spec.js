import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';

import FormFieldFactory from './FormFieldFactory';

const WrapperFormFieldFactory = ({ children, ...props }) => (
  <FormFieldFactory
    name="username"
    onBlur={jest.fn()}
    onChange={jest.fn()}
    pristine
    type="text"
    value={{
      success: true,
      value: '',
    }}
    {...props}
  >
    {children || <span />}
  </FormFieldFactory>
);
WrapperFormFieldFactory.propTypes = {
  children: PropTypes.node,
};

describe('FormFieldFactory suit tests', () => {
  it('should render successfully - text is default', () => {
    const wrapper = mount(<WrapperFormFieldFactory />);
    expect(wrapper).toBeDefined();
    const input = wrapper.find('input[type="text"]');
    expect(input.length).toBe(1);
  });

  it('should render successfully - checkbox', () => {
    const wrapper = mount(<WrapperFormFieldFactory type="checkbox" />);
    expect(wrapper).toBeDefined();
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.length).toBe(1);
  });

  it('should render successfully - radio', () => {
    const wrapper = mount(<WrapperFormFieldFactory type="radio" />);
    expect(wrapper).toBeDefined();
    const input = wrapper.find('input[type="radio"]');
    expect(input.length).toBe(1);
  });

  it('should render successfully - date', () => {
    const wrapper = mount(<WrapperFormFieldFactory type="date" />);
    expect(wrapper).toBeDefined();
    const input = wrapper.find('input[type="date"]');
    expect(input.length).toBe(1);
  });

  it('should render successfully - email', () => {
    const wrapper = mount(<WrapperFormFieldFactory type="email" />);
    expect(wrapper).toBeDefined();
    const input = wrapper.find('input[type="email"]');
    expect(input.length).toBe(1);
  });

  it('should throw error when invalid type is not "custom" or a valid HTML input type', () => {
    expect.assertions(1);
    jest.spyOn(console, 'error');
    // eslint-disable-next-line
    console.error.mockImplementation(() => {});
    try {
      mount(<WrapperFormFieldFactory type="crazy" />);
    } catch (e) {
      expect(e.message).toBe('Unknown HTML input type: crazy');
    }
    // eslint-disable-next-line
    console.error.mockRestore();
  });
});
