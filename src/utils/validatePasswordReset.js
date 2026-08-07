export function resetPasswordValidation(values) {
  const nextErrors = {}

  if (!values.currentPassword.trim()) {
    nextErrors.currentPassword = 'Current password is required.'
  }

  if (!values.newPassword.trim()) {
    nextErrors.newPassword = 'New password is required.'
  } else if (values.newPassword.length < 8) {
    nextErrors.newPassword = 'New password must be at least 8 characters.'
  }

  if (!values.confirmPassword.trim()) {
    nextErrors.confirmPassword = 'Please confirm your new password.'
  } else if (values.confirmPassword !== values.newPassword) {
    nextErrors.confirmPassword = 'New passwords do not match.'
  }

  return nextErrors
}
