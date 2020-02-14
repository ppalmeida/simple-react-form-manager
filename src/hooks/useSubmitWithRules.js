import { useCallback } from 'react';

export default function useSubmitWithRules(updateFormState, updateProcessSubmit, formState) {
  const callbackResult = useCallback(
    (event) => {
      event.preventDefault();
      // validate all fields and force `pristine:false` to show error(s):
      Object.values(formState).forEach((formField) => {
        const newField = {
          ...formField,
          pristine: false,
        };
        updateFormState(newField);
      });

      updateProcessSubmit(true);
      return false;
    },
    [formState, updateProcessSubmit, updateFormState],
  );

  return callbackResult;
}
