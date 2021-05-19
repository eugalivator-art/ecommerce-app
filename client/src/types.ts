export type StoreType = {
  currency: string;
  cart: CartType[];
  userSession: UserSessionType;
  loading: boolean;
  profile: number;
};

export type ProductType = {
  productId: number;
  productName: string;
  productPrice: string;
  productImage: string;
  productSalePrice: string;
  productStock: number;
};

export interface ProductResponseType {
  totalItems: number;
  data: ProductType[];
  currentPage: number;
  totalPages: number;
}

export type MenuType = {
  menuItem: string;
  menuLink: string;
};

export type CartType = {
  productQty: number;
  productTotalPrice: number;
} & ProductType;

export type LoginResponseType = {
  message: string;
  expiresIn: number;
  access_token: string;
};

export type AddressResponseType = {
  line1: string,
  line2: string,
  city: string,
  country: string,
  pincode: number,
  state: string,
}

export type PostResponseType = {
  paidAmount: number,
  cardNo: number,
  cvv: number,
  expir: number
}

export type OrderType = {
  orderShippingDate: number,
  orderDate: number,
  orderId: number,
  orderAmount: number,
  orderStatus: string,
}

export type OrderDetailType = {
  orderDetailId: number,
  orderShippingDate: number,
  itemAmount: number,
  quantity: number,
  productIdProductId: number,
}

export type AddressType = {
  line1: string,
  line2: string,
  city: string,
  state: string,
  country: string,
}

export type RegisterResponseType = {
  userName: string;
  userEmail: number;
};

export type UserSessionType = {
  user: object | null;
  error: string | null;
  
};


