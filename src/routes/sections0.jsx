import { lazy,} from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SignUpPage = lazy(() => import('src/pages/signup'));
export const NewEnquireyPage = lazy(() => import('src/pages/new-enquirey'));
export const InvoicesPage = lazy(() => import('src/pages/invoices'));

// ----------------------------------------------------------------------


export default function NormalRouter(){

  const routes = useRoutes([    
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <SignUpPage />,
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


