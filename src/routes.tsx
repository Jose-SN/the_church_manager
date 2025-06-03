import { type ReactNode, Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load components
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));

// Auth pages
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));

// Dashboard pages
const MemberDashboard = lazy(() => import('./pages/Widget/MemberDashboard'));

// Protected pages
const MembersPage = lazy(() => import('./pages/Members/MembersPage'));
const EventsPage = lazy(() => import('./pages/Events/EventsPage'));
const DonationsPage = lazy(() => import('./pages/Donations/DonationsPage'));
const ReportsPage = lazy(() => import('./pages/Reports/ReportsPage'));
const SettingsPage = lazy(() => import('./pages/Settings/SettingsPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Auth guard component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Main App component with providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </AuthProvider>
  </QueryClientProvider>
);


// Main router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Public routes
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          // { path: 'register', element: <RegisterPage /> },
          // { path: 'forgot-password', element: <ForgotPasswordPage /> },
          // { path: 'reset-password', element: <ResetPasswordPage /> },
        ],
      },
      // Protected routes
      {
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <MemberDashboard /> },
          { path: 'members', element: <MembersPage /> },
          { path: 'events', element: <EventsPage /> },
          { path: 'donations', element: <DonationsPage /> },
          { path: 'reports', element: <ReportsPage /> },
          { path: 'settings', element: <SettingsPage /> },
          // Add more protected routes here
        ],
      },
      // Redirect any unknown paths to the dashboard or 404
      { path: '*', element: <Navigate to="/member-dashboard" replace /> },
    ],
  },
]);

export default router;
