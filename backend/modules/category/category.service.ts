import { Category } from "./category.model";
import HttpError from "../../common/utils/http-error";
import { httpStatus } from "../../common/constants/http-status";

export const getAllCategories = async () => {
  const categories = await Category.find();
  return categories;
};

export const createCategory = async (name: string) => {
  const existingCategory = await Category.findOne({ name });

  if (existingCategory)
    throw new HttpError(400, httpStatus.FAIL, "Category name must be unique");

  const category = await Category.create({ name });
  return category;
};

export const getCategoryById = async (id: string) => {
  const category = await Category.findById(id);

  if (!category)
    throw new HttpError(404, httpStatus.FAIL, "Category not found");

  return category;
};

export const updateCategory = async (id: string, name: string) => {
  const category = await Category.findById(id);

  if (!category)
    throw new HttpError(404, httpStatus.FAIL, "Category not found");

  const existingCategory = await Category.findOne({ name });

  if (existingCategory && existingCategory._id.toString() !== id)
    throw new HttpError(400, httpStatus.FAIL, "Category name must be unique");

  Object.assign(category, { name });
  await category.save();
  return category;
};

export const deleteCategory = async (id: string) => {
  const category = await Category.findById(id);

  if (!category)
    throw new HttpError(404, httpStatus.FAIL, "Category not found");

  await category.deleteOne();
};
