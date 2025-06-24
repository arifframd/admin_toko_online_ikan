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
  order_id: string;
  imageUrl: string;
  product_name: string;
  name: string;
  quantity: number;
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
