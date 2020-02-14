import formInputValue from './formInputValue';
import { InputTypes } from '../containers/FormField/constants';

describe('utils/formInputValue test suit', () => {
  it('should return the Event object itself when input type is custom', () => {
    const mockEvent = {};
    const result = formInputValue(mockEvent, InputTypes.CUSTOM);
    expect(result).toBe(mockEvent);
  });

  it('should return the checked property when input type is checkbox', () => {
    const mockEvent = {
      target: {
        checked: true,
      },
    };
    let result = formInputValue(mockEvent, InputTypes.CHECKBOX);
    expect(result).toBe(true);

    mockEvent.target.checked = false;
    result = formInputValue(mockEvent, InputTypes.CHECKBOX);
    expect(result).toBe(false);
  });

  it('should return the value property when input type is radio', () => {
    const mockEvent = {
      target: {
        checked: true,
      },
    };
    const result = formInputValue(mockEvent, InputTypes.CHECKBOX);
    expect(result).toBe(true);
  });

  it('should return the "target.value" property when input type is not specified', () => {
    const mockEvent = {
      target: {
        value: 'some value',
      },
    };
    const result = formInputValue(mockEvent);
    expect(result).toBe('some value');
  });
});
