import axios from 'axios'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ??
    'https://blog-post-project-api.vercel.app',
})

export default api
