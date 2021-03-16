import { Middleware } from '@nuxt/types'

const authenticated: Middleware = ({ redirect }) => {
  // Use context
  const check = localStorage.getItem('token');
  if (!check) {
    redirect('/')
  }
}

export default authenticated