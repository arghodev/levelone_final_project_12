export interface MenuItem {
  name: string;
  image: string;
  price: number;
  category: string;
  _id: string;
  recipe: string;
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
