import React from 'react';
import { mount } from 'enzyme';

import App from './App';

describe('App suit tests', () => {
  it('should render successfully', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toBeDefined();

    expect(wrapper.find('FormField').length).toBe(7);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input[type="submit"]').length).toBe(1);
  });
});
