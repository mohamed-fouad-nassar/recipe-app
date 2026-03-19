export enum httpStatus {
  SUCCESS = "Success",
  ERROR = "Error",
  FAIL = "Fail",
}

// export type httpStatusType = typeof httpStatus;
export type httpStatusType = `${httpStatus}`;
