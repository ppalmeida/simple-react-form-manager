import { act } from 'react-dom/test-utils';
import hooksTestComponent from '../utils/hooksTestComponent';

import useSubmitWithRules from './useSubmitWithRules';

describe('useSubmitWithRules suit tests', () => {
  it(
    'should run successfully',
    hooksTestComponent(() => {
      const updateFormStateMock = jest.fn().mockReturnValue({});
      const updateProcessSubmitMock = jest.fn();
      const mockLatestState = {
        username: {
          name: 'username',
          pristine: true,
          rules: [jest.fn()],
          value: 'John Doe',
          messages: [],
          success: true,
        },
      };
      const onSubmit = useSubmitWithRules(
        updateFormStateMock,
        updateProcessSubmitMock,
        mockLatestState,
      );

      act(() => {
        onSubmit({ preventDefault: jest.fn() });

        expect(updateFormStateMock).toHaveBeenCalledWith({
          name: 'username',
          pristine: false,
          rules: mockLatestState.username.rules,
          value: 'John Doe',
          messages: mockLatestState.username.messages,
          success: true,
        });
        expect(updateProcessSubmitMock).toHaveBeenCalledWith(true);
      });
    }),
  );
});
