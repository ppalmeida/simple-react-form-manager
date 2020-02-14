import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';

import FormField from './FormField';

const WrapperFormField = ({ children, ...props }) => (
  <FormField
    id="username"
    label="Username"
    name="username"
    onChange={jest.fn()}
    type="text"
    value={null}
    {...props}
  >
    {children}
  </FormField>
);
WrapperFormField.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

describe('FormField suit tests', () => {
  it('should render successfully -> type text (default)', () => {
    const wrapper = mount(<WrapperFormField />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('input[type="text"]').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('label').text()).toBe('Username');
  });

  it('should render successfully -> type checkbox', () => {
    const wrapper = mount(<WrapperFormField type="checkbox" />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('input[type="checkbox"]').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('label').text()).toBe('Username');
  });

  it('should render successfully -> type custom', () => {
    const wrapper = mount(
      <WrapperFormField type="custom">
        <input type="email" />
      </WrapperFormField>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.find('input[type="email"]').length).toBe(1);
  });

  it('should render successfully -> type custom and function-as-children', () => {
    const mockChildrenFunc = jest
      .fn()
      .mockImplementation(({
        id, name, onBlur, onChange, pristine, type, value,
      }) => {
        expect(id).toBe('username');
        expect(name).toBe('username');
        expect(typeof onBlur).toBe('function');
        expect(typeof onChange).toBe('function');
        expect(pristine).toBe(true);
        expect(type).toBe('custom');
        expect(value).toBe(null);

        return <input name="username" onChange={onChange} type="text" value={value || ''} />;
      });

    const wrapper = mount(<WrapperFormField type="custom">{mockChildrenFunc}</WrapperFormField>);

    expect(wrapper).toBeDefined();
    expect(mockChildrenFunc).toHaveBeenCalledTimes(1);
  });

  it('onChange handler must be called when input changes', () => {
    const mockOnChange = jest
      .fn()
      // First call when the component mount:
      .mockImplementationOnce((args) => {
        expect(args).toStrictEqual({
          name: 'username',
          pristine: true,
          rules: undefined,
          value: '',
        });
      })

      // Second call when the component changes:
      .mockImplementationOnce((args) => {
        expect(args).toStrictEqual({
          name: 'username',
          pristine: true,
          rules: undefined,
          value: 'John Doe',
        });
      })

      // Third call when the component blur (loose focus):
      .mockImplementationOnce((args) => {
        expect(args).toStrictEqual({
          name: 'username',
          pristine: false,
          rules: undefined,
          value: 'John Doe',
        });
      });

    const wrapper = mount(<WrapperFormField onChange={mockOnChange} />);
    const input = wrapper.find('input[type="text"]');
    input.simulate('change', { target: { value: 'John Doe' } });
    input.simulate('blur', { target: { value: 'John Doe' } });

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});
