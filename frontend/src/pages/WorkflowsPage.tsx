import { mockWorkflows } from '../data/mockData';

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
        <p className="text-gray-600">Manage approval workflow templates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWorkflows.map((workflow) => (
          <div key={workflow.id} className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{workflow.name}</h3>
            <p className="text-gray-600 mb-4">{workflow.description}</p>
            <div className="flex items-center justify-between">
              <span className={`badge ${workflow.is_active ? 'badge-success' : 'badge-secondary'}`}>
                {workflow.is_active ? 'Active' : 'Inactive'}
              </span>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
