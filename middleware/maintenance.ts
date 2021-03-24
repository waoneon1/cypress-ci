// export default function Maintenance(redirect:any, route:any) {
//   const isMaintenance = true;
//   if (isMaintenance) {
//     redirect('/maintenance');
//   }
//   if (!isMaintenance && route.path === '/maintenance') {
//     redirect('/');
//   }
// }
import { Middleware } from '@nuxt/types';

const maintenance: Middleware = ({ redirect, route }) => {
  const isMaintenance = true;
  if (isMaintenance) {
    redirect('/maintenance');
  }
  if (!isMaintenance && route.path === '/maintenance') {
    redirect('/');
  }
};

export default maintenance;
