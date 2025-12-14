/**
 * Entidad Product
 * Representa un producto en el sistema de pedidos
 * NO tiene dependencias externas (React, axios, etc.)
 */
export class Product {
  constructor({
    id,
    name,
    description,
    price,
    category,
    imageUrl,
    isPopular = false,
    isAvailable = true
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.imageUrl = imageUrl;
    this.isPopular = isPopular;
    this.isAvailable = isAvailable;
  }

  // Reglas de negocio: Validaciones
  static validate(productData) {
    const errors = [];

    if (!productData.name || productData.name.trim().length === 0) {
      errors.push('El nombre del producto es obligatorio');
    }

    if (productData.name && productData.name.length > 100) {
      errors.push('El nombre no puede exceder 100 caracteres');
    }

    if (!productData.price || productData.price <= 0) {
      errors.push('El precio debe ser mayor a 0');
    }

    if (!productData.category || productData.category.trim().length === 0) {
      errors.push('La categoría es obligatoria');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Regla de negocio: Formatear precio para mostrar
  getFormattedPrice() {
    return `S/${this.price.toFixed(2)}`;
  }

  // Regla de negocio: Calcular precio con descuento
  getPriceWithDiscount(discountPercentage) {
    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error('El descuento debe estar entre 0 y 100');
    }
    
    const discount = this.price * (discountPercentage / 100);
    return this.price - discount;
  }

  // Regla de negocio: Verificar si puede ser comprado
  canBePurchased() {
    return this.isAvailable && this.price > 0;
  }

  // Convertir a objeto plano (para enviar a API)
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      imageUrl: this.imageUrl,
      isPopular: this.isPopular,
      isAvailable: this.isAvailable
    };
  }

  // Crear desde objeto plano (respuesta de API)
  static fromJSON(json) {
    // Manejar precio que puede ser string o number
    let priceValue = json.price;
    if (typeof priceValue === 'string') {
      priceValue = parseFloat(priceValue.replace('S/', ''));
    } else {
      priceValue = parseFloat(priceValue);
    }

    return new Product({
      id: json.id,
      name: json.name,
      description: json.desc || json.description,
      price: priceValue,
      category: json.category,
      imageUrl: json.imgUrl || json.imageUrl,
      isPopular: json.isPopular || false,
      isAvailable: json.isAvailable !== false
    });
  }
}