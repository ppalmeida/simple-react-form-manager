import { act } from 'react-dom/test-utils';
import hooksTestComponent from '../utils/hooksTestComponent';

import useFormStateReducer from './useFormStateReducer';

const mockFieldSuccess = {
  name: 'username',
  pristine: true,
  rules: [jest.fn()],
  value: '',
};

const mockFieldError = {
  name: 'username',
  pristine: false,
  rules: [jest.fn().mockReturnValue('This is an error message')],
  value: '',
};

describe('useFormStateReducer suit tests', () => {
  it(
    'should run successfully',
    hooksTestComponent(() => {
      const [currentState, updateState] = useFormStateReducer();

      // To simulate the browser lifecycle, we use 'act':
      act(() => {
        // If the state is in its initial stage (empty state):
        if (Object.keys(currentState).length === 0) {
          // Update the state:
          updateState(mockFieldSuccess);
          return;
        }

        // Now, check if the state has the current/correct version of the state:
        expect(currentState).toStrictEqual({
          username: {
            name: mockFieldSuccess.name,
            pristine: mockFieldSuccess.pristine,
            rules: mockFieldSuccess.rules,
            value: mockFieldSuccess.value,
            messages: [],
            success: true,
          },
        });
      });
    }),
  );

  it(
    'should add the error messages:',
    hooksTestComponent(() => {
      const [currentState, updateState] = useFormStateReducer();

      act(() => {
        if (Object.keys(currentState).length === 0) {
          updateState(mockFieldError);
          return;
        }

        expect(currentState).toStrictEqual({
          username: {
            name: mockFieldError.name,
            pristine: mockFieldError.pristine,
            rules: mockFieldError.rules,
            value: mockFieldError.value,
            messages: ['This is an error message'],
            success: false,
          },
        });
      });
    }),
  );
});
