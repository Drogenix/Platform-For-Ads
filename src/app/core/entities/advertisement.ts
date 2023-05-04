export interface Advertisement {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  address: string;
  imageUrl: string;
  price: number;
  createdAt: string;
}
