import { getPendingApprovalsForUser } from '../data/mockData';
import { useUser } from '../store/useAppStore';
import { formatDate, formatRelativeTime } from '../utils/format';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

export default function MyApprovalsPage() {
  const user = useUser();
  const pendingApprovals = user ? getPendingApprovalsForUser(user.id) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Approvals</h1>
        <p className="text-gray-600">Requests waiting for your approval</p>
      </div>

      <div className="card">
        {pendingApprovals.length > 0 ? (
          <div className="space-y-4">
            {pendingApprovals.map((request) => (
              <div
                key={request.id}
                className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{request.title}</h3>
                      <StatusBadge status={request.status} />
                      <PriorityBadge priority={request.priority} />
                    </div>
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>by {request.requester.name}</span>
                      <span>•</span>
                      <span>{formatRelativeTime(request.created_at)}</span>
                      {request.due_date && (
                        <>
                          <span>•</span>
                          <span>Due: {formatDate(request.due_date)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="btn-success">
                      Approve
                    </button>
                    <button className="btn-error">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No pending approvals</h3>
            <p className="text-gray-500">You're all caught up! No requests are waiting for your approval.</p>
          </div>
        )}
      </div>
    </div>
  );
}
