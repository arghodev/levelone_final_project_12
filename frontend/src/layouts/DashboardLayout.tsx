import { FaCalendarAlt, FaCartArrowDown } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { IoIosBookmarks } from "react-icons/io";
import { IoHome, IoReorderFour } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <section className="flex min-h-screen  ">
      <div className="w-96 bg-black/50 p-10 flex justify-center items-center flex-col">
        <ul className="menu menu-xl w-56 gap-3 bg-gray-400 p-4 rounded-2xl text-white drop-shadow-lg">
          <li className="  ">
            <NavLink
              to={"/dashboard/userHome"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold underline" : "text-gray-700"
              }
            >
              <IoHome />
              User Home
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/dashboard/cart"}
              className={({ isActive }) =>
                isActive ? "text-white font-bold underline" : "text-gray-700"
              }
            >
              <FaCartArrowDown />
              My Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/reservation"}
              className={({ isActive }) =>
                isActive ? "text-white font-bold underline" : "text-gray-700"
              }
            >
              <FaCalendarAlt />
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/review"}
              className={({ isActive }) =>
                isActive ? "text-white font-bold underline" : "text-gray-700"
              }
            >
              <GiStarsStack />
              Add Review
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/booking"}
              className={({ isActive }) =>
                isActive ? "text-white font-bold underline" : "text-gray-700"
              }
            >
              <IoIosBookmarks />
              My Booking
            </NavLink>
          </li>
        </ul>
        <div className="divider"></div>
        <ul className="menu menu-xl w-56 gap-3  p-4 rounded-2xl text-white
        drop-shadow-lg ">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold underline" : "text-gray-700"
              }
            >
              <IoHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/order"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold underline" : "text-gray-700"
              }
            >
              <IoReorderFour />
              Order
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/menu"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold underline" : "text-gray-700"
              }
            >
              <MdMenuBook />
              Menu
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-full bg-blue-100 flex-1 p-10">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;
