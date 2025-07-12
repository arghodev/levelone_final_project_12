export interface MenuItem {
  name: string;
  image: string;
  price: number;
  category: string;
  _id: string;
  recipeDetails: string;
}

export interface CartItem {
  _id?: string;
  menuid: string;
  name: string;
  image: string;
  price: number;
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  insertedId?: string;
}

export interface IUser {
  email: string;
  password: string;
  name: string;
  photoURL: string;
  role: string;
  _id: string;
}

export interface IPaymentHistory {
  cartId: string[];
  date: string;
  email: string;
  menuId: string[];
  price: number;
  status: string;
  _id: string;
  transactionId: string;
}
