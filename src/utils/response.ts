export type ApiResponseDefault<T = unknown> = {
  status: number;
  error: string | null;
  message: string | object;
  data: T;
};
