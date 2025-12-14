import { Product } from './Product';

/**
 * Entidad CartItem
 * Representa un item en el carrito de compras
 */
export class CartItem {
  constructor({
    product,
    quantity = 1,
    specialInstructions = ''
  }) {
    this.product = product;
    this.quantity = quantity;
    this.specialInstructions = specialInstructions;
  }

  // Regla de negocio: Calcular subtotal
  getSubtotal() {
    return this.product.price * this.quantity;
  }

  // Regla de negocio: Incrementar cantidad
  increaseQuantity() {
    this.quantity += 1;
  }

  // Regla de negocio: Decrementar cantidad
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
      return true;
    }
    return false; // No se puede disminuir más
  }

  // Regla de negocio: Validar item
  isValid() {
    return (
      this.product &&
      this.product.canBePurchased() &&
      this.quantity > 0 &&
      this.quantity <= 99 // límite máximo
    );
  }

  toJSON() {
    return {
      product: this.product.toJSON(),
      quantity: this.quantity,
      specialInstructions: this.specialInstructions,
      subtotal: this.getSubtotal()
    };
  }

  static fromJSON(json) {
    return new CartItem({
      product: Product.fromJSON(json.product),
      quantity: json.quantity,
      specialInstructions: json.specialInstructions || ''
    });
  }
}