export interface Recipe {
  id: string;
  image: string;
  title: string;
  category: string;
  author: string;
  time: string;
  likes: number;
  isLiked: boolean;
  isFavorite: boolean;
}
