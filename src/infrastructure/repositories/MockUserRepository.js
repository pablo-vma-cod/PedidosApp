import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';

/**
 * MockUserRepository
 * Implementación MOCK del UserRepository
 */
export class MockUserRepository extends UserRepository {
  constructor() {
    super();
    
    // Usuario mock para testing
    this.mockUsers = [
      {
        id: 1,
        email: "cliente@correo.com",
        password: "123456", // En producción NUNCA guardes passwords en texto plano
        name: "Cliente",
        role: "customer",
        isActive: true
      },
      {
        id: 2,
        email: "admin@pedidosapp.com",
        password: "admin123",
        name: "Administrador",
        role: "admin",
        isActive: true
      }
    ];
    
    this.currentToken = null;
    this.currentUserId = null;
  }

  async _simulateDelay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async login(email, password) {
    await this._simulateDelay(1000); // Simula login lento
    
    // Buscar usuario
    const userData = this.mockUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (!userData) {
      return null; // Credenciales incorrectas
    }
    
    // Generar token fake
    const token = `mock_token_${userData.id}_${Date.now()}`;
    
    // Guardar sesión
    this.currentToken = token;
    this.currentUserId = userData.id;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userData.id);
    
    // Retornar usuario (sin password)
    const { password: _, ...userWithoutPassword } = userData;
    
    return {
      user: User.fromJSON(userWithoutPassword),
      token
    };
  }

  async register(userData) {
    await this._simulateDelay(1000);
    
    // Verificar si el email ya existe
    const exists = this.mockUsers.some(u => u.email === userData.email);
    if (exists) {
      throw new Error('El email ya está registrado');
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: this.mockUsers.length + 1,
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: 'customer',
      isActive: true
    };
    
    this.mockUsers.push(newUser);
    
    // Auto-login
    const token = `mock_token_${newUser.id}_${Date.now()}`;
    this.currentToken = token;
    this.currentUserId = newUser.id;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', newUser.id);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      user: User.fromJSON(userWithoutPassword),
      token
    };
  }

  async logout() {
    await this._simulateDelay(300);
    
    this.currentToken = null;
    this.currentUserId = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }

  async getCurrentUser() {
    await this._simulateDelay(300);
    
    if (!this.currentUserId) {
      const userId = localStorage.getItem('userId');
      if (!userId) return null;
      this.currentUserId = parseInt(userId);
    }
    
    const userData = this.mockUsers.find(u => u.id === this.currentUserId);
    if (!userData) return null;
    
    const { password: _, ...userWithoutPassword } = userData;
    return User.fromJSON(userWithoutPassword);
  }

  async findById(id) {
    await this._simulateDelay(300);
    const userData = this.mockUsers.find(u => u.id === parseInt(id));
    if (!userData) return null;
    
    const { password: _, ...userWithoutPassword } = userData;
    return User.fromJSON(userWithoutPassword);
  }

  async updateProfile(id, userData) {
    await this._simulateDelay(500);
    const index = this.mockUsers.findIndex(u => u.id === parseInt(id));
    if (index === -1) throw new Error('Usuario no encontrado');
    
    this.mockUsers[index] = {
      ...this.mockUsers[index],
      ...userData
    };
    
    const { password: _, ...userWithoutPassword } = this.mockUsers[index];
    return User.fromJSON(userWithoutPassword);
  }

  async emailExists(email) {
    await this._simulateDelay(300);
    return this.mockUsers.some(u => u.email === email);
  }
}