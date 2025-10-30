import pool from '../config/database';
import { User, CreateUserRequest } from '../types';

export class UserModel {
  /**
   * Create a new user
   */
  static async create(userData: CreateUserRequest): Promise<User> {
    const query = `
      INSERT INTO users (email, name, oauth_provider, oauth_id, role, avatar_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const values = [
      userData.email,
      userData.name,
      userData.oauth_provider,
      userData.oauth_id,
      userData.role || 'user',
      userData.avatar_url || null
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Find user by ID
   */
  static async findById(id: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * Find user by email
   */
  static async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  /**
   * Find user by OAuth provider and ID
   */
  static async findByOAuth(provider: string, oauthId: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE oauth_provider = $1 AND oauth_id = $2';
    const result = await pool.query(query, [provider, oauthId]);
    return result.rows[0] || null;
  }

  /**
   * Update user
   */
  static async update(id: string, updates: Partial<User>): Promise<User | null> {
    const allowedFields = ['name', 'avatar_url', 'is_active', 'last_login_at'];
    const updateFields = Object.keys(updates).filter(key => allowedFields.includes(key));
    
    if (updateFields.length === 0) {
      throw new Error('No valid fields to update');
    }

    const setClause = updateFields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = [id, ...updateFields.map(field => updates[field as keyof User])];

    const query = `
      UPDATE users 
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  /**
   * Get all users with pagination
   */
  static async findAll(
    page: number = 1,
    limit: number = 10,
    filters: { role?: string; is_active?: boolean } = {}
  ): Promise<{ users: User[]; total: number }> {
    let whereClause = '';
    const values: any[] = [];
    let paramIndex = 1;

    if (filters.role) {
      whereClause += ` WHERE role = $${paramIndex}`;
      values.push(filters.role);
      paramIndex++;
    }

    if (filters.is_active !== undefined) {
      whereClause += whereClause ? ` AND is_active = $${paramIndex}` : ` WHERE is_active = $${paramIndex}`;
      values.push(filters.is_active);
      paramIndex++;
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM users${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated results
    const offset = (page - 1) * limit;
    const query = `
      SELECT * FROM users
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    
    values.push(limit, offset);
    const result = await pool.query(query, values);

    return {
      users: result.rows,
      total
    };
  }

  /**
   * Delete user (soft delete by setting is_active to false)
   */
  static async delete(id: string): Promise<boolean> {
    const query = 'UPDATE users SET is_active = false, updated_at = NOW() WHERE id = $1';
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  /**
   * Get user preferences
   */
  static async getPreferences(userId: string) {
    const query = 'SELECT * FROM user_preferences WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0] || null;
  }

  /**
   * Update user preferences
   */
  static async updatePreferences(userId: string, preferences: Partial<{
    email_notifications: boolean;
    slack_notifications: boolean;
    in_app_notifications: boolean;
    timezone: string;
    language: string;
  }>) {
    const allowedFields = ['email_notifications', 'slack_notifications', 'in_app_notifications', 'timezone', 'language'];
    const updateFields = Object.keys(preferences).filter(key => allowedFields.includes(key));
    
    if (updateFields.length === 0) {
      throw new Error('No valid preference fields to update');
    }

    const setClause = updateFields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = [userId, ...updateFields.map(field => preferences[field as keyof typeof preferences])];

    const query = `
      UPDATE user_preferences 
      SET ${setClause}, updated_at = NOW()
      WHERE user_id = $1
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }
}
