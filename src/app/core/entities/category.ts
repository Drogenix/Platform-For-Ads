export interface Category {
  id: string;
  parentId: string;
  name: string;
  children?: Category[];
}
