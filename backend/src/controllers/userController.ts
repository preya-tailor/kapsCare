import { Request, Response } from 'express';
import { userService, User } from '../services/userService';

export const userController = {
  // Create or update user
  async saveUser(req: Request, res: Response) {
    try {
      const userData: Partial<User> = req.body;
      const user = await userService.saveUser(userData);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ success: false, message: 'Failed to save user' });
    }
  },

  // Get user by ID
  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (user) {
        res.status(200).json({ success: true, data: user });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ success: false, message: 'Failed to get user' });
    }
  },

  // Get user by phone
  async getUserByPhone(req: Request, res: Response) {
    try {
      const { phone } = req.params;
      const user = await userService.getUserByPhone(phone);
      if (user) {
        res.status(200).json({ success: true, data: user });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error getting user by phone:', error);
      res.status(500).json({ success: false, message: 'Failed to get user' });
    }
  },

  // Update user
  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates: Partial<User> = req.body;
      const user = await userService.updateUser(id, updates);
      if (user) {
        res.status(200).json({ success: true, data: user });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ success: false, message: 'Failed to update user' });
    }
  },

  // Delete user
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await userService.deleteUser(id);
      if (success) {
        res.status(200).json({ success: true, message: 'User deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ success: false, message: 'Failed to delete user' });
    }
  },

  // Get all users
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error('Error getting all users:', error);
      res.status(500).json({ success: false, message: 'Failed to get users' });
    }
  }
};