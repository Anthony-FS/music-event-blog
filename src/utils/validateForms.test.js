import { describe, expect, it } from 'vitest'

import { validateLogInForm } from './validateLogInForm'
import { validateSignUpForm } from './validateSignUpForm'

const validSignUp = {
  name: 'Ada',
  username: 'ada',
  email: 'ada@example.com',
  password: 'longenough',
}

describe('validateSignUpForm', () => {
  it('accepts a complete form', () => {
    expect(validateSignUpForm(validSignUp)).toEqual({})
  })

  it('rejects whitespace-only name and username', () => {
    const errors = validateSignUpForm({
      ...validSignUp,
      name: '   ',
      username: ' ',
    })

    expect(errors.name).toBe('Name is required.')
    expect(errors.username).toBe('Username is required.')
  })

  it('rejects malformed emails', () => {
    for (const email of ['ada', 'ada@example', 'ada example.com', '']) {
      expect(validateSignUpForm({ ...validSignUp, email }).email).toBe(
        'Please enter a valid email address.',
      )
    }
  })

  it('requires a password of at least 8 characters', () => {
    expect(validateSignUpForm({ ...validSignUp, password: '1234567' }).password).toBe(
      'Password must be at least 8 characters.',
    )
    expect(
      validateSignUpForm({ ...validSignUp, password: '12345678' }).password,
    ).toBeUndefined()
  })
})

describe('validateLogInForm', () => {
  it('accepts a valid email and password', () => {
    expect(
      validateLogInForm({ email: 'ada@example.com', password: 'secret' }),
    ).toEqual({})
  })

  it('rejects a bad email and a blank password', () => {
    const errors = validateLogInForm({ email: 'nope', password: '  ' })

    expect(errors.email).toBe('Please enter a valid email address.')
    expect(errors.password).toBe('Password is required.')
  })
})
