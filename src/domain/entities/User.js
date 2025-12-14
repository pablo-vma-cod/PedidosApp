/**
 * Entidad User
 * Representa un usuario del sistema
 */
export class User {
  constructor({
    id,
    email,
    name,
    role = 'customer',
    isActive = true
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
    this.isActive = isActive;
  }

  // Reglas de negocio: Validar email
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Reglas de negocio: Validar contraseña
  static isValidPassword(password) {
    return password && password.length >= 6;
  }

  // Reglas de negocio: Validar datos de registro/login
  static validateCredentials(email, password) {
    const errors = [];

    if (!email || !this.isValidEmail(email)) {
      errors.push('Introduce un correo electrónico válido');
    }

    if (!password || !this.isValidPassword(password)) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Regla de negocio: Verificar permisos
  hasPermission(requiredRole) {
    const roleHierarchy = {
      'customer': 1,
      'staff': 2,
      'admin': 3
    };

    return roleHierarchy[this.role] >= roleHierarchy[requiredRole];
  }

  // Regla de negocio: Usuario puede hacer pedidos
  canPlaceOrders() {
    return this.isActive && this.role !== undefined;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      isActive: this.isActive
    };
  }

  static fromJSON(json) {
    return new User({
      id: json.id,
      email: json.email,
      name: json.name,
      role: json.role || 'customer',
      isActive: json.isActive !== false
    });
  }
}