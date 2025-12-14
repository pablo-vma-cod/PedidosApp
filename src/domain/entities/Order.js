/**
 * Entidad Order
 * Representa una orden/pedido en el sistema
 */
export class Order {
  constructor({
    id,
    restaurantId,
    restaurantName,
    userId,
    items = [],
    subtotal = 0,
    deliveryFee = 0,
    tax = 0,
    totalAmount = 0,
    deliveryAddress = '',
    paymentMethod = 'cash', // 'cash', 'card', 'wallet'
    status = 'pending', // 'pending', 'confirmed', 'preparing', 'on_way', 'delivered', 'cancelled'
    estimatedDeliveryTime = 30,
    specialInstructions = '',
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.restaurantName = restaurantName;
    this.userId = userId;
    this.items = items;
    this.subtotal = subtotal;
    this.deliveryFee = deliveryFee;
    this.tax = tax;
    this.totalAmount = totalAmount;
    this.deliveryAddress = deliveryAddress;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.estimatedDeliveryTime = estimatedDeliveryTime;
    this.specialInstructions = specialInstructions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Validación
  static validate(orderData) {
    const errors = [];

    if (!orderData.restaurantId) {
      errors.push('El restaurante es obligatorio');
    }

    if (!orderData.items || orderData.items.length === 0) {
      errors.push('El pedido debe contener al menos un producto');
    }

    if (!orderData.deliveryAddress || orderData.deliveryAddress.trim().length === 0) {
      errors.push('La dirección de entrega es obligatoria');
    }

    if (!orderData.paymentMethod) {
      errors.push('El método de pago es obligatorio');
    }

    if (orderData.totalAmount <= 0) {
      errors.push('El monto total debe ser mayor a 0');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Obtener estado legible
  getStatusLabel() {
    const labels = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      preparing: 'Preparando',
      on_way: 'En camino',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    };
    return labels[this.status] || this.status;
  }

  // Obtener método de pago legible
  getPaymentMethodLabel() {
    const labels = {
      cash: 'Efectivo',
      card: 'Tarjeta de Crédito',
      wallet: 'Billetera Digital'
    };
    return labels[this.paymentMethod] || this.paymentMethod;
  }

  // Convertir a JSON
  toJSON() {
    return {
      id: this.id,
      restaurantId: this.restaurantId,
      restaurantName: this.restaurantName,
      userId: this.userId,
      items: this.items,
      subtotal: this.subtotal,
      deliveryFee: this.deliveryFee,
      tax: this.tax,
      totalAmount: this.totalAmount,
      deliveryAddress: this.deliveryAddress,
      paymentMethod: this.paymentMethod,
      status: this.status,
      estimatedDeliveryTime: this.estimatedDeliveryTime,
      specialInstructions: this.specialInstructions,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Crear desde JSON
  static fromJSON(json) {
    return new Order({
      id: json.id,
      restaurantId: json.restaurantId,
      restaurantName: json.restaurantName,
      userId: json.userId,
      items: json.items || [],
      subtotal: json.subtotal || 0,
      deliveryFee: json.deliveryFee || 0,
      tax: json.tax || 0,
      totalAmount: json.totalAmount || 0,
      deliveryAddress: json.deliveryAddress || '',
      paymentMethod: json.paymentMethod || 'cash',
      status: json.status || 'pending',
      estimatedDeliveryTime: json.estimatedDeliveryTime || 30,
      specialInstructions: json.specialInstructions || '',
      createdAt: json.createdAt ? new Date(json.createdAt) : new Date(),
      updatedAt: json.updatedAt ? new Date(json.updatedAt) : new Date()
    });
  }
}
