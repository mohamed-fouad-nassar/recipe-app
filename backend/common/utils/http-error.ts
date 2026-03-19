import { httpStatusType } from "../constants/http-status";

export default class HttpError extends Error {
  public code: number;
  public status: httpStatusType;

  constructor(code: number, status: httpStatusType, message: string) {
    super(message);
    this.code = code;
    this.status = status;
  }
}
