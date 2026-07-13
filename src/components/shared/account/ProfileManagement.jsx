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
import { updateStoredMember } from '../../../lib/memberSession'

const defaultAvatarUrl = '/images/myphoto.jpg'
const defaultBio =
  'I am a pet enthusiast and freelance writer who specializes in animal behavior and care.'

function ProfileManagement({ member, onSave }) {
  const [avatarUrl, setAvatarUrl] = useState(member.avatarUrl ?? defaultAvatarUrl)
  const [formValues, setFormValues] = useState({
    name: member.name ?? 'Thompson P.',
    username: member.username ?? 'thompson',
    email: member.email ?? 'thompson.p@gmail.com',
    bio: member.bio ?? defaultBio,
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

  function handleSave() {
    const nextMember = {
      ...member,
      name: formValues.name.trim(),
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      bio: formValues.bio.trim(),
      avatarUrl,
    }

    updateStoredMember(nextMember)
    onSave?.(nextMember)
    toast.success('Profile updated.')
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
            className={adminPrimaryButtonClassName}
          >
            Save
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
