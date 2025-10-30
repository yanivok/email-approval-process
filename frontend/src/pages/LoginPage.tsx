import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { mockUsers } from '../data/mockData';

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const { setUser } = useAppStore();

  const handleLogin = () => {
    if (selectedUser) {
      const user = mockUsers.find(u => u.id === selectedUser);
      if (user) {
        setUser(user);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Email Approval Workflow System
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div>
            <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
              Select a user to login
            </label>
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Choose a user...</option>
              {mockUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email}) - {user.role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={handleLogin}
              disabled={!selectedUser}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign in
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="text-sm text-gray-600">
            <p className="font-medium">Demo Users:</p>
            <ul className="mt-2 space-y-1">
              <li>• Admin User - Full access</li>
              <li>• Manager User - Can approve requests</li>
              <li>• John Doe - Regular user</li>
              <li>• Jane Smith - Regular user</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
