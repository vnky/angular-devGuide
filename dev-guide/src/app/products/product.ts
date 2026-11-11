export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}
