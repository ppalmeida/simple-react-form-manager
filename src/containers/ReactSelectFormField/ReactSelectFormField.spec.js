import React from 'react';
import { mount } from 'enzyme';
import ReactSelectFormField from './ReactSelectFormField';

describe('ReactSelectFormField suit tests', () => {
  it('should render successfully', () => {
    const wrapper = mount(
      <ReactSelectFormField
        name="choose-color"
        onChange={jest.fn()}
        options={[
          { label: 'Red', value: '#FF0000' },
          { label: 'Green', value: '#00FF00' },
          { label: 'Blue', value: '#0000FF' },
        ]}
        type="custom"
      />,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.find('SelectContainer').length).toBe(1);

    // ReactSelect creates an input hidden with the name of the component:
    expect(wrapper.find('input[name="choose-color"]').length).toBe(1);
  });

  it('should correctly call onChange method when changing its internal state', () => {
    const options = [
      { label: 'Red', value: '#FF0000' },
      { label: 'Green', value: '#00FF00' },
      { label: 'Blue', value: '#0000FF' },
    ];

    const onChangeMock = jest.fn();
    onChangeMock.mockImplementation((opt) => {
      expect(opt).toStrictEqual(options[0]);
    });

    const wrapper = mount(
      <ReactSelectFormField
        name="choose-color"
        onChange={onChangeMock}
        options={options}
        type="custom"
      />,
    );

    // Simulate react select clicks to change its value for the first option above (red):
    wrapper
      .find('.reactSelect__dropdown-indicator')
      .first()
      .simulate('mouseDown', { button: 0 });
    wrapper
      .find('.reactSelect__option')
      .first()
      .simulate('click', null);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
