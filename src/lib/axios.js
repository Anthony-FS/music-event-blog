import axios from 'axios'

import { supabase } from './supabase'

const apiBaseUrl = String(
  import.meta.env.VITE_API_BASE_URL ?? '',
).replace(/\/$/, '')

if (!apiBaseUrl) {
  console.warn(
    'VITE_API_BASE_URL is not set. API requests will fail until it is configured.',
  )
}

const api = axios.create({
  baseURL: apiBaseUrl || undefined,
})

api.interceptors.request.use(async (config) => {
  if (!supabase) {
    return config
  }

  const { data } = await supabase.auth.getSession()
  const accessToken = data.session?.access_token

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export default api
