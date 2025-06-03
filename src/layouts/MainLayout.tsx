import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { AuthProvider } from '../context/AuthContext';

const queryClient = new QueryClient();

const MainLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
              <div className="container mx-auto px-4 py-6">
                <Outlet />
              </div>
            </main>
          </div>
          <Toaster position="top-right" />
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
