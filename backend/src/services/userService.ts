import { prisma } from '../config/db';

export interface User {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const userService = {
  // Create or update user
  async saveUser(userData: Partial<User>): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { id: userData.id }
    });

    if (existingUser) {
      // Update existing user
      const updatedUser = await prisma.user.update({
        where: { id: userData.id },
        data: {
          ...userData,
          updatedAt: new Date()
        }
      });
      return this.formatUser(updatedUser);
    } else {
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          id: userData.id!,
          email: userData.email,
          firstName: userData.firstName || 'User',
          lastName: userData.lastName || '',
          role: userData.role || 'customer',
          phone: userData.phone,
        //   address: userData.address,
          createdAt: userData.createdAt ? new Date(userData.createdAt) : new Date(),
          updatedAt: new Date()
        }
      });
      return this.formatUser(newUser);
    }
  },

  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    return user ? this.formatUser(user) : null;
  },

  // Get user by phone number
  async getUserByPhone(phone: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { phone }
    });
    return user ? this.formatUser(user) : null;
  },

  // Update user profile
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          ...updates,
          updatedAt: new Date()
        }
      });
      return this.formatUser(updatedUser);
    } catch (error) {
      return null;
    }
  },

  // Delete user
  async deleteUser(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(user => this.formatUser(user));
  },

  // Helper to format user data
  formatUser(user: any): User {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      address: user.address,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
  }
};