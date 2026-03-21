import { model, Schema } from "mongoose";
import { IFavorite } from "./favorite.types";

const favoriteSchema = new Schema<IFavorite>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: [true, "RecipeId is required"],
    },
  },
  { timestamps: true },
);

favoriteSchema.set("toJSON", {
  transform: (_, ret) => {
    const { __v, _id, ...safe } = ret as any;
    return safe;
  },
});

favoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export const Favorite = model<IFavorite>("Favorite", favoriteSchema);
