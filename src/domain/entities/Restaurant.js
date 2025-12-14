/**
 * Entidad Restaurant
 * Representa un restaurante en el sistema de delivery
 */
export class Restaurant {
  constructor({
    id,
    name,
    description,
    rating = 4.5,
    numReviews = 0,
    deliveryTime = 30,
    minOrder = 0,
    deliveryCost = 0,
    cuisine = [],
    imageUrl,
    isOpen = true,
    address = '',
    phone = '',
    logo = ''
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.numReviews = numReviews;
    this.deliveryTime = deliveryTime;
    this.minOrder = minOrder;
    this.deliveryCost = deliveryCost;
    this.cuisine = cuisine;
    this.imageUrl = imageUrl;
    this.isOpen = isOpen;
    this.address = address;
    this.phone = phone;
    this.logo = logo;
  }

  // Validación
  static validate(restaurantData) {
    const errors = [];

    if (!restaurantData.name || restaurantData.name.trim().length === 0) {
      errors.push('El nombre del restaurante es obligatorio');
    }

    if (restaurantData.rating < 0 || restaurantData.rating > 5) {
      errors.push('El rating debe estar entre 0 y 5');
    }

    if (restaurantData.deliveryTime < 0) {
      errors.push('El tiempo de entrega no puede ser negativo');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Regla de negocio: Formato para mostrar
  getFormattedDeliveryTime() {
    return `${this.deliveryTime} min`;
  }

  // Regla de negocio: Validar compra mínima
  meetsMinimumOrder(cartTotal) {
    return cartTotal >= this.minOrder;
  }

  // Regla de negocio: Calcular costo total con delivery
  calculateTotalDelivery(cartTotal) {
    if (!this.meetsMinimumOrder(cartTotal)) {
      throw new Error(`El pedido mínimo es S/${this.minOrder}`);
    }
    return cartTotal + this.deliveryCost;
  }

  // Convertir a JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      rating: this.rating,
      numReviews: this.numReviews,
      deliveryTime: this.deliveryTime,
      minOrder: this.minOrder,
      deliveryCost: this.deliveryCost,
      cuisine: this.cuisine,
      imageUrl: this.imageUrl,
      isOpen: this.isOpen,
      address: this.address,
      phone: this.phone,
      logo: this.logo
    };
  }

  // Crear desde JSON
  static fromJSON(json) {
    return new Restaurant({
      id: json.id,
      name: json.name,
      description: json.description,
      rating: json.rating || 4.5,
      numReviews: json.numReviews || 0,
      deliveryTime: json.deliveryTime || 30,
      minOrder: json.minOrder || 0,
      deliveryCost: json.deliveryCost || 0,
      cuisine: json.cuisine || [],
      imageUrl: json.imageUrl,
      isOpen: json.isOpen !== false,
      address: json.address || '',
      phone: json.phone || '',
      logo: json.logo || ''
    });
  }
}
