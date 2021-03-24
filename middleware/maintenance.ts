import { Middleware } from '@nuxt/types';

const maintenance: Middleware = ({ redirect, error, route }) => {
  const isMaintenance: boolean = true;
  if (isMaintenance) {
    redirect('/maintenance');
  } else if (!error || route.path === '/maintenance') {
    redirect('/');
  }
};

export default maintenance;
