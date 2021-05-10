import { Middleware } from '@nuxt/types';

const authenticated: Middleware = ({
  redirect, from,
}) => {
  const isMaintenance:boolean = false;
  const check = localStorage.getItem('token');
  if (isMaintenance) {
    redirect('/maintenance');
  }
  if (!check) {
    redirect(`/?redirect_url=${from.fullPath}`);
  }
};

export default authenticated;
