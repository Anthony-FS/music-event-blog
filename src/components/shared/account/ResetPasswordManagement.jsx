import { useState } from 'react'
import { toast } from 'sonner'

import ConfirmDialog from '../ConfirmDialog'
import FormTextInput from '../FormTextInput'
import {
  AdminPageContent,
  AdminPageHeader,
  AdminPageShell,
} from '../AdminPageShell'
import { getCurrentMemberPassword } from '../../../lib/memberSession'
import { adminPrimaryButtonClassName } from '../../../lib/adminPageStyles'
import { resetPasswordValidation } from '../../../utils/validatePasswordReset'

const initialFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

function ResetPasswordManagement() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

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

    const nextErrors = resetPasswordValidation(
      formValues,
      getCurrentMemberPassword(),
    )
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsConfirmDialogOpen(true)
  }

  function handleConfirmReset() {
    setFormValues(initialFormValues)
    setIsConfirmDialogOpen(false)
    toast.success('Password updated.')
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
        confirmLabel="Confirm reset"
        showCloseButton={false}
      />
    </AdminPageShell>
  )
}

export default ResetPasswordManagement
