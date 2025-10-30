import { LogOut, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useLocation, Link } from 'react-router-dom';
import { getInitials } from '../utils/format';

export default function Header() {
  const { user, setUser } = useAppStore();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
  };

  // Generate breadcrumbs from path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => ({
    name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
    path: '/' + pathSegments.slice(0, index + 1).join('/'),
  }));

  return (
    <header className="header">
      <div className="header-content">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <span>Email Approval</span>
          {breadcrumbs.map((crumb) => (
            <div key={crumb.path} className="flex items-center">
              <ChevronRight className="breadcrumb-separator" />
              <Link to={crumb.path} className="breadcrumb-link">
                {crumb.name}
              </Link>
            </div>
          ))}
        </div>
        
        {/* User Menu */}
        <div className="user-menu">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name}
              className="user-avatar"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'user-avatar';
                  fallback.textContent = getInitials(user?.name || '');
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <div className="user-avatar">
              {getInitials(user?.name || '')}
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="sidebar-button"
            title="Logout"
          >
            <LogOut className="sidebar-nav-icon" />
          </button>
        </div>
      </div>
    </header>
  );
}