import { useDashboardStats, useRequests } from '../store/useAppStore';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp 
} from 'lucide-react';
import { formatDate, formatRelativeTime } from '../utils/format';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

export default function DashboardPage() {
  const stats = useDashboardStats();
  const requests = useRequests();

  const recentRequests = requests.slice(0, 5);

  const statCards = [
    {
      title: 'Total Requests',
      value: stats.total_requests,
      icon: FileText,
      highlighted: false,
    },
    {
      title: 'Total Approved',
      value: stats.approved_requests,
      icon: CheckCircle,
      highlighted: true,
    },
    {
      title: 'Pending Requests',
      value: stats.pending_requests,
      icon: Clock,
      highlighted: true,
    },
    {
      title: 'Overdue Requests',
      value: stats.overdue_requests,
      icon: AlertTriangle,
      highlighted: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="page-title">Approval Requests Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 grid-cols-md-2 grid-cols-lg-4 gap-4">
        {statCards.map((stat) => (
          <div 
            key={stat.title} 
            className={`stat-card ${stat.highlighted ? 'highlighted' : ''}`}
          >
            <div className="stat-card-content">
              <div>
                <p className="stat-title">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              <stat.icon className="stat-icon" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests */}
      <div className="card-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Requests</h2>
          <a href="/requests" className="link">
            View all
          </a>
        </div>
        
        <div className="space-y-3">
          {recentRequests.map((request) => (
            <div
              key={request.id}
              className="card-white"
              style={{ padding: '1rem', marginBottom: '0.75rem' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h3 className="text-sm font-medium">{request.title}</h3>
                    <StatusBadge status={request.status} />
                    <PriorityBadge priority={request.priority} />
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gray-600)', marginTop: '0.25rem' }}>
                    by {request.requester.name} • {formatRelativeTime(request.created_at)}
                  </p>
                  {request.description && (
                    <p className="text-sm" style={{ color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                      {request.description.substring(0, 100)}
                      {request.description.length > 100 ? '...' : ''}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
                    {formatDate(request.created_at)}
                  </p>
                  {request.due_date && (
                    <p className="text-xs" style={{ color: 'var(--gray-400)' }}>
                      Due: {formatDate(request.due_date)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 grid-cols-md-2 gap-6">
        <div className="card-white">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a
              href="/requests/new"
              className="flex items-center p-4"
              style={{ 
                textDecoration: 'none', 
                display: 'block', 
                width: '100%', 
                textAlign: 'left',
                border: '1px solid var(--gray-300)',
                borderRadius: '8px'
              }}
            >
              <div className="flex items-center">
                <FileText className="stat-icon" style={{ color: 'var(--teal-600)', marginRight: '0.75rem' }} />
                <div>
                  <p className="font-medium">Create New Request</p>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Start a new approval request</p>
                </div>
              </div>
            </a>
            <a
              href="/approvals"
              className="flex items-center p-4"
              style={{ 
                textDecoration: 'none', 
                display: 'block', 
                width: '100%', 
                textAlign: 'left',
                border: '1px solid var(--gray-300)',
                borderRadius: '8px'
              }}
            >
              <div className="flex items-center">
                <CheckCircle className="stat-icon" style={{ color: 'var(--green-600)', marginRight: '0.75rem' }} />
                <div>
                  <p className="font-medium">Review Approvals</p>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Check pending approvals</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="card-white">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--gray-600)' }}>API Status</span>
              <span className="badge badge-success">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--gray-600)' }}>Database</span>
              <span className="badge badge-success">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--gray-600)' }}>Email Service</span>
              <span className="badge badge-success">Active</span>
            </div>
            <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--teal-500)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
              <span className="text-sm" style={{ color: 'var(--gray-600)' }}>Slack Integration</span>
              <span className="badge badge-warning">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}