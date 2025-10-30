import { useState } from 'react';
import { useRequests, useFilters, useAppStore } from '../store/useAppStore';
import { formatDate, formatRelativeTime, truncateText } from '../utils/format';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import CreateRequestModal from '../components/CreateRequestModal';
import { Search, Filter, Plus, FileText } from 'lucide-react';

export default function RequestsPage() {
  const requests = useRequests();
  const filters = useFilters();
  const setFilters = useAppStore(state => state.setFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRequests = requests.filter(request =>
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requester.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">All Requests</h1>
            <p className="page-subtitle">Manage and track all approval requests</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
            New Request
          </button>
        </div>

        {/* Filters */}
        <div className="card-white" style={{ padding: '1rem' }}>
          <div className="flex" style={{ gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
            <div className="flex-1 relative">
              <Search style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                color: 'var(--gray-400)'
              }} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            <button className="btn btn-outline">
              <Filter style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
              Filters
            </button>
          </div>

          <div className="grid grid-cols-1 grid-cols-md-4 gap-4">
            <div>
              <label className="label">Status</label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input"
              >
                <option value="">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="label">Priority</label>
              <select
                value={filters.priority || ''}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="input"
              >
                <option value="">All Priorities</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
                <option value="4">Urgent</option>
              </select>
            </div>

            <div>
              <label className="label">Date From</label>
              <input
                type="date"
                value={filters.date_from || ''}
                onChange={(e) => handleFilterChange('date_from', e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label className="label">Date To</label>
              <input
                type="date"
                value={filters.date_to || ''}
                onChange={(e) => handleFilterChange('date_to', e.target.value)}
                className="input"
              />
            </div>
          </div>

          {(filters.status || filters.priority || filters.date_from || filters.date_to) && (
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                {filteredRequests.length} request(s) found
              </p>
              <button
                onClick={clearFilters}
                className="link"
                style={{ fontSize: '0.875rem' }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Requests List */}
        <div className="card-white" style={{ overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Request</th>
                  <th>Requester</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <div>
                        <div className="text-sm font-medium">{request.title}</div>
                        {request.description && (
                          <div className="text-sm" style={{ color: 'var(--gray-500)' }}>
                            {truncateText(request.description, 60)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        {request.requester.avatar_url ? (
                          <img
                            src={request.requester.avatar_url}
                            alt={request.requester.name}
                            style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '0.75rem' }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = 'user-avatar';
                                fallback.style.width = '32px';
                                fallback.style.height = '32px';
                                fallback.style.marginRight = '0.75rem';
                                fallback.textContent = request.requester.name.charAt(0).toUpperCase();
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        ) : (
                          <div className="user-avatar" style={{ marginRight: '0.75rem' }}>
                            {request.requester.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium">{request.requester.name}</div>
                          <div className="text-sm" style={{ color: 'var(--gray-500)' }}>
                            {request.requester.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={request.status} />
                    </td>
                    <td>
                      <PriorityBadge priority={request.priority} />
                    </td>
                    <td>
                      <div className="text-sm" style={{ color: 'var(--gray-500)' }}>
                        <div>{formatDate(request.created_at)}</div>
                        <div className="text-xs" style={{ color: 'var(--gray-400)' }}>
                          {formatRelativeTime(request.created_at)}
                        </div>
                      </div>
                    </td>
                    <td className="text-sm" style={{ color: 'var(--gray-500)' }}>
                      {request.due_date ? formatDate(request.due_date) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center" style={{ padding: '3rem' }}>
              <FileText style={{ width: '48px', height: '48px', margin: '0 auto 0.5rem', color: 'var(--gray-400)' }} />
              <h3 className="text-sm font-medium">No requests found</h3>
              <p className="text-sm" style={{ color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                {searchTerm || Object.keys(filters).length > 0
                  ? 'Try adjusting your search or filters.'
                  : 'Get started by creating a new request.'}
              </p>
              {!searchTerm && Object.keys(filters).length === 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary"
                  >
                    <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                    New Request
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <CreateRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}