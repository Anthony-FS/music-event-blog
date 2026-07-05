import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import NavBar from '../components/NavBar'
import { validateLogInForm } from '../utils/validateLogInForm'

const initialFormValues = {
  email: '',
  password: '',
}

function LogInPage() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})

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

    const nextErrors = validateLogInForm(formValues)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      navigate('/')
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <section className="flex min-h-[calc(100vh-74px)] items-center justify-center px-5 py-10 sm:px-8 sm:py-14">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-[700px] rounded-lg bg-[#f6f5f2] px-6 py-10 sm:px-16"
        >
          <h1 className="text-center text-3xl font-bold text-[#28241f]">
            Log in
          </h1>

          <div className="mx-auto mt-8 flex w-full max-w-[490px] flex-col gap-3">
            <FormField
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              placeholder="Email"
              error={errors.email}
              onChange={handleInputChange}
            />

            <FormField
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formValues.password}
              placeholder="Password"
              error={errors.password}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="mt-3 self-center flex h-11 min-w-[124px] items-center justify-center rounded-full! bg-[#28241f] px-8 text-sm font-semibold text-white transition-colors hover:bg-black"
            >
              Log in
            </button>
          </div>

          <p className="mt-4 text-center text-sm font-medium text-[#75716b]">
            Don&apos;t have any account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-[#28241f] underline underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}

function FormField({
  id,
  label,
  name,
  type = 'text',
  value,
  placeholder,
  error,
  onChange,
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-sm font-medium text-[#75716b]">
        {label}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-10 w-full rounded-sm border border-[#dedbd6] bg-white px-3 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] focus:border-[#28241f]"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </label>
  )
}

export default LogInPage
