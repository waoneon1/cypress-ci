import { Middleware } from '@nuxt/types';

const authenticated: Middleware = ({ redirect }) => {
  const isMaintenance:boolean = false;
  const check = localStorage.getItem('token');
  if (isMaintenance) {
    redirect('/maintenance');
  }
  if (!check) {
    redirect('/');
  }
};

export default authenticated;
