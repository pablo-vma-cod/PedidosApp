import { User } from '../../../domain/entities/User';

/**
 * Use Case: Iniciar sesión de usuario
 */
export class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @param {string} email
   * @param {string} password
   * @param {boolean} rememberMe
   * @returns {Promise<{user: User, token: string}>}
   */
  async execute(email, password, rememberMe = false) {
    // Validar credenciales (regla de negocio)
    const validation = User.validateCredentials(email, password);
    
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    try {
      // Intentar autenticar con el repositorio
      const result = await this.userRepository.login(email, password);
      
      if (!result) {
        throw new Error('Credenciales incorrectas');
      }

      const { user, token } = result;

      // Verificar que el usuario esté activo
      if (!user.isActive) {
        throw new Error('Tu cuenta está desactivada. Contacta con soporte.');
      }

      // Si "recordar sesión" está activo, guardar token en localStorage
      // (esto lo manejaría el repositorio en su implementación)
      
      return { user, token };
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }
}