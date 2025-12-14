/**
 * Entidad Category
 * Representa una categoría de productos
 */
export class Category {
  constructor({
    id,
    name,
    description,
    displayOrder = 0,
    isActive = true
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.displayOrder = displayOrder;
    this.isActive = isActive;
  }

  // Regla de negocio: Validar categoría
  static validate(categoryData) {
    const errors = [];

    if (!categoryData.name || categoryData.name.trim().length === 0) {
      errors.push('El nombre de la categoría es obligatorio');
    }

    if (categoryData.name && categoryData.name.length > 50) {
      errors.push('El nombre no puede exceder 50 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      displayOrder: this.displayOrder,
      isActive: this.isActive
    };
  }

  static fromJSON(json) {
    return new Category({
      id: json.id,
      name: json.name,
      description: json.description || '',
      displayOrder: json.displayOrder || 0,
      isActive: json.isActive !== false
    });
  }
}