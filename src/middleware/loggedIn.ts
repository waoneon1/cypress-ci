import { Middleware } from '@nuxt/types';

const loggedIn: Middleware = ({
  redirect,
}) => {
  const check = localStorage.getItem('token');
  if (check) {
    redirect('/dashboard');
  }
};

export default loggedIn;
