import { useState } from 'react'
import { toast } from 'sonner'

import ConfirmDialog from '../ConfirmDialog'
import FormTextInput from '../FormTextInput'
import {
  AdminPageContent,
  AdminPageHeader,
  AdminPageShell,
} from '../AdminPageShell'
import { adminPrimaryButtonClassName } from '../../../lib/adminPageStyles'
import {
  updatePassword,
  verifyCurrentPassword,
} from '../../../services/authService'
import { resetPasswordValidation } from '../../../utils/validatePasswordReset'

const initialFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

function ResetPasswordManagement({ member }) {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: '',
      }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = resetPasswordValidation(formValues)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsConfirmDialogOpen(true)
  }

  async function handleConfirmReset() {
    if (isSubmitting) {
      return
    }

    try {
      setIsSubmitting(true)
      await verifyCurrentPassword(member.email, formValues.currentPassword)
      await updatePassword(formValues.newPassword)
      setFormValues(initialFormValues)
      setIsConfirmDialogOpen(false)
      toast.success('Password updated.')
    } catch (error) {
      setIsConfirmDialogOpen(false)
      setErrors((currentErrors) => ({
        ...currentErrors,
        currentPassword: error.message,
      }))
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminPageShell variant="form">
      <AdminPageHeader
        variant="form"
        title="Reset password"
        actions={
          <button
            type="submit"
            form="reset-password-form"
            className={adminPrimaryButtonClassName}
          >
            Reset
          </button>
        }
      />

      <AdminPageContent variant="form">
        <form id="reset-password-form" onSubmit={handleSubmit}>
        <div className="flex w-full max-w-3xl flex-col gap-8">
          <FormTextInput
            id="currentPassword"
            label="Current password"
            name="currentPassword"
            type="password"
            value={formValues.currentPassword}
            placeholder="Current password"
            error={errors.currentPassword}
            onChange={handleInputChange}
          />
          <FormTextInput
            id="newPassword"
            label="New password"
            name="newPassword"
            type="password"
            value={formValues.newPassword}
            placeholder="New password"
            error={errors.newPassword}
            onChange={handleInputChange}
          />
          <FormTextInput
            id="confirmPassword"
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            value={formValues.confirmPassword}
            placeholder="Confirm new password"
            error={errors.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        </form>
      </AdminPageContent>

      <ConfirmDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={handleConfirmReset}
        title="Reset password?"
        description="Are you sure you want to update your password?"
        confirmLabel={isSubmitting ? 'Updating...' : 'Confirm reset'}
        showCloseButton={false}
      />
    </AdminPageShell>
  )
}

export default ResetPasswordManagement
