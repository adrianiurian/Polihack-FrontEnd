// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'Map',
    path: '/dashboard/app',
    icon: icon('ic_disabled'),
  },
  {
    title: 'housing',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'jobs',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'news',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
