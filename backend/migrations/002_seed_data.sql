-- Seed data for development and testing
-- This migration adds initial data for testing the system

-- Insert sample users
INSERT INTO users (id, email, name, oauth_provider, oauth_id, role, is_active) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'admin@company.com', 'Admin User', 'google', 'google_123456789', 'admin', true),
    ('550e8400-e29b-41d4-a716-446655440002', 'manager@company.com', 'Manager User', 'google', 'google_987654321', 'manager', true),
    ('550e8400-e29b-41d4-a716-446655440003', 'user1@company.com', 'John Doe', 'google', 'google_111111111', 'user', true),
    ('550e8400-e29b-41d4-a716-446655440004', 'user2@company.com', 'Jane Smith', 'microsoft', 'microsoft_222222222', 'user', true),
    ('550e8400-e29b-41d4-a716-446655440005', 'approver1@company.com', 'Approver One', 'google', 'google_333333333', 'user', true),
    ('550e8400-e29b-41d4-a716-446655440006', 'approver2@company.com', 'Approver Two', 'google', 'google_444444444', 'user', true);

-- Insert user preferences
INSERT INTO user_preferences (user_id, email_notifications, slack_notifications, in_app_notifications, timezone, language) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', true, true, true, 'UTC', 'en'),
    ('550e8400-e29b-41d4-a716-446655440002', true, false, true, 'America/New_York', 'en'),
    ('550e8400-e29b-41d4-a716-446655440003', true, false, true, 'America/Los_Angeles', 'en'),
    ('550e8400-e29b-41d4-a716-446655440004', true, true, true, 'Europe/London', 'en'),
    ('550e8400-e29b-41d4-a716-446655440005', true, false, true, 'UTC', 'en'),
    ('550e8400-e29b-41d4-a716-446655440006', true, true, true, 'UTC', 'en');

-- Insert sample approval workflows
INSERT INTO approval_workflows (id, name, description, conditions, routing_rules, is_active, created_by) VALUES
    ('660e8400-e29b-41d4-a716-446655440001', 'Expense Approval', 'Standard expense approval workflow', 
     '{"max_amount": 1000, "categories": ["travel", "meals", "office_supplies"]}',
     '{"steps": [{"name": "Manager Approval", "approver_type": "role", "approver_config": {"role": "manager"}, "required_approvals": 1, "parallel_execution": false}, {"name": "Finance Review", "approver_type": "user", "approver_config": {"user_ids": ["550e8400-e29b-41d4-a716-446655440005"]}, "required_approvals": 1, "parallel_execution": false}]}',
     true, '550e8400-e29b-41d4-a716-446655440001'),
    
    ('660e8400-e29b-41d4-a716-446655440002', 'High Value Purchase', 'High value purchase approval workflow',
     '{"min_amount": 1000, "categories": ["equipment", "software", "services"]}',
     '{"steps": [{"name": "Manager Approval", "approver_type": "role", "approver_config": {"role": "manager"}, "required_approvals": 1, "parallel_execution": false}, {"name": "Finance Team", "approver_type": "user", "approver_config": {"user_ids": ["550e8400-e29b-41d4-a716-446655440005", "550e8400-e29b-41d4-a716-446655440006"]}, "required_approvals": 2, "parallel_execution": true}, {"name": "Executive Approval", "approver_type": "role", "approver_config": {"role": "admin"}, "required_approvals": 1, "parallel_execution": false}]}',
     true, '550e8400-e29b-41d4-a716-446655440001'),
    
    ('660e8400-e29b-41d4-a716-446655440003', 'Time Off Request', 'Employee time off approval workflow',
     '{"categories": ["vacation", "sick_leave", "personal_time"]}',
     '{"steps": [{"name": "Manager Approval", "approver_type": "role", "approver_config": {"role": "manager"}, "required_approvals": 1, "parallel_execution": false}]}',
     true, '550e8400-e29b-41d4-a716-446655440001');

