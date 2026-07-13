import { useState } from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../components/layout/NavBar'
import FormTextInput from '../components/shared/FormTextInput'
import SignUpSuccessCard from '../components/member/SignUpSuccessCard'
import { validateSignUpForm } from '../utils/validateSignUpForm'

const initialFormValues = {
  name: '',
  username: '',
  email: '',
  password: '',
}

function SignUpPage() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false)

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

    const nextErrors = validateSignUpForm(formValues)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setIsRegistrationSuccessful(true)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <section className="flex min-h-[calc(100vh-74px)] items-center justify-center px-5 py-10 sm:px-8 sm:py-14">
        {isRegistrationSuccessful ? (
          <SignUpSuccessCard />
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-[700px] rounded-lg bg-[#f6f5f2] px-6 py-10 sm:px-16"
          >
            <h1 className="text-center text-3xl font-bold text-[#28241f]">
              Sign up
            </h1>

            <div className="mx-auto mt-8 flex w-full max-w-[490px] flex-col gap-3">
              <FormTextInput
                id="name"
                label="Name"
                name="name"
                value={formValues.name}
                placeholder="Full name"
                error={errors.name}
                onChange={handleInputChange}
                variant="auth"
              />

              <FormTextInput
                id="username"
                label="Username"
                name="username"
                value={formValues.username}
                placeholder="Username"
                error={errors.username}
                onChange={handleInputChange}
                variant="auth"
              />

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
                Sign up
              </button>
            </div>

            <p className="mt-4 text-center text-sm font-medium text-[#75716b]">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-[#28241f] underline underline-offset-2"
              >
                Log in
              </Link>
            </p>
          </form>
        )}
      </section>
    </main>
  )
}

export default SignUpPage
