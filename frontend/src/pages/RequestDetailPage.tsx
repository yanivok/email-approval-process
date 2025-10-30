import { useParams } from 'react-router-dom';
import { getRequestById } from '../data/mockData';
import { formatDate, formatDateTime } from '../utils/format';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const request = id ? getRequestById(id) : null;

  if (!request) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Request not found</h3>
        <p className="text-gray-500">The request you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{request.title}</h1>
          <p className="text-gray-600">Request ID: {request.id}</p>
        </div>
        <div className="flex items-center space-x-3">
          <StatusBadge status={request.status} />
          <PriorityBadge priority={request.priority} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700">
              {request.description || 'No description provided.'}
            </p>
          </div>

          {/* Approval Steps */}
          {request.steps && request.steps.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Approval Steps</h2>
              <div className="space-y-4">
                {request.steps.map((step) => (
                  <div key={step.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{step.step_name}</h3>
                      <StatusBadge status={step.status} />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Step {step.step_order} of {request.steps?.length}</p>
                      <p>Required approvals: {step.required_approvals}</p>
                      {step.started_at && (
                        <p>Started: {formatDateTime(step.started_at)}</p>
                      )}
                      {step.completed_at && (
                        <p>Completed: {formatDateTime(step.completed_at)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          {request.comments && request.comments.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Comments</h2>
              <div className="space-y-4">
                {request.comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-gray-200 pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{comment.user.name}</span>
                      <span className="text-sm text-gray-500">
                        {formatDateTime(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Request Details */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Requester</dt>
                <dd className="text-sm text-gray-900">{request.requester.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Created</dt>
                <dd className="text-sm text-gray-900">{formatDateTime(request.created_at)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="text-sm text-gray-900">{formatDateTime(request.updated_at)}</dd>
              </div>
              {request.due_date && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                  <dd className="text-sm text-gray-900">{formatDate(request.due_date)}</dd>
                </div>
              )}
              {request.completed_at && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Completed</dt>
                  <dd className="text-sm text-gray-900">{formatDateTime(request.completed_at)}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Workflow Info */}
          {request.workflow && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Workflow</h2>
              <div>
                <h3 className="font-medium text-gray-900">{request.workflow.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{request.workflow.description}</p>
              </div>
            </div>
          )}

          {/* Metadata */}
          {request.metadata && Object.keys(request.metadata).length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Info</h2>
              <dl className="space-y-2">
                {Object.entries(request.metadata).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace('_', ' ')}
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
