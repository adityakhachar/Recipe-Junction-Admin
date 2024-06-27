import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`${name}`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('/assets/icons/navbar/ic_analytics.svg'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('https://img.icons8.com/?size=100&id=4kuCnjaqo47m&format=png&color=000000'),
  },
  {
    title: 'Recipes',
    path: '/blog',
    icon: icon('https://img.icons8.com/?size=100&id=57498&format=png&color=000000'),
  },
  
  
];

export default navConfig;
