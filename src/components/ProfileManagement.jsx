import { useState } from 'react'
import { toast } from 'sonner'

const defaultAvatarUrl = '/images/myphoto.jpg'

function ProfileManagement({ member, onSave }) {
  const [avatarUrl, setAvatarUrl] = useState(member.avatarUrl ?? defaultAvatarUrl)
  const [formValues, setFormValues] = useState({
    name: member.name ?? 'Anthony FS.',
    username: member.username ?? 'anthonyfs',
    email: member.email ?? 'anthony@example.com',
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
      const nextAvatarUrl = String(reader.result)
      const nextMember = {
        ...member,
        ...formValues,
        avatarUrl: nextAvatarUrl,
      }

      setAvatarUrl(nextAvatarUrl)
      localStorage.setItem('member', JSON.stringify(nextMember))
      window.dispatchEvent(new Event('member-profile-updated'))
      onSave?.(nextMember)
      toast.success('Profile picture updated.')
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextMember = {
      ...member,
      name: formValues.name,
      username: formValues.username,
      email: formValues.email,
      avatarUrl,
    }

    localStorage.setItem('member', JSON.stringify(nextMember))
    window.dispatchEvent(new Event('member-profile-updated'))
    onSave?.(nextMember)
    toast.success('Profile updated.')
  }

  return (
    <section>
      <h1 className="text-2xl font-bold text-[#28241f]">Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-[520px] rounded-lg bg-[#f6f5f2] px-6 py-9 sm:px-9"
      >
        <div className="flex flex-col gap-5 border-b border-[#dedbd6] pb-8 sm:flex-row sm:items-center">
          <img
            src={avatarUrl}
            alt=""
            className="h-28 w-28 rounded-full object-cover"
          />
          <label className="inline-flex! h-10 w-fit cursor-pointer items-center justify-center rounded-full! border border-[#28241f] bg-white px-8 py-0 text-sm font-semibold leading-none text-[#28241f] transition-colors hover:bg-[#eeece8]">
            <span className="text-center leading-none">Upload profile picture</span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>

        <div className="mt-8 w-full space-y-5">
          <ProfileField
            id="name"
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <ProfileField
            id="username"
            label="Username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
          />
          <ProfileField
            id="email"
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            disabled
          />
        </div>

        <button
          type="submit"
          className="mt-4 h-11 min-w-[110px] rounded-full! bg-[#28241f] px-8 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Save
        </button>
      </form>
    </section>
  )
}

function ProfileField({ id, label, name, value, onChange, disabled = false }) {
  return (
    <label htmlFor={id} className="block w-full">
      <span className="mb-2 block text-sm font-medium text-[#75716b]">
        {label}
      </span>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-11 w-full rounded-sm border border-[#dedbd6] bg-white px-4 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] focus:border-[#28241f] disabled:border-transparent disabled:bg-transparent disabled:text-[#b6b0a8]"
      />
    </label>
  )
}

export default ProfileManagement
