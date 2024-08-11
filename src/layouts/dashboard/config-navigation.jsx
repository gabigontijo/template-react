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
    icon: icon('ic_loan'),
  },
  {
    title: 'parceiros',
    path: '/parceiro',
    icon: icon('ic_partner'),
  },
  {
    title: 'maquininhas',
    path: '/maquininha',
    icon: icon('ic_machin'),
  },
  {
    title: 'simulações',
    path: '/simulacoes',
    icon: icon('ic_simulation'),
  }
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
];

export default navConfig;
