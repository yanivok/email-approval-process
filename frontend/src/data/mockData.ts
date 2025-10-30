import type { User, ApprovalRequest, ApprovalWorkflow, ApprovalStep, Approver, Comment, DashboardStats } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'admin@company.com',
    name: 'Admin User',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    role: 'admin',
    is_active: true,
    last_login_at: '2024-01-15T10:30:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    email: 'manager@company.com',
    name: 'Manager User',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    role: 'manager',
    is_active: true,
    last_login_at: '2024-01-15T09:15:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T09:15:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    email: 'john.doe@company.com',
    name: 'John Doe',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    role: 'user',
    is_active: true,
    last_login_at: '2024-01-15T08:45:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T08:45:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    email: 'jane.smith@company.com',
    name: 'Jane Smith',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    role: 'user',
    is_active: true,
    last_login_at: '2024-01-15T11:20:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T11:20:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    email: 'approver1@company.com',
    name: 'Approver One',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    role: 'user',
    is_active: true,
    last_login_at: '2024-01-15T07:30:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T07:30:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    email: 'approver2@company.com',
    name: 'Approver Two',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    role: 'user',
    is_active: true,
    last_login_at: '2024-01-15T06:45:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T06:45:00Z',
  },
];

// Mock Workflows
export const mockWorkflows: ApprovalWorkflow[] = [
  {
    id: '660e8400-e29b-41d4-a716-446655440001',
    name: 'Expense Approval',
    description: 'Standard expense approval workflow for purchases under $1000',
    conditions: {
      max_amount: 1000,
      categories: ['travel', 'meals', 'office_supplies']
    },
    routing_rules: {
      steps: [
        {
          name: 'Manager Approval',
          approver_type: 'role',
          approver_config: { role: 'manager' },
          required_approvals: 1,
          parallel_execution: false
        },
        {
          name: 'Finance Review',
          approver_type: 'user',
          approver_config: { user_ids: ['550e8400-e29b-41d4-a716-446655440005'] },
          required_approvals: 1,
          parallel_execution: false
        }
      ]
    },
    is_active: true,
    created_by: '550e8400-e29b-41d4-a716-446655440001',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440002',
    name: 'High Value Purchase',
    description: 'High value purchase approval workflow for purchases over $1000',
    conditions: {
      min_amount: 1000,
      categories: ['equipment', 'software', 'services']
    },
    routing_rules: {
      steps: [
        {
          name: 'Manager Approval',
          approver_type: 'role',
          approver_config: { role: 'manager' },
          required_approvals: 1,
          parallel_execution: false
        },
        {
          name: 'Finance Team',
          approver_type: 'user',
          approver_config: { user_ids: ['550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440006'] },
          required_approvals: 2,
          parallel_execution: true
        },
        {
          name: 'Executive Approval',
          approver_type: 'role',
          approver_config: { role: 'admin' },
          required_approvals: 1,
          parallel_execution: false
        }
      ]
    },
    is_active: true,
    created_by: '550e8400-e29b-41d4-a716-446655440001',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440003',
    name: 'Time Off Request',
    description: 'Employee time off approval workflow',
    conditions: {
      categories: ['vacation', 'sick_leave', 'personal_time']
    },
    routing_rules: {
      steps: [
        {
          name: 'Manager Approval',
          approver_type: 'role',
          approver_config: { role: 'manager' },
          required_approvals: 1,
          parallel_execution: false
        }
      ]
    },
    is_active: true,
    created_by: '550e8400-e29b-41d4-a716-446655440001',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'aa0e8400-e29b-41d4-a716-446655440001',
    request_id: '770e8400-e29b-41d4-a716-446655440001',
    user_id: '550e8400-e29b-41d4-a716-446655440003',
    user: mockUsers[2],
    content: 'This is urgent for the upcoming project deadline.',
    is_internal: false,
    created_at: '2024-01-15T08:30:00Z',
    updated_at: '2024-01-15T08:30:00Z',
  },
  {
    id: 'aa0e8400-e29b-41d4-a716-446655440002',
    request_id: '770e8400-e29b-41d4-a716-446655440002',
    user_id: '550e8400-e29b-41d4-a716-446655440004',
    user: mockUsers[3],
    content: 'Need these laptops for the new development team starting next month.',
    is_internal: false,
    created_at: '2024-01-15T09:15:00Z',
    updated_at: '2024-01-15T09:15:00Z',
  },
  {
    id: 'aa0e8400-e29b-41d4-a716-446655440003',
    request_id: '770e8400-e29b-41d4-a716-446655440001',
    user_id: '550e8400-e29b-41d4-a716-446655440002',
    user: mockUsers[1],
    content: 'Approved - within budget and necessary for project completion.',
    is_internal: false,
    created_at: '2024-01-15T10:45:00Z',
    updated_at: '2024-01-15T10:45:00Z',
  },
];

