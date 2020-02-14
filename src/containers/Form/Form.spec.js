import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';

import Form from './Form';

const WrapperForm = ({ children, ...props }) => (
  <Form id="some-id" onSubmit={jest.fn()} {...props}>
    {children}
  </Form>
);
WrapperForm.propTypes = {
  children: PropTypes.func.isRequired,
};

describe('Form suit tests', () => {
  it('should render successfully', () => {
    const wrapper = mount(
      <WrapperForm>{() => <input type="submit" value="Submit" />}</WrapperForm>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.find('input[type="submit"]').length).toBe(1);
  });

  it('the render children must receive an `onChange` function and a `formState` object as params in its render function ', () => {
    const mockRenderFunction = jest.fn();
    mockRenderFunction.mockImplementation(({ onChange, formState }) => {
      expect(typeof onChange).toBe('function');
      expect(typeof formState).toBe('object');
    });
    const wrapper = mount(<WrapperForm>{mockRenderFunction}</WrapperForm>);

    expect(wrapper).toBeDefined();
    expect(mockRenderFunction).toHaveBeenCalled();
  });

  it('should update the formState when the `onChange` method is executed', () => {
    const mockFunction = jest.fn().mockImplementation(({ onChange, formState }) => {
      // 1) When the function first executes, the formState is empty:
      if (!formState || !formState.username) {
        expect(onChange).toBeDefined();
        expect(typeof onChange).toBe('function');

        // Simulate register a input field "username" in Form state machine:
        onChange({
          pristine: true,
          name: 'username',
          rules: [],
          value: '',
        });
        return null;
      }

      // 2) After the first execution, the field will receive it's first computed value:
      if (formState && formState.username && formState.username.value === '') {
        const expected = {
          pristine: true,
          name: 'username',
          value: '',
          success: true,
          messages: [],
          rules: [],
        };
        expect(formState.username).toStrictEqual(expected);

        // Simulate a change in username field, calling the `onChange` method:
        onChange({
          pristine: false,
          name: 'username',
          rules: [],
          value: 'John Doe',
        });

        return null;
      }

      // 3) As a final check, the form engine must fulfill the `value` prop
      // in response to the change above in step 2:
      expect(typeof onChange).toBe('function');
      const finalExpected = {
        pristine: false,
        name: 'username',
        value: 'John Doe',
        success: true,
        messages: [],
        rules: [],
      };
      expect(formState.username).toStrictEqual(finalExpected);

      return null;
    });

    mount(<WrapperForm>{mockFunction}</WrapperForm>);

    expect(mockFunction).toHaveBeenCalledTimes(3);
  });

  it('should execute the validation rules informed', () => {
    const mockRule1 = jest.fn();
    const mockRule2 = jest.fn();
    const mockRule3 = jest.fn();
    const mockedRules = [mockRule1, mockRule2, mockRule3];

    const mockFunction = jest.fn().mockImplementationOnce(({ onChange }) => onChange({
      pristine: true,
      name: 'username',
      rules: mockedRules,
      value: '',
    }));

    mount(<WrapperForm>{mockFunction}</WrapperForm>);

    expect(mockRule1).toHaveBeenCalled();
    expect(mockRule2).toHaveBeenCalled();
    expect(mockRule3).toHaveBeenCalled();
  });

  it('should only submit the form when all fields validation are valid', () => {
    const mockRule1 = jest.fn();
    const mockRule2 = jest.fn();
    const mockedRules = [mockRule1, mockRule2];

    const mockSubmit = jest.fn().mockImplementation((formState) => {
      expect(formState).toStrictEqual({
        username: {
          pristine: false,
          name: 'username',
          rules: mockedRules,
          value: '',
          success: true,
          messages: [],
        },
      });
    });

    const wrapper = mount(
      <WrapperForm onSubmit={mockSubmit}>
        {({ onChange, formState }) => {
          // Simulate registering a field "username" in the Form:
          if (!formState.username) {
            onChange({
              pristine: false,
              name: 'username',
              rules: mockedRules,
              value: '',
            });
          }

          return <input type="submit" value="submit" />;
        }}
      </WrapperForm>,
    );

    wrapper.find('form').simulate('submit');
    expect(mockRule1).toHaveBeenCalled();
    expect(mockRule2).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('should NOT submit the form when a validation rule fails', () => {
    // A successfull validation returns undefined:
    const mockSuccessfulRule = jest.fn().mockReturnValue(undefined);
    // A invalid/failed validation returns an error string:
    const mockInvalidRule = jest.fn().mockReturnValue('Some error message');
    const mockedRules = [mockSuccessfulRule, mockInvalidRule];

    const mockSubmit = jest.fn();

    const wrapper = mount(
      <WrapperForm onSubmit={mockSubmit}>
        {({ onChange, formState }) => {
          // Simulate registering a field "username" in the Form:
          if (!formState.username) {
            onChange({
              pristine: false,
              name: 'username',
              rules: mockedRules,
              value: '',
            });
          }

          return <input type="submit" value="submit" />;
        }}
      </WrapperForm>,
    );

    wrapper.find('form').simulate('submit');
    expect(mockSuccessfulRule).toHaveBeenCalled();
    expect(mockInvalidRule).toHaveBeenCalled();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
