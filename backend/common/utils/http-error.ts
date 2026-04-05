import { httpStatus, httpStatusType } from "../constants/http-status";

export default class HttpError extends Error {
  public code: number;
  public status: httpStatusType;

  constructor(code: number, status: httpStatusType, message: string) {
    super(message || "Internal Server Error");
    this.code = code || 500;
    this.status = status || httpStatus.ERROR;
  }
}