// Mock Approval Steps
export const mockSteps: ApprovalStep[] = [
  {
    id: '880e8400-e29b-41d4-a716-446655440001',
    request_id: '770e8400-e29b-41d4-a716-446655440001',
    step_order: 1,
    step_name: 'Manager Approval',
    approver_type: 'role',
    approver_config: { role: 'manager' },
    required_approvals: 1,
    parallel_execution: false,
    status: 'approved',
    started_at: '2024-01-15T08:30:00Z',
    completed_at: '2024-01-15T10:45:00Z',
    created_at: '2024-01-15T08:30:00Z',
    updated_at: '2024-01-15T10:45:00Z',
  },
  {
    id: '880e8400-e29b-41d4-a716-446655440002',
    request_id: '770e8400-e29b-41d4-a716-446655440001',
    step_order: 2,
    step_name: 'Finance Review',
    approver_type: 'user',
    approver_config: { user_ids: ['550e8400-e29b-41d4-a716-446655440005'] },
    required_approvals: 1,
    parallel_execution: false,
    status: 'pending',
    started_at: '2024-01-15T10:45:00Z',
    created_at: '2024-01-15T10:45:00Z',
    updated_at: '2024-01-15T10:45:00Z',
  },
  {
    id: '880e8400-e29b-41d4-a716-446655440003',
    request_id: '770e8400-e29b-41d4-a716-446655440002',
    step_order: 1,
    step_name: 'Manager Approval',
    approver_type: 'role',
    approver_config: { role: 'manager' },
    required_approvals: 1,
    parallel_execution: false,
    status: 'pending',
    started_at: '2024-01-15T09:15:00Z',
    created_at: '2024-01-15T09:15:00Z',
    updated_at: '2024-01-15T09:15:00Z',
  },
  {
    id: '880e8400-e29b-41d4-a716-446655440004',
    request_id: '770e8400-e29b-41d4-a716-446655440002',
    step_order: 2,
    step_name: 'Finance Team',
    approver_type: 'user',
    approver_config: { user_ids: ['550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440006'] },
    required_approvals: 2,
    parallel_execution: true,
    status: 'pending',
    started_at: '2024-01-15T09:15:00Z',
    created_at: '2024-01-15T09:15:00Z',
    updated_at: '2024-01-15T09:15:00Z',
  },
  {
    id: '880e8400-e29b-41d4-a716-446655440005',
    request_id: '770e8400-e29b-41d4-a716-446655440002',
    step_order: 3,
    step_name: 'Executive Approval',
    approver_type: 'role',
    approver_config: { role: 'admin' },
    required_approvals: 1,
    parallel_execution: false,
    status: 'pending',
    created_at: '2024-01-15T09:15:00Z',
    updated_at: '2024-01-15T09:15:00Z',
  },
];

// Mock Approvers
export const mockApprovers: Approver[] = [
  {
    id: '990e8400-e29b-41d4-a716-446655440001',
    step_id: '880e8400-e29b-41d4-a716-446655440001',
    user_id: '550e8400-e29b-41d4-a716-446655440002',
    user: mockUsers[1],
    status: 'approved',
    comments: 'Approved - within budget and necessary for project completion.',
    decision_reason: 'Budget approved',
    responded_at: '2024-01-15T10:45:00Z',
    created_at: '2024-01-15T08:30:00Z',
    updated_at: '2024-01-15T10:45:00Z',
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440002',
    step_id: '880e8400-e29b-41d4-a716-446655440002',
    user_id: '550e8400-e29b-41d4-a716-446655440005',
    user: mockUsers[4],
    status: 'pending',
    created_at: '2024-01-15T10:45:00Z',
    updated_at: '2024-01-15T10:45:00Z',
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440003',
    step_id: '880e8400-e29b-41d4-a716-446655440003',
    user_id: '550e8400-e29b-41d4-a716-446655440002',
    user: mockUsers[1],
    status: 'pending',
    created_at: '2024-01-15T09:15:00Z',
    updated_at: '2024-01-15T09:15:00Z',
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440004',
    step_id: '880e8400-e29b-41d4-a716-446655440004',
    user_id: '550e8400-e29b-41d4-a716-446655440005',
    user: mockUsers[4],
    status: 'pending',
    created_at: '2024-01-15T09:15:00Z',
    updated_at: '2024-01-15T09:15:00Z',
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440005',
    step_id: '880e8400-e29b-41d4-a716-446655440004',
    user_id: '550e8400-e29b-41d4-a716-446655440006',
    user: mockUsers[5],
    status: 'pending',
    created_at: '2024-01-15T09:15:00Z',
    updated_at: '2024-01-15T09:15:00Z',
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440006',
    step_id: '880e8400-e29b-41d4-a716-446655440005',
    user_id: '550e8400-e29b-41d4-a716-446655440001',
    user: mockUsers[0],
    status: 'pending',
    created_at: '2024-01-15T09:15:00Z',
    updated_at: '2024-01-15T09:15:00Z',
  },
];

