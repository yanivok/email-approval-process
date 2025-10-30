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
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--gray-50)', padding: '3rem 1rem' }}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold" style={{ marginTop: '1.5rem' }}>
            Sign in to your account
          </h2>
          <p className="text-center text-sm" style={{ marginTop: '0.5rem', color: 'var(--gray-600)' }}>
            Email Approval Workflow System
          </p>
        </div>
        
        <div style={{ marginTop: '2rem' }} className="space-y-6">
          <div>
            <label htmlFor="user-select" className="label">
              Select a user to login
            </label>
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="input"
              style={{ marginTop: '0.25rem' }}
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
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Sign in
            </button>
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem' }}>
          <div className="text-sm" style={{ color: 'var(--gray-600)' }}>
            <p className="font-medium">Demo Users:</p>
            <ul style={{ marginTop: '0.5rem' }} className="space-y-3">
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