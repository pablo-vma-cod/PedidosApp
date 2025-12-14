/**
 * Use Case: Cerrar sesión
 */
export class LogoutUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    try {
      await this.userRepository.logout();
      return true;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw new Error('No se pudo cerrar la sesión');
    }
  }
}