// Mock Approval Requests
export const mockRequests: ApprovalRequest[] = [
  {
    id: '770e8400-e29b-41d4-a716-446655440001',
    title: 'Office Supplies Purchase',
    description: 'Need to purchase office supplies for Q1 including notebooks, pens, and printer paper.',
    requester_id: '550e8400-e29b-41d4-a716-446655440003',
    requester: mockUsers[2],
    workflow_id: '660e8400-e29b-41d4-a716-446655440001',
    workflow: mockWorkflows[0],
    status: 'pending',
    priority: 2,
    metadata: {
      amount: 250,
      category: 'office_supplies',
      vendor: 'Office Depot',
      items: ['Notebooks', 'Pens', 'Printer Paper', 'Staples']
    },
    due_date: '2024-01-22T00:00:00Z',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T10:45:00Z',
    steps: mockSteps.filter(step => step.request_id === '770e8400-e29b-41d4-a716-446655440001'),
    comments: mockComments.filter(comment => comment.request_id === '770e8400-e29b-41d4-a716-446655440001'),
  },
  {
    id: '770e8400-e29b-41d4-a716-446655440002',
    title: 'Laptop Purchase',
    description: 'Need new laptops for development team - 5 MacBook Pro M3 models.',
    requester_id: '550e8400-e29b-41d4-a716-446655440004',
    requester: mockUsers[3],
    workflow_id: '660e8400-e29b-41d4-a716-446655440002',
    workflow: mockWorkflows[1],
    status: 'pending',
    priority: 3,
    metadata: {
      amount: 12500,
      category: 'equipment',
      vendor: 'Apple',
      quantity: 5,
      model: 'MacBook Pro M3',
      specifications: ['16GB RAM', '512GB SSD', '14-inch display']
    },
    due_date: '2024-01-29T00:00:00Z',
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T09:15:00Z',
    steps: mockSteps.filter(step => step.request_id === '770e8400-e29b-41d4-a716-446655440002'),
    comments: mockComments.filter(comment => comment.request_id === '770e8400-e29b-41d4-a716-446655440002'),
  },
  {
    id: '770e8400-e29b-41d4-a716-446655440003',
    title: 'Vacation Request',
    description: 'Annual vacation for 2 weeks in March',
    requester_id: '550e8400-e29b-41d4-a716-446655440003',
    requester: mockUsers[2],
    workflow_id: '660e8400-e29b-41d4-a716-446655440003',
    workflow: mockWorkflows[2],
    status: 'approved',
    priority: 1,
    metadata: {
      start_date: '2024-03-15',
      end_date: '2024-03-29',
      days: 10,
      type: 'vacation'
    },
    due_date: '2024-03-01T00:00:00Z',
    completed_at: '2024-01-10T14:30:00Z',
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-01-10T14:30:00Z',
    steps: [],
    comments: [],
  },
  {
    id: '770e8400-e29b-41d4-a716-446655440004',
    title: 'Software License Renewal',
    description: 'Renewal of Adobe Creative Suite licenses for design team',
    requester_id: '550e8400-e29b-41d4-a716-446655440004',
    requester: mockUsers[3],
    workflow_id: '660e8400-e29b-41d4-a716-446655440001',
    workflow: mockWorkflows[0],
    status: 'rejected',
    priority: 2,
    metadata: {
      amount: 2400,
      category: 'software',
      vendor: 'Adobe',
      licenses: 12,
      renewal_period: 'annual'
    },
    due_date: '2024-01-20T00:00:00Z',
    completed_at: '2024-01-12T16:20:00Z',
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-12T16:20:00Z',
    steps: [],
    comments: [],
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  total_requests: 24,
  pending_requests: 8,
  approved_requests: 12,
  rejected_requests: 4,
  my_pending_approvals: 3,
  overdue_requests: 1,
};

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get request by ID
export const getRequestById = (id: string): ApprovalRequest | undefined => {
  return mockRequests.find(request => request.id === id);
};

// Helper function to get workflow by ID
export const getWorkflowById = (id: string): ApprovalWorkflow | undefined => {
  return mockWorkflows.find(workflow => workflow.id === id);
};

// Helper function to get requests by status
export const getRequestsByStatus = (status: string): ApprovalRequest[] => {
  return mockRequests.filter(request => request.status === status);
};

// Helper function to get requests by requester
export const getRequestsByRequester = (requesterId: string): ApprovalRequest[] => {
  return mockRequests.filter(request => request.requester_id === requesterId);
};

// Helper function to get pending approvals for user
export const getPendingApprovalsForUser = (userId: string): ApprovalRequest[] => {
  const userApprovals = mockApprovers.filter(approver => 
    approver.user_id === userId && approver.status === 'pending'
  );
  
  return userApprovals.map(approver => {
    const step = mockSteps.find(step => step.id === approver.step_id);
    return step ? getRequestById(step.request_id) : null;
  }).filter(Boolean) as ApprovalRequest[];
};
