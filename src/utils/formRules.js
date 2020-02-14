export const minLength = m => value => (value !== undefined && value.length >= m
  ? undefined
  : `The value must be at least ${m} characters`);
export const maxLength = m => value => (value !== undefined && value.length <= m
  ? undefined
  : `The value can't be longer than ${m} characters`);
export const required = (value) => {
  const result = value || typeof value === 'number' ? undefined : 'This field is required';

  return result;
};
export const email = (value) => {
  const result = value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  return result ? undefined : 'The value is not a valid email';
};
export const number = (value) => {
  const message = 'This is not a valid number';
  if (
    value === undefined
    || value === null
    || value === true
    || value === false
    || typeof value === 'object'
  ) return message;

  return Number.isNaN(Number(value)) ? message : undefined;
};

export const minValue = min => value => (typeof parseInt(value, 10) === 'number' && value < min
  ? `The number must be equal or greater than ${min}`
  : undefined);

export const maxValue = max => value => (typeof parseInt(value, 10) && value > max
  ? `The number can not be greater than ${max}`
  : undefined);

export const date = (value) => {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 'The date is invalid' : undefined;
};

export const alphaNumeric = (value) => {
  const result = value && /^[a-z0-9]+$/i.test(value);
  return result === false ? 'You should only use letters and numbers' : undefined;
};

export const dashAlphaNumeric = value => (value && /^[\w0-9 \-_]+$/i.test(value) === false
  ? 'You should only use letters, numbers and dashes ("-" and "_")'
  : undefined);
