import { UserLogin } from "@components/Login/Login";
import { RegisterForm } from "@components/Register/Register";
import { instance } from "@service/axios.custom";
import { ApiResponseDefault } from "@utils/constants/response";
import { ApiError, showValidatorMessage } from "@utils/custom.errors";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

const apiLogin = async (
  data: UserLogin,
  setError: UseFormSetError<UserLogin>,
): Promise<boolean> => {
  const enpoint: string = "/auth/login";
  toast.dismiss();
  try {
    const res: ApiResponseDefault = await instance.post(enpoint, data);
    if (res.status < 400) {
      toast.success("Đăng nhập thành công");
      return true;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      showValidatorMessage(error, setError);
    }
    return false;
  }
  return false;
};

const apiRegister = async (
  data: RegisterForm,
  setError: UseFormSetError<RegisterForm>,
): Promise<boolean> => {
  const enpoint: string = "/auth/register";
  toast.dismiss();
  try {
    const res: ApiResponseDefault = await instance.post(enpoint, data);
    if (res.status < 400) {
      toast.success("Đăng ký thành công");
      return true;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      showValidatorMessage(error, setError);
      return false;
    }
  }
  return false;
};

export { apiLogin, apiRegister };
