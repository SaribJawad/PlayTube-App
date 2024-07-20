class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    statck = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    // handling the statck trace of files error
    if (statck) {
      this.stack = statck;
    } else {
      //passed the instance in the stackTrace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
