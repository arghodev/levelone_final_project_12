import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import ThemeController from "../ThemeController";

const Navber = () => {
  const { user, logOut } = useAuth();

  const { data: cart } = useCart();
  // console.log(cart?.length);

  const nav = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Menu",
      path: "/menu",
    },
    {
      name: "Order",
      path: "/order",
    },
    // {
    //   name: "Login",
    //   path: "/login",
    // },
  ];

  return (
    <section>
      <nav className="bg-gray-500 flex items-center justify-around text-white p-4 fixed top-0 left-0 right-0 z-50 ">
        <div className="flex items-center gap-2 ">
          <img
            src="./src/assets/logo.png"
            alt=""
            className="size-14 animate-pulse"
          />
          <h2 className="text-3xl font-bold ">Bistro Boss</h2>
        </div>
        <div>
          <ul className="flex space-x-4 font-black">
            {nav.map((item) => (
              <li
                key={item.name}
                className=" p-2 rounded transition-all duration-300 "
              >
                <Link to={item.path}>
                  <div className="relative overflow-hidden group text-xl">
                    <span className="invisible"> {item.name} </span>
                    <span className="absolute top-0 left-0 group-hover:-translate-y-full transition-transform ease-in-out duration-500 hover:duration-300">
                      {item.name}
                    </span>
                    <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out duration-500 hover:duration-300">
                      {item.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-10">
          <Link to={"/dashboard/cart"}>
            <div className="flex items-center  ">
              <div className="indicator ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
                </svg>
                <span className="badge badge-md indicator-item font-bold bg-success border-0 text-white">
                  +{cart?.length}
                </span>
              </div>
            </div>
          </Link>
          <div>
            {user ? (
              <button
                className=" p-2 rounded transition-all duration-300 cursor-pointer btn btn-wide dark:btn btn-warning btn-soft text-white"
                onClick={logOut}
              >
                Logout
              </button>
            ) : (
              <button className="hover:bg-gray-700 p-2 rounded transition-all duration-300 cursor-pointer btn btn-wide btn-warning btn-soft text-white dark:btn">
                <Link to="/login">Login</Link>
              </button>
            )}
          </div>
          <div>
            <ThemeController></ThemeController>
          </div>
          {user ? (
            <div>
              <div className="  shadow-sm">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn w-14 btn-ghost btn-circle avatar"
                  >
                    <div className="w-16 rounded-full">
                      <img alt="photo" src={user?.photoURL ?? undefined} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow bg-blue-500"
                  >
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </section>
  );
};

export default Navber;
