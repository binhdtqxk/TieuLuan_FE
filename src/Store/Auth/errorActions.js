export const setError = (errorMessage, errorType = 'general') => ({
  type: 'SET_ERROR',
  payload: { message: errorMessage, errorType },
});

export const clearError = (errorType = 'general') => ({
  type: 'CLEAR_ERROR',
  payload: { errorType },
});