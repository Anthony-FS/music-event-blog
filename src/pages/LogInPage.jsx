import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import NavBar from '../components/layout/NavBar'
import FormTextInput from '../components/shared/FormTextInput'
import { authenticateMember } from '../data/memberlogin'
import { saveMemberSession } from '../lib/memberSession'
import { validateLogInForm } from '../utils/validateLogInForm'

const initialFormValues = {
  email: '',
  password: '',
}

function LogInPage() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')

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

    if (submitError) {
      setSubmitError('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateLogInForm(formValues)
    setErrors(nextErrors)
    setSubmitError('')

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const member = authenticateMember(formValues.email, formValues.password)

    if (!member) {
      setSubmitError('Invalid email or password.')
      return
    }

    saveMemberSession(member)

    navigate('/')
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
            <FormTextInput
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              placeholder="Email"
              error={errors.email}
              onChange={handleInputChange}
              variant="auth"
            />

            <FormTextInput
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formValues.password}
              placeholder="Password"
              error={errors.password}
              onChange={handleInputChange}
              variant="auth"
            />

            <button
              type="submit"
              className="mt-3 self-center flex h-11 min-w-[124px] items-center justify-center rounded-full! bg-[#28241f] px-8 text-sm font-semibold text-white transition-colors hover:bg-black"
            >
              Log in
            </button>

            {submitError && (
              <p className="text-center text-xs font-semibold text-red-600">
                {submitError}
              </p>
            )}
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

export default LogInPage
