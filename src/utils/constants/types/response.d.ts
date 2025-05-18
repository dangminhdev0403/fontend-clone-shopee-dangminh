interface ApiResponse<T> {
  status: number;
  error: string | null;
  message: string | object;
  data: T;
}

interface DataUserLogin {
  access_token: string;
  user: {
    name: string;
    email: string;
  };
}

export { ApiResponse, DataUserLogin };
