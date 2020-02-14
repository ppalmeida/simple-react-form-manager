import hooksTestComponent from '../utils/hooksTestComponent';

import useErrorMessages from './useErrorMessages';

describe('useErrorMessages suit tests', () => {
  it(
    'should run successfully',
    hooksTestComponent(() => {
      let mockMessages = { messages: [] };
      const mockPristine = false;
      let [errorMessages, showErrors] = useErrorMessages(mockMessages, mockPristine);

      expect(errorMessages).toStrictEqual([]);
      expect(showErrors).toBe(false);

      mockMessages = { messages: undefined };
      [errorMessages, showErrors] = useErrorMessages(mockMessages, mockPristine);

      expect(errorMessages).toStrictEqual([]);
      expect(showErrors).toBe(false);

      mockMessages = { messages: null };
      [errorMessages, showErrors] = useErrorMessages(mockMessages, mockPristine);

      expect(errorMessages).toStrictEqual([]);
      expect(showErrors).toBe(false);
    }),
  );

  it(
    'should show error messages on failed rules methods',
    hooksTestComponent(() => {
      const mockMessages = {
        messages: ['First error message', 'Second error message'],
      };
      const mockPristine = false;
      const [errorMessages, showErrors] = useErrorMessages(mockMessages, mockPristine);

      expect(errorMessages).toStrictEqual(mockMessages.messages);
      expect(showErrors).toBe(true);
    }),
  );
});
