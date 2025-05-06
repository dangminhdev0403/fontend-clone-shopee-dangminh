import Footer from "@layouts/Footer";
import Header from "@layouts/Header";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
