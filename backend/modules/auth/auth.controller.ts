import { loginUser, registerUser } from "./auth.service";
import { catchAsync } from "../../common/utils/catch-async";
import { httpStatus } from "../../common/constants/http-status";

export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await registerUser({ name, email, password });
  return res.status(201).json({
    status: httpStatus.SUCCESS,
    data: user,
    message: "User created successfully",
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { user, token, refreshToken } = await loginUser({ email, password });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  return res.json({
    status: httpStatus.SUCCESS,
    message: "User logged in successfully",
    data: {
      user,
      token,
    },
  });
});

export const logout = catchAsync(async (req, res, next) => {
  return res.json({
    status: httpStatus.SUCCESS,
    message: "Welcome to logout endpoint",
  });
});

export const refresh = catchAsync(async (req, res, next) => {
  return res.json({
    status: httpStatus.SUCCESS,
    message: "Welcome to refresh endpoint",
  });
});
