import { Bell, Search, LogOut, ChevronRight } from 'lucide-react';
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
        
        {/* Right side actions */}
        <div className="header-actions">
          {/* Action buttons */}
          <button className="header-button">
            Give Us Feedback
          </button>
          <button className="header-button">
            Export
          </button>
          <button className="header-button">
            Save View
            <ChevronRight className="header-button-icon" />
          </button>
          
          {/* Notifications */}
          <button className="notification-button">
            <Bell className="sidebar-nav-icon" />
            <span className="notification-badge">3</span>
          </button>
          
          {/* User Menu */}
          <div className="user-menu">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                className="user-avatar"
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
      </div>
    </header>
  );
}