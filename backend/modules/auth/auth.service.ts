import {
  hashToken,
  signAccessToken,
  signRefreshToken,
} from "../../common/utils/tokens";
import { User } from "../user/user.model";
import { IUser } from "../user/user.types";
import HttpError from "../../common/utils/http-error";
import { ILoginUser, IRegisterUser } from "./auth.types";
import { httpStatus } from "../../common/constants/http-status";

export const registerUser = async ({
  name,
  email,
  password,
}: IRegisterUser): Promise<IUser> => {
  const userExists = await User.findOne({ email });
  if (userExists)
    throw new HttpError(409, httpStatus.FAIL, "User already exists");

  const user = await User.create({ name, email, password });
  return user;
};

export const loginUser = async ({
  email,
  password,
}: ILoginUser): Promise<{
  user: IUser;
  token: string;
  refreshToken: string;
}> => {
  const user = await User.findOne({ email });
  if (!user) throw new HttpError(401, httpStatus.FAIL, "Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    throw new HttpError(401, httpStatus.FAIL, "Invalid credentials");

  const token = signAccessToken(user._id.toString(), user.role);
  const refreshToken = signRefreshToken(user._id.toString());
  user.refreshToken = hashToken(refreshToken);
  await user.save();

  return { user, token, refreshToken };
};
