import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import PrivateRoute from 'src/hooks/privateRoute';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const LoanPage = lazy(() => import('src/pages/loan'));
export const ClientPage = lazy(() => import('src/pages/client'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const PartnerPage = lazy(() => import('src/pages/partner'));
export const MachinePage = lazy(() => import('src/pages/machine'));
export const ReportPage = lazy(() => import('src/pages/report'));
export const SimulationsPage = lazy(() => import('src/pages/simulation'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'cliente', element: <PrivateRoute element={<ClientPage />} /> },
        { path: 'parceiro', element: <PrivateRoute element={<PartnerPage />} /> },
        { path: 'emprestimo', element: <PrivateRoute element={<LoanPage />} /> },
        { path: 'maquininha', element: <PrivateRoute element={<MachinePage />} /> },
        { path: 'relatorio', element: <PrivateRoute element={<ReportPage />} /> },
        { path: 'simulacoes', element: <PrivateRoute element={<SimulationsPage />} /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
