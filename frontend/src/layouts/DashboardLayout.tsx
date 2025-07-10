import {
  FaBookOpen,
  FaCalendarAlt,
  FaCartArrowDown,
  FaListUl,
  FaUser,
} from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { IoIosBookmarks } from "react-icons/io";
import { IoHome, IoReorderFour } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import useIsAdmin from "../hooks/useIsAdmin";
import SkeletenLoader from "../components/shared/SkeletonLoader";
import { useEffect } from "react";

const adminMenu = [
  { to: "/dashboard/adminHome", label: "Admin Home", icon: <IoHome /> },
  { to: "/dashboard/addItem", label: "Add Item", icon: <FaCartArrowDown /> },
  {
    to: "/dashboard/manageItems",
    label: "Manage Items ",
    icon: <FaListUl />,
  },
  {
    to: "/dashboard/manageBooking",
    label: "Manage Booking",
    icon: <FaBookOpen />,
  },
  { to: "/dashboard/allUsers", label: "All Users", icon: <FaUser /> },
];

const userMenu = [
  { to: "/dashboard/userHome", label: "User Home", icon: <IoHome /> },
  { to: "/dashboard/cart", label: "My Cart", icon: <FaCartArrowDown /> },
  {
    to: "/dashboard/reservation",
    label: "Reservation",
    icon: <FaCalendarAlt />,
  },
  { to: "/dashboard/review", label: "Add Review", icon: <GiStarsStack /> },
  { to: "/dashboard/booking", label: "My Booking", icon: <IoIosBookmarks /> },
];

const mainNav = [
  { to: "/", label: "Home", icon: <IoHome /> },
  { to: "/order", label: "Order", icon: <IoReorderFour /> },
  { to: "/menu", label: "Menu", icon: <MdMenuBook /> },
];

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const { isAdmin, isAdminLoading } = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminLoading) return;
    if (isAdmin) {
      navigate("/dashboard/allUsers", { replace: true });
    } else {
      navigate("/dashboard/cart", { replace: true });
    }
  }, [isAdmin, isAdminLoading, navigate]);

  if (isAdminLoading) {
    return <SkeletenLoader />;
  }
  // console.log(isAdmin);

  const activeClass = "text-white bg-black font-bold underline transition-all duration-300";
  const inactiveClass = "text-black";

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeClass : inactiveClass;

  const renderMenu = (items: typeof adminMenu) =>
    items.map(({ to, label, icon }) => (
      <li key={to}>
        <NavLink to={to} className={navItemClass}>
          {icon}
          {label}
        </NavLink>
      </li>
    ));

  return (
    <section className="flex min-h-screen">
      <div className="w-96 bg-yellow-500 p-10 flex flex-col items-center">
        {/* ✅ Role-based Menu */}
        <ul className="menu menu-xl gap-3 p-4 rounded-2xl drop-shadow-lg">
          {renderMenu(isAdmin ? adminMenu : userMenu)}
        </ul>

        <div className="divider" />

        {/* ✅ Main Navigation */}
        <ul className="menu menu-xl w-56 gap-3 p-4 rounded-2xl text-white drop-shadow-lg ">
          {mainNav.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-bold underline"
                    : "text-black/60"
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="divider" />

        <div className="flex justify-center items-center w-full p-5">
          <button onClick={() => logOut()} className="btn btn-wide ">
            Log out
          </button>
        </div>
      </div>

      <div className="w-full  flex-1 p-10">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;
