import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Loading from 'src/utils/loading-spinner';

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
export const ChatPage = lazy(() => import('src/pages/chat'));
export const AllEnquiryPage = lazy(() => import('src/pages/all-enquirys'));
export const UserProfilePage = lazy(() => import('src/pages/user-profile'));
export const ApplyNowPage = lazy(() => import('src/pages/apply-now'));
export const CourseLearnMorePage = lazy(() => import('src/pages/courses_learnmore'));
export const SingleEnquiryPage = lazy(() => import('src/pages/single-enquiry'));

// ----------------------------------------------------------------------

export function AdminRouter() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'newenquiry', element: <NewEnquireyPage /> },
        {
          path: 'allenquirys',
          children: [
            { element: <AllEnquiryPage />, index: true },
            { path: 'enquiry/:id', element: <SingleEnquiryPage /> },
          ],
          element: (
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          ),
        },
        { path: 'user', element: <UserPage /> },
        {
          path: 'courses',
          children: [
            { element: <ProductsPage />, index: true },
            { path: 'applynow', element: <ApplyNowPage /> },
            { path: 'courselearnmore', element: <CourseLearnMorePage /> },
          ],
          element: (
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          ),
        },
        { path: 'blog', element: <BlogPage /> },
        { path: 'invoices', element: <InvoicesPage /> },
        { path: 'chat', element: <ChatPage /> },
        { path: 'profile', element: <UserProfilePage /> },
      ],
      path: '/dashboard',
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
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

export function StudentRouter() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'newenquiry', element: <NewEnquireyPage /> },
        {
          path: 'courses',

          element: <ProductsPage />,
        },
        { path: 'user', element: <UserPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'chat', element: <ChatPage /> },
        { path: 'profile', element: <UserProfilePage /> },
      ],
      path: '/dashboard',
    },
    {
      path: '/signup',
      element: <SignUpPage />,
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
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

export function MentorRouter() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'newenquiry', element: <NewEnquireyPage /> },
        { path: 'courses', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'chat', element: <ChatPage /> },
        { path: 'profile', element: <UserProfilePage /> },
      ],
      path: '/dashboard',
    },
    {
      path: '/signup',
      element: <SignUpPage />,
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
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

export function NormalRouter() {
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
