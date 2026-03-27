export interface Comment {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  content: string;
  recipeId: string;
  createdAt: string;
  updatedAt: string;
}
