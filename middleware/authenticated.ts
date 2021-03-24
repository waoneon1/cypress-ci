import { Middleware } from '@nuxt/types';

const authenticated: Middleware = ({ redirect, error, route }) => {
  const isMaintenance:boolean = true;
  const check = localStorage.getItem('token');
  if (isMaintenance) {
    redirect('/maintenance');
  } else if ((!error && !check) || route.path === '/maintenance') {
    redirect('/');
  }
};

export default authenticated;
