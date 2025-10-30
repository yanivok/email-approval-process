import { NavLink } from 'react-router-dom';
import { 
  FileText, 
  Workflow
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useAppStore } from '../store/useAppStore';
import { getInitials } from '../utils/format';

const navigation = [
  { name: 'Requests', href: '/requests', icon: FileText },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
];

export default function Sidebar() {
  const { user } = useAppStore();

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-box">
          <span className="sidebar-logo-text">h</span>
        </div>
      </div>

      {/* Navigation Icons */}
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {navigation.map((item) => (
            <li key={item.name} className="sidebar-nav-item">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn('sidebar-nav-link', isActive && 'active')
                }
              >
                <item.icon className="sidebar-nav-icon" />
                <span className="sidebar-nav-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="sidebar-profile">
        <div className="sidebar-profile-avatar">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name}
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('span');
                  fallback.textContent = getInitials(user?.name || '');
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <span>{getInitials(user?.name || '')}</span>
          )}
        </div>
      </div>
    </div>
  );
}