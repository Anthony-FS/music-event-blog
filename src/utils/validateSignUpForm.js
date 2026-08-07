export function validateSignUpForm(values) {
  const nextErrors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!values.name.trim()) {
    nextErrors.name = 'Name is required.'
  }

  if (!values.username.trim()) {
    nextErrors.username = 'Username is required.'
  }

  if (!emailPattern.test(values.email.trim())) {
    nextErrors.email = 'Please enter a valid email address.'
  }

  if (values.password.length < 8) {
    nextErrors.password = 'Password must be at least 8 characters.'
  }

  return nextErrors
}
