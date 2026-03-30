import {
  deleteCategory as deleteCategoryApi,
  createCategory as createCategoryApi,
  updateCategory as updateCategoryApi,
  getCategoryById as getCategoryByIdApi,
  getAllCategories as getAllCategoriesApi,
} from "./category.service";
import { NextFunction, Response } from "express";
import { catchAsync } from "../../common/utils/catch-async";
import { AuthRequest } from "../../common/middlewares/protect";
import { httpStatus } from "../../common/constants/http-status";

export const getAllCategories = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const categories = await getAllCategoriesApi();
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Categories fetched successfully",
      data: categories,
    });
  },
);

export const createCategory = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const category = await createCategoryApi(name);
    return res.status(201).json({
      status: httpStatus.SUCCESS,
      message: "Category created successfully",
      data: category,
    });
  },
);

export const getCategoryById = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const category = await getCategoryByIdApi(req.params.id as string);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Category fetched successfully",
      data: category,
    });
  },
);

export const updateCategory = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const category = await updateCategoryApi(req.params.id as string, name);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Category updated successfully",
      data: category,
    });
  },
);

export const deleteCategory = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    await deleteCategoryApi(req.params.id as string);
    return res.json({
      status: httpStatus.SUCCESS,
      message: "Category deleted successfully",
      data: null,
    });
  },
);
