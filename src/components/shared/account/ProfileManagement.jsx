import { useState } from 'react'
import { toast } from 'sonner'

import FormField from '../FormField'
import {
  AdminPageContent,
  AdminPageHeader,
  AdminPageShell,
} from '../AdminPageShell'
import { adminInputClassName, adminTextareaClassName } from '../../../lib/formStyles'
import { adminPrimaryButtonClassName } from '../../../lib/adminPageStyles'
import { DEFAULT_MEMBER_AVATAR_URL } from '../../../lib/avatar'
import { updateEmail } from '../../../services/profileService'

function ProfileManagement({ member, onSave }) {
  const [avatarUrl, setAvatarUrl] = useState(
    member.avatarUrl || DEFAULT_MEMBER_AVATAR_URL,
  )
  const [isSaving, setIsSaving] = useState(false)
  const [formValues, setFormValues] = useState({
    name: member.name ?? '',
    username: member.username ?? '',
    email: member.email ?? '',
    bio: member.bio ?? '',
  })

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  function handleProfilePictureChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setAvatarUrl(String(reader.result))
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  async function handleSave() {
    try {
      setIsSaving(true)
      const requestedEmail = formValues.email.trim().toLowerCase()
      let savedEmail = member.email

      if (requestedEmail !== member.email) {
        const updatedUser = await updateEmail(requestedEmail)
        savedEmail = updatedUser.email ?? member.email
      }

      await onSave?.({
        ...member,
        name: formValues.name.trim(),
        username: formValues.username.trim(),
        email: savedEmail,
        bio: formValues.bio.trim(),
        avatarUrl,
      })

      toast.success(
        requestedEmail !== savedEmail
          ? 'Profile updated. Check your inbox to confirm the new email.'
          : 'Profile updated.',
      )
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminPageShell variant="form">
      <AdminPageHeader
        variant="form"
        title="Profile"
        actions={
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={adminPrimaryButtonClassName}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        }
      />

      <AdminPageContent variant="form">
        <form
          id="profile-form"
          onSubmit={(event) => {
            event.preventDefault()
            handleSave()
          }}
        >
        <div className="flex w-full max-w-3xl flex-col gap-8">
          <FormField label="Profile picture">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <img
                src={avatarUrl}
                alt=""
                className="h-28 w-28 rounded-full object-cover"
              />
              <label className="inline-flex! h-10 shrink-0 cursor-pointer items-center justify-center rounded-full! border border-[#28241f] bg-white px-6 text-sm font-semibold leading-none text-[#28241f] transition-colors hover:bg-[#eeece8]">
                Upload profile picture
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
          </FormField>

          <FormField label="Name">
            <input
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              placeholder="Thompson P."
              className={adminInputClassName}
            />
          </FormField>

          <FormField label="Username">
            <input
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              placeholder="thompson"
              className={adminInputClassName}
            />
          </FormField>

          <FormField label="Email">
            <input
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="thompson.p@gmail.com"
              className={adminInputClassName}
            />
          </FormField>

          <FormField label="Bio (max 120 letters)">
            <textarea
              name="bio"
              value={formValues.bio}
              onChange={handleInputChange}
              maxLength={120}
              rows={5}
              placeholder="Bio"
              className={`${adminTextareaClassName} max-w-3xl`}
            />
          </FormField>
        </div>
        </form>
      </AdminPageContent>
    </AdminPageShell>
  )
}

export default ProfileManagement
