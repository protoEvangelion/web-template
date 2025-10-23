import { isValidPromo } from './validators';

describe('isValidPromo validator', () => {
  const message = 'Invalid promo';
  const validator = isValidPromo(message);

  test('returns undefined (valid) for empty promo', () => {
    expect(validator('')).toBeUndefined();
    expect(validator(undefined)).toBeUndefined();
    expect(validator(null)).toBeUndefined();
  });

  test('returns undefined (valid) for known promo', () => {
    expect(validator('aaa')).toBeUndefined();
  });

  test('returns message for invalid promo', () => {
    expect(validator('not-a-promo')).toBe(message);
  });

  test('returns message for non-string promo values', () => {
    expect(validator(123)).toBe(message);
    expect(validator({})).toBe(message);
  });
});
