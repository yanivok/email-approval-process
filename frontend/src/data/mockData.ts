import type { User, ApprovalRequest, ApprovalWorkflow } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'admin@company.com',
    name: 'Admin User',
    avatar_url: undefined,
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
    avatar_url: undefined,
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
    avatar_url: undefined,
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
    avatar_url: undefined,
    role: 'user',
    is_active: true,
    last_login_at: '2024-01-15T11:20:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T11:20:00Z',
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

// Simplified mock data - only what's needed for the 3 screens
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
    },
    due_date: '2024-01-22T00:00:00Z',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
    steps: [],
    comments: [],
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
    },
    due_date: '2024-01-29T00:00:00Z',
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T09:00:00Z',
    steps: [],
    comments: [],
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
    },
    due_date: '2024-01-20T00:00:00Z',
    completed_at: '2024-01-12T16:20:00Z',
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-12T16:20:00Z',
    steps: [],
    comments: [],
  },
];
