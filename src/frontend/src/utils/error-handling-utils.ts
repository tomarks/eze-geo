export const isValidationFailure = (err: any): err is { type: 'ValidationFailure'; errors: { errorMessage: string }[] } => {
  return err.type === 'ValidationFailure';
};

export const handleError = (err: any) => {
  if (isValidationFailure(err)) {
    alert('Validation Error: ' + err.errors[0].errorMessage);
  } else {
    console.error(err);
  }
};
