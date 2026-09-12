class ApiError extends Error {
  statusCode: number;
  data: null;
  errors: unknown[];
  success: boolean;

  constructor(
    statusCode: number,
    message = "Internal Server Error",
    errors: unknown[] = [],
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;