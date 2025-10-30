import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  CheckCircle, 
  Settings, 
  Workflow,
  BarChart3,
  Search,
  Bell
} from 'lucide-react';
import { cn } from '../utils/cn';

const navigation = [
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Requests', href: '/requests', icon: FileText },
  { name: 'Create Request', href: '/requests/new', icon: Plus },
  { name: 'My Approvals', href: '/approvals', icon: CheckCircle },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
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

      {/* Bottom Icons */}
      <div className="sidebar-bottom">
        <button className="sidebar-button">
          <Bell className="sidebar-nav-icon" />
        </button>
        <button className="sidebar-button">
          <Settings className="sidebar-nav-icon" />
        </button>
      </div>

      {/* User Profile */}
      <div className="sidebar-profile">
        <div className="sidebar-profile-avatar">
          <span>JD</span>
        </div>
      </div>
    </div>
  );
}