import { User } from '../../../domain/entities/User';

/**
 * Use Case: Registrar nuevo usuario
 */
export class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @param {Object} userData - {email, password, name}
   * @returns {Promise<{user: User, token: string}>}
   */
  async execute(userData) {
    const { email, password, name } = userData;

    // Validar email y password
    const validation = User.validateCredentials(email, password);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    // Validar nombre
    if (!name || name.trim().length === 0) {
      throw new Error('El nombre es requerido');
    }

    if (name.length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }

    try {
      // Verificar si el email ya existe
      const emailExists = await this.userRepository.emailExists(email);
      
      if (emailExists) {
        throw new Error('Este correo electrónico ya está registrado');
      }

      // Registrar usuario
      const result = await this.userRepository.register({
        email: email.trim().toLowerCase(),
        password,
        name: name.trim()
      });

      return result;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }
}