-- Insert sample approval requests
INSERT INTO approval_requests (id, title, description, requester_id, workflow_id, status, priority, metadata, due_date) VALUES
    ('770e8400-e29b-41d4-a716-446655440001', 'Office Supplies Purchase', 'Need to purchase office supplies for Q1', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'pending', 2, '{"amount": 250, "category": "office_supplies", "vendor": "Office Depot"}', NOW() + INTERVAL '7 days'),
    
    ('770e8400-e29b-41d4-a716-446655440002', 'Laptop Purchase', 'Need new laptop for development team', '550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440002', 'pending', 3, '{"amount": 2500, "category": "equipment", "vendor": "Apple", "quantity": 5}', NOW() + INTERVAL '14 days'),
    
    ('770e8400-e29b-41d4-a716-446655440003', 'Vacation Request', 'Annual vacation for 2 weeks', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', 'approved', 1, '{"start_date": "2024-03-15", "end_date": "2024-03-29", "days": 10}', NOW() + INTERVAL '30 days');

-- Insert sample approval steps for the pending requests
INSERT INTO approval_steps (id, request_id, step_order, step_name, approver_type, approver_config, required_approvals, parallel_execution, status) VALUES
    -- Office Supplies Purchase steps
    ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 1, 'Manager Approval', 'role', '{"role": "manager"}', 1, false, 'pending'),
    ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', 2, 'Finance Review', 'user', '{"user_ids": ["550e8400-e29b-41d4-a716-446655440005"]}', 1, false, 'pending'),
    
    -- Laptop Purchase steps
    ('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440002', 1, 'Manager Approval', 'role', '{"role": "manager"}', 1, false, 'pending'),
    ('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440002', 2, 'Finance Team', 'user', '{"user_ids": ["550e8400-e29b-41d4-a716-446655440005", "550e8400-e29b-41d4-a716-446655440006"]}', 2, true, 'pending'),
    ('880e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440002', 3, 'Executive Approval', 'role', '{"role": "admin"}', 1, false, 'pending');

-- Insert sample approvers for the steps
INSERT INTO approvers (id, step_id, user_id, status) VALUES
    -- Office Supplies Purchase approvers
    ('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'pending'),
    ('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', 'pending'),
    
    -- Laptop Purchase approvers
    ('990e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'pending'),
    ('990e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', 'pending'),
    ('990e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440006', 'pending'),
    ('990e8400-e29b-41d4-a716-446655440006', '880e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'pending');

-- Insert sample comments
INSERT INTO comments (id, request_id, step_id, user_id, content, is_internal) VALUES
    ('aa0e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', NULL, '550e8400-e29b-41d4-a716-446655440003', 'This is urgent for the upcoming project deadline.', false),
    ('aa0e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', NULL, '550e8400-e29b-41d4-a716-446655440004', 'Need these laptops for the new development team starting next month.', false);

-- Insert sample audit logs
INSERT INTO audit_logs (id, request_id, user_id, action, entity_type, entity_id, old_state, new_state, metadata) VALUES
    ('bb0e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'created', 'request', '770e8400-e29b-41d4-a716-446655440001', NULL, '{"status": "draft", "title": "Office Supplies Purchase"}', '{"ip_address": "192.168.1.100"}'),
    ('bb0e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'submitted', 'request', '770e8400-e29b-41d4-a716-446655440001', '{"status": "draft"}', '{"status": "pending"}', '{"ip_address": "192.168.1.100"}'),
    ('bb0e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'created', 'request', '770e8400-e29b-41d4-a716-446655440002', NULL, '{"status": "draft", "title": "Laptop Purchase"}', '{"ip_address": "192.168.1.101"}'),
    ('bb0e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'submitted', 'request', '770e8400-e29b-41d4-a716-446655440002', '{"status": "draft"}', '{"status": "pending"}', '{"ip_address": "192.168.1.101"}');

-- Insert sample notifications
INSERT INTO notifications (id, user_id, request_id, step_id, channel, status, subject, content, sent_at) VALUES
    ('cc0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 'email', 'sent', 'New Approval Request: Office Supplies Purchase', 'You have a new approval request waiting for your review.', NOW() - INTERVAL '1 hour'),
    ('cc0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440003', 'email', 'sent', 'New Approval Request: Laptop Purchase', 'You have a new approval request waiting for your review.', NOW() - INTERVAL '30 minutes'),
    ('cc0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440002', 'email', 'pending', 'New Approval Request: Office Supplies Purchase', 'You have a new approval request waiting for your review.', NULL),
    ('cc0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440004', 'email', 'pending', 'New Approval Request: Laptop Purchase', 'You have a new approval request waiting for your review.', NULL),
    ('cc0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440004', 'email', 'pending', 'New Approval Request: Laptop Purchase', 'You have a new approval request waiting for your review.', NULL),
    ('cc0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440005', 'email', 'pending', 'New Approval Request: Laptop Purchase', 'You have a new approval request waiting for your review.', NULL);


