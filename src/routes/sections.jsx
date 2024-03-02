import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

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
        { path: 'cliente', element: <ClientPage /> },
        { path: 'parceiro', element: <PartnerPage /> },
        { path: 'emprestimo', element: <LoanPage /> },
        { path: 'maquininha', element: <MachinePage /> },
        { path: 'relatorio', element: <ReportPage /> },
        { path: 'simulacoes', element: <SimulationsPage /> },
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
