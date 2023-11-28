import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'relatórios',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'clientes',
    path: '/cliente',
    icon: icon('ic_user'),
  },
  {
    title: 'empréstimos',
    path: '/emprestimo',
    icon: icon('ic_disabled'),
  },
  {
    title: 'parceiros',
    path: '/parceiro',
    icon: icon('ic_cart'),
  },
  {
    title: 'maquininhas',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'simulações',
    path: '/simulacoes',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
