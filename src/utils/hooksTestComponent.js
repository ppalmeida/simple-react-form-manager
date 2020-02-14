import React from 'react';
import { mount } from 'enzyme';

/*
As said in React documentation, a React Hook
can only be executed inside a React functional component.
This is just a small utility to encapsulate Hooks unit testing.
*/
const TestHook = ({ callback }) => {
  callback();
  return null;
};

export default function hooksTestComponent(callback) {
  return () => {
    mount(<TestHook callback={callback} />);
    return undefined;
  };
}
