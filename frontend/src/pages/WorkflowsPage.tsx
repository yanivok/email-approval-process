import { mockWorkflows } from '../data/mockData';

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Workflows</h1>
        <p className="page-subtitle">Manage approval workflow templates</p>
      </div>

      <div className="grid grid-cols-1 grid-cols-md-2 grid-cols-lg-3 gap-6">
        {mockWorkflows.map((workflow) => (
          <div key={workflow.id} className="card-white">
            <h3 className="text-lg font-semibold mb-4">{workflow.name}</h3>
            <p className="text-sm" style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>{workflow.description}</p>
            <div className="flex items-center justify-between">
              <span className={workflow.is_active ? 'badge badge-success' : 'badge badge-secondary'}>
                {workflow.is_active ? 'Active' : 'Inactive'}
              </span>
              <button className="link" style={{ fontSize: '0.875rem' }}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}