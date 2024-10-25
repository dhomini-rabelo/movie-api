/* eslint-disable */

export enum ErrorMessages {
  DUPLICATED_PASSWORD = 'Passwords do not match',
  REQUIRED = 'This field is required',
  REQUIRED_SELECT = 'Select an item',
  INVALID_CODE = 'Use only letters, numbers or traits',
  INVALID_VALUE = 'Invalid value',
  INVALID_EMAIL = 'Invalid email',
  INVALID_FORMAT = 'Invalid format',
  INVALID_CHOICE = 'Invalid choice',
  INVALID_SLUG = 'Use only letters, numbers, or "-, @, ., _"',
}

/* eslint-enable */

export const DynamicErrorMessages = {
  equalLength: (lengthValue: number) => `Use ${lengthValue} characters`,
  minLength: (minLengthValue: number) =>
    `Use more than ${minLengthValue} characters`,
  maxLength: (maxLengthValue: number) =>
    `Use less than ${maxLengthValue} characters`,
  minValue: (minValueNumber: number) =>
    `The minimum value must be ${minValueNumber}`,
  maxValue: (maxValueNumber: number) =>
    `The maximum value must be ${maxValueNumber}`,
} as const
