// ApiError.ts
export class ApiError extends Error {
  status?: number;
  error?: string;
  detailMessage?: string | object;

  constructor(detailError: {
    status?: number;
    error?: string;
    message?: string | object;
  }) {
    super(
      typeof detailError.message === "string"
        ? detailError.message
        : JSON.stringify(detailError.message),
    );
    this.name = "ApiError";
    this.status = detailError.status;
    this.error = detailError.error;
    this.detailMessage = detailError.message;

    // Set prototype manually vì TS/JS khi kế thừa Error cần set lại prototype
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
