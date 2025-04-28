import { UserLogin } from "@components/Login/Login";
import { instance } from "@service/axios.custom";
import { ApiError } from "@utils/custom.errors";
import { ApiResponseDefault } from "@utils/response";
import { toast } from "react-toastify";

const apiLogin = async (data: UserLogin): Promise<void> => {
  const enpoint: string = "/auth/login";
  toast.dismiss();
  try {
    const res: ApiResponseDefault = await instance.post(enpoint, data);
    if (res.status < 400) {
      toast.success("Đăng nhập thành công");
    }
  } catch (error) {
    if (error instanceof ApiError) {
      toast.error(error.message);
    }
  }
};

export { apiLogin };
