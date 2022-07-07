export interface GoodsData {
  id: number;
  name: string;
  price: number;
  size: Array<string> | Array<number>;
  img: string;
  category: 'uniform' | 'clothing' | 'cap';
}

export type GoodsCategory = GoodsData['category'];

export interface Option {
  id: number;
  name: string;
  img: string;
  size: string | number;
  price: number;
  quantity: number;
}

export interface CartItemOption extends Option {
  selected: boolean;
}
