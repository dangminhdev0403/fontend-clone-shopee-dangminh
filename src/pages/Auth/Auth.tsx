import AuthHeader from "@layouts/AuthHeader";
import Footer from "@layouts/Footer";
import { Outlet } from "react-router";

const Auth = () => {
  return (
    <>
      <AuthHeader />

      <div className="bg-[#EE4D2D] p-15 lg:p-20">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Auth;
