import AuthHeader from "@layouts/AuthHeader";
import Footer from "@layouts/Footer";
import { Outlet } from "react-router";

const Auth = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />

      <main className="flex-1 bg-[#EE4D2D] px-6 py-10 lg:px-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
