import { InputTypes } from '../containers/FormField/constants';

export default function computeInputValue(event, type = undefined) {
  const { target } = event || {};
  const { CUSTOM, CHECKBOX, RADIO } = InputTypes;

  const table = {
    [CUSTOM]: event,
    [CHECKBOX]: target ? target.checked : null,
    [RADIO]: target && target.checked ? target.value : null,
  };

  return type && table[type] !== undefined ? table[type] : target.value;
}
