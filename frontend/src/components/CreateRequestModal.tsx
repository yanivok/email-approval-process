import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { mockWorkflows } from '../data/mockData';
import { X } from 'lucide-react';

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRequestModal({ isOpen, onClose }: CreateRequestModalProps) {
  const { createRequest, user } = useAppStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    workflow_id: '',
    priority: 2,
    due_date: '',
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        title: '',
        description: '',
        workflow_id: '',
        priority: 2,
        due_date: '',
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const newRequest = {
      title: formData.title,
      description: formData.description,
      requester_id: user.id,
      requester: user,
      workflow_id: formData.workflow_id || undefined,
      workflow: formData.workflow_id ? mockWorkflows.find(w => w.id === formData.workflow_id) : undefined,
      status: 'draft' as const,
      priority: formData.priority,
      metadata: {},
      due_date: formData.due_date || undefined,
    };

    createRequest(newRequest);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'priority' ? parseInt(value) : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="page-title" style={{ margin: 0 }}>Create New Request</h2>
          <button
            onClick={onClose}
            className="sidebar-button"
            style={{ padding: '0.5rem' }}
          >
            <X className="sidebar-nav-icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="label">
              Request Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input"
              placeholder="Enter a descriptive title for your request"
            />
          </div>

          <div>
            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input"
              style={{ minHeight: '100px', resize: 'vertical' }}
              placeholder="Provide additional details about your request"
            />
          </div>

          <div>
            <label htmlFor="workflow_id" className="label">
              Workflow
            </label>
            <select
              id="workflow_id"
              name="workflow_id"
              value={formData.workflow_id}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select a workflow (optional)</option>
              {mockWorkflows.map((workflow) => (
                <option key={workflow.id} value={workflow.id}>
                  {workflow.name} - {workflow.description}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 grid-cols-md-2 gap-4">
            <div>
              <label htmlFor="priority" className="label">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="input"
              >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
                <option value={4}>Urgent</option>
              </select>
            </div>

            <div>
              <label htmlFor="due_date" className="label">
                Due Date
              </label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          <div className="flex" style={{ gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
