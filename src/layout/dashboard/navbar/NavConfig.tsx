// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  banking: getIcon('ic_banking'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // ----------------------------------------------------------------------
  {
    subheader: 'Gestão',
    items: [
      { title: 'App', path: PATH_DASHBOARD.gestao.app, icon: ICONS.dashboard },
      { title: 'Pedidos', path: PATH_DASHBOARD.gestao.pedidos, icon: ICONS.banking },
    ],
  },
];

export default navConfig;
