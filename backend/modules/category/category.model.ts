import { model, Schema } from "mongoose";
import { ICategory } from "./category.types";

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: [true, "Category name must be unique"],
    trim: true,
    minLength: [3, "Category name must be at least 3 characters"],
    maxLength: [50, "Category name must be at most 50 characters"],
  },
});

export const Category = model<ICategory>("Category", categorySchema);
