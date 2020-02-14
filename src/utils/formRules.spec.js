import {
  minLength,
  maxLength,
  required,
  email,
  number,
  minValue,
  maxValue,
  date,
  alphaNumeric,
  dashAlphaNumeric,
} from './formRules';

describe('formRules suit test', () => {
  it('should validate the minLength rule', () => {
    const minLengthOf = minLength(2);

    const valid = minLengthOf('abc');
    expect(valid).toBe(undefined);

    const invalid = minLengthOf('a');
    expect(invalid).toBe('The value must be at least 2 characters');
  });

  it('should validate the maxLength rule', () => {
    const maxLengthOfTwo = minLength(2);
    const valid = maxLengthOfTwo('abc');
    const invalid = maxLengthOfTwo('a');
    expect(valid).toBe(undefined);
    expect(invalid).toBe('The value must be at least 2 characters');
  });

  it('should validate the maxLength rule', () => {
    const maxLengthOfTwo = maxLength(2);

    const valid = maxLengthOfTwo('a');
    expect(valid).toBe(undefined);

    const invalid = maxLengthOfTwo('abc');
    expect(invalid).toBe('The value can\'t be longer than 2 characters');
  });

  it('should validate the required rule', () => {
    let valid;
    let invalid;

    valid = required('a');
    expect(valid).toBe(undefined);

    valid = required(0);
    expect(valid).toBe(undefined);

    valid = required('0');
    expect(valid).toBe(undefined);

    valid = required({});
    expect(valid).toBe(undefined);

    valid = required([]);
    expect(valid).toBe(undefined);

    invalid = required();
    expect(invalid).toBe('This field is required');

    invalid = required(undefined);
    expect(invalid).toBe('This field is required');

    invalid = required(null);
    expect(invalid).toBe('This field is required');

    invalid = required('');
    expect(invalid).toBe('This field is required');
  });

  it('should validate the email rule', () => {
    const valid = 'some@email.com';
    expect(email(valid)).toBe(undefined);

    const invalid = 'an-invalid@email';
    expect(email(invalid)).toBe('The value is not a valid email');
  });

  it('should validate the number rule', () => {
    expect(number(1)).toBe(undefined);
    expect(number('1')).toBe(undefined);
    expect(number('abc')).toBe('This is not a valid number');
  });

  it('should validate the minValue rule', () => {
    const minValueOfTwo = minValue(2);
    expect(minValueOfTwo(2)).toBe(undefined);
    expect(minValueOfTwo('2')).toBe(undefined);
    expect(minValueOfTwo(3)).toBe(undefined);
    expect(minValueOfTwo('3')).toBe(undefined);
    expect(minValueOfTwo(0)).toBe('The number must be equal or greater than 2');
  });

  it('should validate the maxValue rule', () => {
    const maxValueOfTwo = maxValue(2);
    expect(maxValueOfTwo(2)).toBe(undefined);
    expect(maxValueOfTwo('2')).toBe(undefined);
    expect(maxValueOfTwo(3)).toBe('The number can not be greater than 2');
    expect(maxValueOfTwo('3')).toBe('The number can not be greater than 2');
  });

  it('should validate the date rule', () => {
    expect(date('2020-01-01 00:00')).toBe(undefined);
    expect(date('some not valid date')).toBe('The date is invalid');
  });

  it('should validate the date rule', () => {
    expect(date('2020-01-01 00:00')).toBe(undefined);
    expect(date('some not valid date')).toBe('The date is invalid');
  });

  it('should validate the alphaNumeric rule', () => {
    expect(alphaNumeric('abc123')).toBe(undefined);
    expect(alphaNumeric('a string with spaces and $symbols')).toBe(
      'You should only use letters and numbers',
    );
  });

  it('should validate the dashAlphaNumeric rule', () => {
    expect(dashAlphaNumeric('a-b_c-123')).toBe(undefined);
    expect(dashAlphaNumeric('a @ string_with-spaces and $ symbols')).toBe(
      'You should only use letters, numbers and dashes ("-" and "_")',
    );
  });
});
