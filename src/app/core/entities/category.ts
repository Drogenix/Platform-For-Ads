export interface Category
{
  name: string;
  subCategories?: Category[];

  categoryItems?: string[];
}
