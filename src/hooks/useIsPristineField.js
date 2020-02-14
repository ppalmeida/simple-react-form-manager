import { useMemo } from 'react';

export default function usePristineField(value) {
  const pristine = useMemo(
    () => (value && typeof value.pristine === 'boolean' ? value.pristine : true),
    [value],
  );

  return pristine;
}
