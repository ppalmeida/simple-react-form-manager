import { useMemo } from 'react';

export default function useErrorMessages(fieldValue, pristine) {
  const messages = fieldValue ? fieldValue.messages : null;
  const errorMessages = useMemo(() => messages || [], [messages]);

  const showErrors = useMemo(() => errorMessages.length > 0 && !pristine, [
    errorMessages,
    pristine,
  ]);

  return [errorMessages, showErrors];
}
