import { useState } from 'react'
import { toast } from 'sonner'

const defaultAvatarUrl = '/images/myphoto.jpg'
const defaultBio =
  'I am a pet enthusiast and freelance writer who specializes in animal behavior and care.'

const inputClassName =
  'h-11 w-full max-w-sm rounded-sm border border-[#dedbd6] bg-white px-4 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] focus:border-[#28241f]'

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

    localStorage.setItem('member', JSON.stringify(nextMember))
    window.dispatchEvent(new Event('member-profile-updated'))
    onSave?.(nextMember)
    toast.success('Profile updated.')
  }

  return (
    <section className="min-h-screen min-w-0 flex-1 bg-[#f9f9f9]">
      <header className="flex min-h-[88px] items-center justify-between gap-4 border-b border-[#dedbd6] px-8 py-5 sm:px-16">
        <h1 className="text-xl font-bold text-[#28241f]">Profile</h1>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex! h-11 items-center justify-center rounded-full! bg-[#28241f] px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Save
        </button>
      </header>

      <form
        id="profile-form"
        className="px-8 py-10 sm:px-16"
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
              className={inputClassName}
            />
          </FormField>

          <FormField label="Username">
            <input
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              placeholder="thompson"
              className={inputClassName}
            />
          </FormField>

          <FormField label="Email">
            <input
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="thompson.p@gmail.com"
              className={inputClassName}
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
              className="w-full max-w-3xl resize-y rounded-sm border border-[#dedbd6] bg-white px-4 py-3 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] focus:border-[#28241f]"
            />
          </FormField>
        </div>
      </form>
    </section>
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

export default ProfileManagement
