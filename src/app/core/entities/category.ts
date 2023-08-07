export interface Category {
  id: string;
  parentId: string | null;
  name: string;
  children?: Category[];
}
