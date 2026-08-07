import axios from 'axios'

import { supabase } from './supabase'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ??
    'https://blog-post-project-api.vercel.app',
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
