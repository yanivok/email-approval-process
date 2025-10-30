import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from './store/useAppStore';
import { useEffect } from 'react';

// Components
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RequestsPage from './pages/RequestsPage';
import CreateRequestPage from './pages/CreateRequestPage';
import RequestDetailPage from './pages/RequestDetailPage';
import MyApprovalsPage from './pages/MyApprovalsPage';
import WorkflowsPage from './pages/WorkflowsPage';
import SettingsPage from './pages/SettingsPage';
import LoadingSpinner from './components/LoadingSpinner';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  const { isAuthenticated, isLoading, setUser } = useAppStore();

  useEffect(() => {
    // Simulate checking for existing authentication
    // In a real app, this would check localStorage or make an API call
    const checkAuth = async () => {
      setUser({
        id: '550e8400-e29b-41d4-a716-446655440003',
        email: 'john.doe@company.com',
        name: 'John Doe',
        avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
        role: 'user',
        is_active: true,
        last_login_at: '2024-01-15T08:45:00Z',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T08:45:00Z',
      });
    };

    checkAuth();
  }, [setUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
              }
            />
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/requests" element={<RequestsPage />} />
                      <Route path="/requests/new" element={<CreateRequestPage />} />
                      <Route path="/requests/:id" element={<RequestDetailPage />} />
                      <Route path="/approvals" element={<MyApprovalsPage />} />
                      <Route path="/workflows" element={<WorkflowsPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;