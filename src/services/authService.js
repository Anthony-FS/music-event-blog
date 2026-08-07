import { supabase } from '../lib/supabase'

function getSupabase() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.',
    )
  }

  return supabase
}

function getAuthErrorMessage(error) {
  const message = error?.message?.toLowerCase() ?? ''

  if (message.includes('invalid login credentials')) {
    return 'Invalid email or password.'
  }

  if (message.includes('user already registered')) {
    return 'An account with this email already exists.'
  }

  if (message.includes('password')) {
    return error.message
  }

  return error?.message ?? 'Authentication failed. Please try again.'
}

function throwAuthError(error) {
  throw new Error(getAuthErrorMessage(error))
}

export async function signIn(email, password) {
  const { data, error } = await getSupabase().auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })

  if (error) {
    throwAuthError(error)
  }

  return data
}

export async function signUp({ email, password, name, username }) {
  const { data, error } = await getSupabase().auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        name: name.trim(),
        username: username.trim(),
      },
    },
  })

  if (error) {
    throwAuthError(error)
  }

  return data
}

export async function signOut() {
  const { error } = await getSupabase().auth.signOut()

  if (error) {
    throwAuthError(error)
  }
}

export async function getSession() {
  const { data, error } = await getSupabase().auth.getSession()

  if (error) {
    throwAuthError(error)
  }

  return data.session
}

export function onAuthStateChange(callback) {
  return getSupabase().auth.onAuthStateChange(callback)
}

export async function updatePassword(password) {
  const { data, error } = await getSupabase().auth.updateUser({ password })

  if (error) {
    throwAuthError(error)
  }

  return data.user
}

export async function verifyCurrentPassword(email, password) {
  await signIn(email, password)
}
