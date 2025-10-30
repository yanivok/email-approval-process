import { UserModel } from '../../src/models/User';
import pool from '../../src/config/database';
import { User, CreateUserRequest } from '../../src/types';

// Mock the database pool
jest.mock('../../src/config/database', () => ({
  query: jest.fn(),
}));

const mockPool = pool as jest.Mocked<typeof pool>;

describe('UserModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const userData: CreateUserRequest = {
        email: 'test@example.com',
        name: 'Test User',
        oauth_provider: 'google',
        oauth_id: 'google_123',
        role: 'user'
      };

      const expectedUser: User = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'test@example.com',
        name: 'Test User',
        oauth_provider: 'google',
        oauth_id: 'google_123',
        role: 'user',
        avatar_url: null,
        is_active: true,
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPool.query.mockResolvedValueOnce({ rows: [expectedUser], rowCount: 1 });

      const result = await UserModel.create(userData);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO users'),
        ['test@example.com', 'Test User', 'google', 'google_123', 'user', null]
      );
      expect(result).toEqual(expectedUser);
    });

    it('should create user with default role when not provided', async () => {
      const userData: CreateUserRequest = {
        email: 'test@example.com',
        name: 'Test User',
        oauth_provider: 'google',
        oauth_id: 'google_123'
      };

      const expectedUser: User = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'test@example.com',
        name: 'Test User',
        oauth_provider: 'google',
        oauth_id: 'google_123',
        role: 'user',
        avatar_url: null,
        is_active: true,
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPool.query.mockResolvedValueOnce({ rows: [expectedUser], rowCount: 1 });

      const result = await UserModel.create(userData);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO users'),
        ['test@example.com', 'Test User', 'google', 'google_123', 'user', null]
      );
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findById', () => {
    it('should find user by ID', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440001';
      const expectedUser: User = {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        oauth_provider: 'google',
        oauth_id: 'google_123',
        role: 'user',
        avatar_url: null,
        is_active: true,
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPool.query.mockResolvedValueOnce({ rows: [expectedUser], rowCount: 1 });

      const result = await UserModel.findById(userId);

      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE id = $1',
        [userId]
      );
      expect(result).toEqual(expectedUser);
    });

    it('should return null when user not found', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440001';

      mockPool.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });

      const result = await UserModel.findById(userId);

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const email = 'test@example.com';
      const expectedUser: User = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'test@example.com',
        name: 'Test User',
        oauth_provider: 'google',
        oauth_id: 'google_123',
        role: 'user',
        avatar_url: null,
        is_active: true,
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPool.query.mockResolvedValueOnce({ rows: [expectedUser], rowCount: 1 });

      const result = await UserModel.findByEmail(email);

      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findByOAuth', () => {
    it('should find user by OAuth provider and ID', async () => {
      const provider = 'google';
      const oauthId = 'google_123';
      const expectedUser: User = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'test@example.com',
        name: 'Test User',
        oauth_provider: 'google',
        oauth_id: 'google_123',
        role: 'user',
        avatar_url: null,
        is_active: true,
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPool.query.mockResolvedValueOnce({ rows: [expectedUser], rowCount: 1 });

      const result = await UserModel.findByOAuth(provider, oauthId);

      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE oauth_provider = $1 AND oauth_id = $2',
        [provider, oauthId]
      );
      expect(result).toEqual(expectedUser);
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440001';
      const updates = { name: 'Updated Name', avatar_url: 'https://example.com/avatar.jpg' };
      const expectedUser: User = {
        id: userId,
        email: 'test@example.com',
        name: 'Updated Name',
        oauth_provider: 'google',
        oauth_id: 'google_123',
        role: 'user',
        avatar_url: 'https://example.com/avatar.jpg',
        is_active: true,
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPool.query.mockResolvedValueOnce({ rows: [expectedUser], rowCount: 1 });

      const result = await UserModel.update(userId, updates);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE users'),
        [userId, 'Updated Name', 'https://example.com/avatar.jpg']
      );
      expect(result).toEqual(expectedUser);
    });

    it('should throw error when no valid fields to update', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440001';
      const updates = { invalidField: 'value' };

      await expect(UserModel.update(userId, updates)).rejects.toThrow('No valid fields to update');
    });
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      const expectedUsers: User[] = [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          email: 'test1@example.com',
          name: 'Test User 1',
          oauth_provider: 'google',
          oauth_id: 'google_123',
          role: 'user',
          avatar_url: null,
          is_active: true,
          last_login_at: null,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];

      mockPool.query
        .mockResolvedValueOnce({ rows: [{ count: '1' }], rowCount: 1 }) // Count query
        .mockResolvedValueOnce({ rows: expectedUsers, rowCount: 1 }); // Data query

      const result = await UserModel.findAll(1, 10);

      expect(result.users).toEqual(expectedUsers);
      expect(result.total).toBe(1);
      expect(mockPool.query).toHaveBeenCalledTimes(2);
    });

    it('should apply filters correctly', async () => {
      const filters = { role: 'admin', is_active: true };

      mockPool.query
        .mockResolvedValueOnce({ rows: [{ count: '0' }], rowCount: 1 }) // Count query
        .mockResolvedValueOnce({ rows: [], rowCount: 0 }); // Data query

      await UserModel.findAll(1, 10, filters);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE role = $1 AND is_active = $2'),
        ['admin', true, 10, 0]
      );
    });
  });

  describe('delete', () => {
    it('should soft delete user by setting is_active to false', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440001';

      mockPool.query.mockResolvedValueOnce({ rows: [], rowCount: 1 });

      const result = await UserModel.delete(userId);

      expect(mockPool.query).toHaveBeenCalledWith(
        'UPDATE users SET is_active = false, updated_at = NOW() WHERE id = $1',
        [userId]
      );
      expect(result).toBe(true);
    });
  });
});
