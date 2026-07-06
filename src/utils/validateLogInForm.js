export function validateLogInForm(values) {
  const nextErrors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(values.email.trim())) {
    nextErrors.email = 'Please enter a valid email address.'
  }

  if (!values.password.trim()) {
    nextErrors.password = 'Password is required.'
  }

  return nextErrors
}
