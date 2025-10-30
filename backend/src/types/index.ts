// Database entity types
export interface User {
  id: string;
  email: string;
  name: string;
  oauth_provider: 'google' | 'microsoft';
  oauth_id: string;
  role: 'admin' | 'manager' | 'user';
  avatar_url?: string;
  is_active: boolean;
  last_login_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ApprovalWorkflow {
  id: string;
  name: string;
  description?: string;
  conditions?: Record<string, any>;
  routing_rules: Record<string, any>;
  is_active: boolean;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  description?: string;
  requester_id: string;
  workflow_id?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'cancelled' | 'expired';
  priority: number;
  metadata?: Record<string, any>;
  due_date?: Date;
  completed_at?: Date;
  created_at: Date;
  updated_at: Date;
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
  started_at?: Date;
  completed_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Approver {
  id: string;
  step_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'skipped';
  comments?: string;
  decision_reason?: string;
  responded_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: string;
  request_id: string;
  step_id?: string;
  user_id: string;
  content: string;
  is_internal: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AuditLog {
  id: string;
  request_id?: string;
  user_id?: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_state?: Record<string, any>;
  new_state?: Record<string, any>;
  metadata?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
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
  sent_at?: Date;
  read_at?: Date;
  error_message?: string;
  created_at: Date;
  updated_at: Date;
}

export interface EmailThread {
  id: string;
  request_id: string;
  gmail_thread_id: string;
  gmail_message_id: string;
  subject: string;
  from_email: string;
  to_email: string;
  sent_at: Date;
  received_at?: Date;
  is_reply: boolean;
  reply_content?: string;
  created_at: Date;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  email_notifications: boolean;
  slack_notifications: boolean;
  in_app_notifications: boolean;
  timezone: string;
  language: string;
  created_at: Date;
  updated_at: Date;
}

// API Request/Response types
export interface CreateUserRequest {
  email: string;
  name: string;
  oauth_provider: 'google' | 'microsoft';
  oauth_id: string;
  role?: 'admin' | 'manager' | 'user';
  avatar_url?: string;
}

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

// Service types
export interface DatabaseService {
  query<T = any>(text: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }>;
  getClient(): Promise<any>;
}

export interface EmailService {
  sendApprovalRequest(request: ApprovalRequest, approvers: User[]): Promise<void>;
  sendNotification(notification: Notification): Promise<void>;
  parseEmailReply(emailContent: string): Promise<{ action: string; comments?: string } | null>;
}

export interface SlackService {
  sendNotification(notification: Notification): Promise<void>;
  sendApprovalRequest(request: ApprovalRequest, approvers: User[]): Promise<void>;
}

export interface WorkflowEngine {
  executeWorkflow(request: ApprovalRequest, workflow: ApprovalWorkflow): Promise<void>;
  processApprovalAction(stepId: string, approverId: string, action: string): Promise<void>;
  checkWorkflowCompletion(requestId: string): Promise<void>;
}

// Error types
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}
