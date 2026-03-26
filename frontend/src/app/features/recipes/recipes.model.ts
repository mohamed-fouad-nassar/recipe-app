// export interface Recipe {
//   id: string;
//   image: string;
//   title: string;
//   category: string;
//   author: string;
//   time: string;
//   likes: number;
//   isLiked: boolean;
//   isFavorite: boolean;
// }

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  likesCount: number;
  createdAt: string;
  isFavorite: boolean;
  isLiked: boolean;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface ingredient {
  _id: string;
  name: string;
  quantity: string;
}
export interface RecipeDetails {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  likesCount: number;
  createdAt: string;
  isFavorite: boolean;
  isLiked: boolean;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  ingredients: ingredient[];
  steps: string[];
}

export interface PaginatedResponse<T> {
  results: number;
  total: number;
  page: number;
  data: T[];
}
export interface HomeRecipesResponse {
  status: string;
  message: string;
  data: {
    recipes: Recipe[];
  };
}
