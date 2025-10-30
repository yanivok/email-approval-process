// Frontend types for the email approval workflow system

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'admin' | 'manager' | 'user';
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  description?: string;
  requester_id: string;
  requester: User;
  workflow_id?: string;
  workflow?: ApprovalWorkflow;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'cancelled' | 'expired';
  priority: number;
  metadata?: Record<string, any>;
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  steps?: ApprovalStep[];
  comments?: Comment[];
}

export interface ApprovalWorkflow {
  id: string;
  name: string;
  description?: string;
  conditions?: Record<string, any>;
  routing_rules: Record<string, any>;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ApprovalStep {
  id: string;
  request_id: string;
  step_order: number;
  step_name: string;
  approver_type: 'user' | 'role' | 'group';
  approver_config: Record<string, any>;
  required_approvals: number;
  parallel_execution: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'skipped';
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  approvers?: Approver[];
}

export interface Approver {
  id: string;
  step_id: string;
  user_id: string;
  user: User;
  status: 'pending' | 'approved' | 'rejected' | 'skipped';
  comments?: string;
  decision_reason?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  request_id: string;
  step_id?: string;
  user_id: string;
  user: User;
  content: string;
  is_internal: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  request_id?: string;
  step_id?: string;
  channel: 'email' | 'slack' | 'in_app';
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'read';
  subject?: string;
  content: string;
  sent_at?: string;
  read_at?: string;
  created_at: string;
  updated_at: string;
}

// API Request/Response types
export interface CreateApprovalRequestRequest {
  title: string;
  description?: string;
  workflow_id?: string;
  priority?: number;
  metadata?: Record<string, any>;
  due_date?: string;
}

export interface UpdateApprovalRequestRequest {
  title?: string;
  description?: string;
  priority?: number;
  metadata?: Record<string, any>;
  due_date?: string;
}

export interface ApprovalActionRequest {
  action: 'approve' | 'reject';
  comments?: string;
  decision_reason?: string;
}

export interface CreateCommentRequest {
  content: string;
  is_internal?: boolean;
  step_id?: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// UI State types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RequestFilters {
  status?: string;
  priority?: number;
  requester_id?: string;
  workflow_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface DashboardStats {
  total_requests: number;
  pending_requests: number;
  approved_requests: number;
  rejected_requests: number;
  my_pending_approvals: number;
  overdue_requests: number;
}
