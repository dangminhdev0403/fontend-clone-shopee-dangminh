import { BorderRight } from "@components/Icon";
import Logo from "@components/Icon/Logo";
import { FiSearch } from "react-icons/fi";

import { DropdownMenu } from "@components/Dropdown";
import {
  faFacebook,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faCartShopping,
  faChevronDown,
  faCircleQuestion,
  faEarthAsia,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { language, profile } from "@utils/items.dropdown";
import { useState } from "react";
import { NavLink } from "react-router";

const Header = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tìm kiếm:", query);
    // Thực hiện tìm kiếm tại đây
  };

  const handleChangeLanguege = (item: string) => {
    console.log("Thay đổi ngôn ngữ" + item);
  };
  return (
    <header className="max-w-6xl bg-[#fb5831] lg:max-w-full">
      <nav className="hidden justify-around pt-1.5 text-sm font-medium text-white lg:flex">
        <div className="flex gap-1">
          <NavLink to={"/"} className="relative mr-2 pr-2">
            Kênh Người Bán <BorderRight />{" "}
          </NavLink>
          <NavLink to={"/sellers"} className="relative mr-2 pr-2">
            Trở thành Người bán Shopee <BorderRight />{" "}
          </NavLink>
          <NavLink to={"/download"} className="relative mr-2 pr-2">
            Tải ứng dụng <BorderRight />{" "}
          </NavLink>
          <NavLink to={"/connect"}>Kết nối</NavLink>
          <NavLink to={"/face1"} className={"ml-2"}>
            <FontAwesomeIcon icon={faFacebook} />{" "}
          </NavLink>
          <NavLink to={"/fa1ce"} className={"ml-2"}>
            <FontAwesomeIcon icon={faSquareInstagram} />{" "}
          </NavLink>
        </div>
        <div className="flex gap-1">
          <NavLink to={"/noti"} className="relative mr-2 pr-2">
            <FontAwesomeIcon icon={faBell} className="mr-1" />
            Thông báo
          </NavLink>
          <NavLink to={"/question"} className="relative mr-2 pr-2">
            <FontAwesomeIcon icon={faCircleQuestion} className="mr-1" />
            Hỗ Trợ
          </NavLink>
          <div className="relative mr-2 pr-2">
            <DropdownMenu
              label="Tiếng Việt"
              items={language}
              icon={<FontAwesomeIcon icon={faEarthAsia} />}
            />

            <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
          </div>
          {/* <div>
            <NavLink to={"/register"} className="relative mr-2 pr-2">
              Đăng Ký <BorderRight />{" "}
            </NavLink>
            <NavLink to={"/login"}>Đăng Nhập </NavLink>
          </div> */}
          <div className="flex items-center gap-2">
            <DropdownMenu
              label="username"
              items={profile}
              colorActive={"#00bfa5"}
              icon={
                <img
                  className="rounded-full"
                  width={22}
                  height={22}
                  src="https://static.vecteezy.com/system/resources/previews/024/183/535/original/male-avatar-portrait-of-a-young-man-with-glasses-illustration-of-male-character-in-modern-color-style-vector.jpg"
                  alt=""
                />
              }
              onItemClick={handleChangeLanguege}
            />
          </div>
        </div>
      </nav>
      <div className="flex w-full items-center px-2 py-2.5 pb-7 lg:justify-between lg:px-40">
        <div className="flex w-full items-end justify-center">
          <Logo />
          <div className="mx-auto mt-4 w-full max-w-3xl">
            <form
              onSubmit={handleSubmit}
              className="flex overflow-hidden rounded-md bg-white shadow-sm"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Shopee bao ship 0Đ - Đăng ký ngay!"
                className="flex-grow px-4 py-2 text-gray-700 outline-none"
              />
              <button
                type="submit"
                title="Search"
                className="flex cursor-pointer items-center justify-center border-4 border-white bg-[#f53d2d] px-4 text-white transition hover:opacity-90"
              >
                <FiSearch size={15} />
              </button>
            </form>
          </div>

          <div className="ml-4">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="rounded-full border border-white p-2 text-white"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
