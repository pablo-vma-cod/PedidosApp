/**
 * UserRepository (Interface/Contrato)
 * 
 * Define QUÉ operaciones necesitamos con usuarios
 */
export class UserRepository {
  /**
   * Autentica un usuario con email y contraseña
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: User, token: string}|null>}
   */
  async login(email, password) {
    throw new Error('Método login() debe ser implementado');
  }

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - {email, password, name}
   * @returns {Promise<{user: User, token: string}>}
   */
  async register(userData) {
    throw new Error('Método register() debe ser implementado');
  }

  /**
   * Cierra la sesión del usuario actual
   * @returns {Promise<void>}
   */
  async logout() {
    throw new Error('Método logout() debe ser implementado');
  }

  /**
   * Obtiene el usuario actualmente autenticado
   * @returns {Promise<User|null>}
   */
  async getCurrentUser() {
    throw new Error('Método getCurrentUser() debe ser implementado');
  }

  /**
   * Obtiene un usuario por ID
   * @param {string|number} id
   * @returns {Promise<User|null>}
   */
  async findById(id) {
    throw new Error('Método findById() debe ser implementado');
  }

  /**
   * Actualiza el perfil del usuario
   * @param {string|number} id
   * @param {Object} userData
   * @returns {Promise<User>}
   */
  async updateProfile(id, userData) {
    throw new Error('Método updateProfile() debe ser implementado');
  }

  /**
   * Verifica si un email ya está registrado
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  async emailExists(email) {
    throw new Error('Método emailExists() debe ser implementado');
  }
}