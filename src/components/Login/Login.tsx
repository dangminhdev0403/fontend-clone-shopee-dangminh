import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="ml-auto h-[500px] bg-white p-8 lg:w-[400px]">
      <div className="hidden lg:block lg:text-2xl">Đăng nhập</div>
      <form>
        <div className="mt-6">
          <input
            type="email"
            placeholder="Email"
            className="h-10 w-full rounded border border-gray-400"
          />
          <div className="max-h-1 text-red-400"> Sai email</div>
        </div>
        <div className="mt-6">
          <input
            type="password"
            placeholder="Ennter Password"
            className="h-10 w-full rounded border border-gray-400"
          />
          <div className="max-h-1 text-red-400"> Sai passoword</div>
        </div>

        <div>
          <button className="curshadow mt-7 w-full cursor-pointer rounded bg-[#EE4D2D] p-2 hover:bg-orange-500">
            Đăng nhập
          </button>
          <div className="mt-2 text-center lg:text-start">Quên mật khẩu ?</div>
        </div>
        <div className="divider">
          <span>HOẶC</span>
        </div>
      </form>
      <div className="gap-3 lg:flex">
        <button className="mt-7 w-full cursor-pointer rounded border p-1">
          <FontAwesomeIcon icon={["fab", "facebook"]} />
          Facebook
        </button>
        <button className="mt-7 w-full cursor-pointer rounded border p-1">
          Google
        </button>
      </div>
      <div className="mt-2 lg:mt-5 lg:text-center">
        Bạn mới biết đến Shopee?{" "}
        <Link to={"/register"} className="cursor-pointer text-[#EE4D2D]">
          Đăng ký
        </Link>
      </div>
    </div>
  );
};

export default Login;
