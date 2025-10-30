import { create } from 'zustand';
import type { User, ApprovalRequest, DashboardStats, RequestFilters } from '../types';
import { mockRequests, mockDashboardStats } from '../data/mockData';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Data state
  requests: ApprovalRequest[];
  filteredRequests: ApprovalRequest[];
  dashboardStats: DashboardStats;
  
  // Filters
  filters: RequestFilters;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setRequests: (requests: ApprovalRequest[]) => void;
  setFilters: (filters: RequestFilters) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  refreshData: () => void;
  
  // Request actions
  createRequest: (request: Omit<ApprovalRequest, 'id' | 'created_at' | 'updated_at'>) => void;
  updateRequest: (id: string, updates: Partial<ApprovalRequest>) => void;
  deleteRequest: (id: string) => void;
  
  // Approval actions
  approveRequest: (requestId: string, stepId: string, comments?: string) => void;
  rejectRequest: (requestId: string, stepId: string, reason: string, comments?: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  requests: mockRequests,
  filteredRequests: mockRequests,
  dashboardStats: mockDashboardStats,
  filters: {},
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  setRequests: (requests) => set({ requests, filteredRequests: requests }),
  
  setFilters: (filters) => {
    set({ filters });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { requests, filters } = get();
    let filtered = [...requests];
    
    if (filters.status) {
      filtered = filtered.filter(request => request.status === filters.status);
    }
    
    if (filters.priority) {
      filtered = filtered.filter(request => request.priority === filters.priority);
    }
    
    if (filters.requester_id) {
      filtered = filtered.filter(request => request.requester_id === filters.requester_id);
    }
    
    if (filters.workflow_id) {
      filtered = filtered.filter(request => request.workflow_id === filters.workflow_id);
    }
    
    if (filters.date_from) {
      filtered = filtered.filter(request => 
        new Date(request.created_at) >= new Date(filters.date_from!)
      );
    }
    
    if (filters.date_to) {
      filtered = filtered.filter(request => 
        new Date(request.created_at) <= new Date(filters.date_to!)
      );
    }
    
    set({ filteredRequests: filtered });
  },
  
  clearFilters: () => {
    set({ filters: {}, filteredRequests: get().requests });
  },
  
  refreshData: () => {
    // In a real app, this would fetch data from the API
    set({ 
      requests: mockRequests, 
      filteredRequests: mockRequests,
      dashboardStats: mockDashboardStats 
    });
  },
  
  // Request actions
  createRequest: (requestData) => {
    const newRequest: ApprovalRequest = {
      ...requestData,
      id: `req_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    set(state => ({
      requests: [newRequest, ...state.requests],
      filteredRequests: [newRequest, ...state.filteredRequests],
    }));
  },
  
  updateRequest: (id, updates) => {
    set(state => ({
      requests: state.requests.map(request =>
        request.id === id ? { ...request, ...updates, updated_at: new Date().toISOString() } : request
      ),
      filteredRequests: state.filteredRequests.map(request =>
        request.id === id ? { ...request, ...updates, updated_at: new Date().toISOString() } : request
      ),
    }));
  },
  
  deleteRequest: (id) => {
    set(state => ({
      requests: state.requests.filter(request => request.id !== id),
      filteredRequests: state.filteredRequests.filter(request => request.id !== id),
    }));
  },
  
  // Approval actions
  approveRequest: (requestId, stepId, comments) => {
    // In a real app, this would make an API call
    console.log('Approving request:', requestId, 'step:', stepId, 'comments:', comments);
    
    // Update the request status if it's the final step
    const request = get().requests.find(r => r.id === requestId);
    if (request) {
      const step = request.steps?.find(s => s.id === stepId);
      if (step) {
        // Update step status
        get().updateRequest(requestId, {
          steps: request.steps?.map(s =>
            s.id === stepId ? { ...s, status: 'approved', completed_at: new Date().toISOString() } : s
          )
        });
        
        // Check if all steps are completed
        const allStepsCompleted = request.steps?.every(s => 
          s.id === stepId || s.status === 'approved' || s.status === 'rejected'
        );
        
        if (allStepsCompleted) {
          get().updateRequest(requestId, { status: 'approved', completed_at: new Date().toISOString() });
        }
      }
    }
  },
  
  rejectRequest: (requestId, stepId, reason, comments) => {
    // In a real app, this would make an API call
    console.log('Rejecting request:', requestId, 'step:', stepId, 'reason:', reason, 'comments:', comments);
    
    // Update the request status
    get().updateRequest(requestId, { 
      status: 'rejected', 
      completed_at: new Date().toISOString(),
      steps: get().requests.find(r => r.id === requestId)?.steps?.map(s =>
        s.id === stepId ? { ...s, status: 'rejected', completed_at: new Date().toISOString() } : s
      )
    });
  },
}));

// Selectors
export const useUser = () => useAppStore(state => state.user);
export const useIsAuthenticated = () => useAppStore(state => state.isAuthenticated);
export const useRequests = () => useAppStore(state => state.filteredRequests);
export const useDashboardStats = () => useAppStore(state => state.dashboardStats);
export const useFilters = () => useAppStore(state => state.filters);
export const useIsLoading = () => useAppStore(state => state.isLoading);
export const useError = () => useAppStore(state => state.error);
