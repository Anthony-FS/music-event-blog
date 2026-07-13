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

const inputClassName =
  'h-11 w-full max-w-sm rounded-sm border border-[#dedbd6] bg-white px-4 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] focus:border-[#28241f]'

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
    <section className="min-h-screen min-w-0 flex-1 bg-[#f9f9f9]">
      <header className="flex min-h-[88px] items-center justify-between gap-4 border-b border-[#dedbd6] px-8 py-5 sm:px-16">
        <h1 className="text-xl font-bold text-[#28241f]">Reset password</h1>
        <button
          type="submit"
          form="reset-password-form"
          className="inline-flex! h-11 items-center justify-center rounded-full! bg-[#28241f] px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Reset password
        </button>
      </header>

      <form
        id="reset-password-form"
        className="px-8 py-10 sm:px-16"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full max-w-3xl flex-col gap-8">
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
          <div className="mt-0 flex flex-col justify-center gap-3 sm:flex-row">
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
    <FormField label={label}>
      <input
        id={id}
        name={name}
        type="password"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClassName}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </FormField>
  )
}

function FormField({ label, children }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-[#75716b]">{label}</p>
      {children}
    </div>
  )
}

export default ResetPasswordManagement
