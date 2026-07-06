import { useState } from 'react'
import { toast } from 'sonner'

function ProfileManagement({ member, onSave }) {
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

  function handleSubmit(event) {
    event.preventDefault()

    const nextMember = {
      ...member,
      name: formValues.name,
      username: formValues.username,
      email: formValues.email,
    }

    localStorage.setItem('member', JSON.stringify(nextMember))
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
            src="/images/myphoto.jpg"
            alt=""
            className="h-28 w-28 rounded-full object-cover"
          />
          <button
            type="button"
            className="h-10 w-fit rounded-full! border border-[#28241f] bg-white px-8 text-sm font-semibold text-[#28241f] transition-colors hover:bg-[#eeece8]"
          >
            Upload profile picture
          </button>
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
