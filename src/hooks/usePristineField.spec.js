import hooksTestComponent from '../utils/hooksTestComponent';

import usePristineField from './useIsPristineField';

describe('usePristineField suit tests', () => {
  it(
    'should run successfully',
    hooksTestComponent(() => {
      const pristine = usePristineField({ pristine: true });
      expect(pristine).toBe(true);
    }),
  );

  it(
    'should return false when pristine is falsy',
    hooksTestComponent(() => {
      const pristine = usePristineField({ pristine: false });
      expect(pristine).toBe(false);
    }),
  );

  it(
    'should return true when pristine is unknown',
    hooksTestComponent(() => {
      let pristine = usePristineField({ pristine: null });
      expect(pristine).toBe(true);

      pristine = usePristineField({ pristine: undefined });
      expect(pristine).toBe(true);

      pristine = usePristineField({});
      expect(pristine).toBe(true);

      pristine = usePristineField(null);
      expect(pristine).toBe(true);

      pristine = usePristineField(undefined);
      expect(pristine).toBe(true);
    }),
  );
});
