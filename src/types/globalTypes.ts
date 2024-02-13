export type IBike = {
  title: string;
  img: string;
  price: number;
  releaseDate: string;
  brand: string;
  model: string;
  type: string;
  size: string;
  color: string;
  suspension: string;
  quantity: number;
  seller: string;
  id?: string;
};

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type ISell = {
  seller: string;
  buyer: string;
  salesQuantity: number;
  totalPrice: number;
  salesDate: string;
};
