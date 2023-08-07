import { Image } from './image';

export interface Advertisement {
  id: string;
  categoryId?: string;
  userId: string;
  name: string;
  description?: string;
  address: string;
  images: Image[];
  price: number;
  createdAt: Date;
}
