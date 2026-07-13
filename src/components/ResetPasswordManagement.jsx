import { useState } from 'react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { members } from '../data/memberlogin'
import { resetPasswordValidation } from '../utils/validatePasswordReset'

const initialFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

function getStoredMember() {
  try {
    return JSON.parse(localStorage.getItem('member')) ?? {}
  } catch {
    return {}
  }
}

function getCurrentMemberPassword() {
  const storedMember = getStoredMember()
  const matchingMember = members.find(
    (member) =>
      member.id === storedMember.id || member.email === storedMember.email,
  )

  return matchingMember?.password ?? 'password123'
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
    <section className="min-h-screen min-w-0 bg-[#f9f9f9] px-6 py-8 sm:px-10">
      <h1 className="text-2xl font-bold text-[#28241f]">Reset password</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-[520px] rounded-lg bg-[#f6f5f2] px-6 py-9 sm:px-9"
      >
        <div className="w-full space-y-5">
          <PasswordField
            id="currentPassword"
            label="Current password"
            name="currentPassword"
            value={formValues.currentPassword}
            placeholder="Current password"
            error={errors.currentPassword}
            onChange={handleInputChange}
          />
          <PasswordField
            id="newPassword"
            label="New password"
            name="newPassword"
            value={formValues.newPassword}
            placeholder="New password"
            error={errors.newPassword}
            onChange={handleInputChange}
          />
          <PasswordField
            id="confirmPassword"
            label="Confirm new password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            placeholder="Confirm new password"
            error={errors.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="mt-4 h-11 min-w-[160px] rounded-full! bg-[#28241f] px-8 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Reset password
        </button>
      </form>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent className="max-w-[420px] rounded-lg bg-white px-8 py-8 text-center">
          <AlertDialogTitle className="text-2xl font-bold text-[#28241f]">
            Reset password?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm font-medium leading-relaxed text-[#75716b]">
            Are you sure you want to update your password?
          </AlertDialogDescription>
          <div className="mt-3 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="h-10 rounded-full! border border-[#dedbd6] bg-white px-6 text-sm font-semibold text-[#28241f] transition-colors hover:bg-[#f6f5f2]"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-10 rounded-full! bg-[#28241f] px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
              onClick={handleConfirmReset}
            >
              Confirm reset
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}

function PasswordField({ id, label, name, value, placeholder, error, onChange }) {
  return (
    <label htmlFor={id} className="block w-full">
      <span className="mb-2 block text-sm font-medium text-[#75716b]">
        {label}
      </span>
      <input
        id={id}
        name={name}
        type="password"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 w-full rounded-sm border border-[#dedbd6] bg-white px-4 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] focus:border-[#28241f]"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </label>
  )
}

export default ResetPasswordManagement
