export interface UserProps {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface TransactionProps {
  _id: string;
  order_id: string;
  imageUrl: string;
  product_name: string;
  name: string;
  quantity: number;
  total: number;
  address: string;
  isProcessed: boolean;
}

export interface NewCheckoutProps {
  order_id: string;
  products: {
    product_id: string;
    product_name: string;
    imageUrl: string;
    quantity: number;
    price: number;
    subtotal: number;
  };
  name: string;
  email: string;
  phone: number;
  city: string;
  postalCode: number;
  total: number;
  address: string;
}

export interface MonthlySalesProps {
  monthly: string;
  total: number;
}

export interface PieData {
  label: string;
  value: number;
}

export type NewestOrdersProps = {
  order_id: string;
  name: string;
};

export type NewestProductsProps = {
  name: string;
  category: string;
};

export interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

export interface EditProductProps {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  category: string;
  stock: number;
}
