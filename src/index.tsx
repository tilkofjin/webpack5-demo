import Home from './home';
import Rate from '@/rate';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/rate',
    component: Rate,
  },
];
export default routes;
