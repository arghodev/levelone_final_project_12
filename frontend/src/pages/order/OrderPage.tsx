import { Parallax } from "react-parallax";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../hooks/useMenu";
import type { MenuItem } from "../../types/propsTypes";
import SkeletenLoader from "../../components/shared/SkeletonLoader";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const OrderPage = () => {
  const [menu, loading] = useMenu();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const axiosSecure = useAxiosSecure();
  const { refetch } = useCart();

  const Salad = menu.filter((item: MenuItem) => item.category === "salad");
  const drinks = menu.filter((item: MenuItem) => item.category === "drinks");

  const handleAddCart = async (item: MenuItem) => {
    if (user && user.email) {
      const cart = {
        menuid: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        email: user.email,
      };

      // console.log(menu);

      axiosSecure.post("/carts", cart).then((res) => {
        if (res.data.insertedId) {
          refetch();
        }
        console.log(res.data);
      });
    } else {
      navigate("/login", { state: { from: location } });
      alert("Please login first");
    }
  };

  if (loading) {
    return <SkeletenLoader />;
  }

  return (
    <section className="">
      <Helmet>
        <title>Project 12 | Order </title>
      </Helmet>

      <div className=" mt-20">
        <Parallax
          blur={{ min: -15, max: 20 }}
          bgImage={
            "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
          }
          strength={-100}
        >
          <section className=" ">
            <div className="  container  p-6 mx-auto  sm:py-12 lg:py-24 lg:flex-row lg:justify-between relative ">
              <div className="absolute  left-0 right-0 top-10 mx-auto h-96 bg-black/60 w-2/3 rounded-xl"></div>
              <div className="flex flex-col justify-center p-6 item-center  rounded-sm lg:max-w-md xl:max-w-lg lg:text-left w-1/2 mx-auto text-white">
                <h1 className="text-5xl font-bold leading-none sm:text-6xl text-center z-10">
                  Order
                  <span className=" text-amber-600"> Our</span>
                  <br />
                  Food
                </h1>
                <p className="mt-6 mb-8 text-lg sm:mb-12 z-10">
                  Dictum aliquam porta in condimentum ac integer
                  <br className="hidden md:inline lg:hidden" />
                  turpis pulvinar, est scelerisque ligula sem
                </p>
              </div>
            </div>
          </section>
        </Parallax>
      </div>

      <div className="container mx-auto  text-center my-10  overflow-hidden">
        <Tabs className="">
          <TabList className="space-x-5 border-b-3 w-1/2 mx-auto border-gray-200">
            <Tab>Salad</Tab>
            <Tab>Drinks</Tab>
          </TabList>

          <TabPanel className="mt-10">
            <div className="container mx-auto  flex flex-wrap items-center justify-around gap-5">
              {Salad.map((item: MenuItem) => (
                <div
                  key={item._id}
                  className="max-w-xs p-6 rounded-md shadow-md bg-zinc-500  relative"
                >
                  <div className="absolute top-0 right-0 px-6  text-base font-bold text-amber-500 bg-black rounded-l-2xl">
                    {" "}
                    $ {item.price}{" "}
                  </div>
                  <img
                    src={item.image}
                    alt=""
                    className="object-cover object-center w-full rounded-md h-72 "
                  />
                  <div className="mt-6 mb-2 text-white">
                    <span className="block text-xs font-medium tracking-widest uppercase ">
                      {item.category}
                    </span>
                    <h2 className="text-xl font-semibold tracking-wide">
                      Nam maximus purus
                    </h2>
                  </div>
                  <p className="text-white">
                    Mauris et lorem at elit tristique dignissim et ullamcorper
                    elit. In sed feugiat mi. Etiam ut lacinia dui.
                  </p>

                  <div>
                    <button
                      onClick={() => handleAddCart(item)}
                      className=" rounded bg-violet-500 text-white border-0  px-4 py-2 hover:bg-black hover:text-white transition duration-300 mt-5 cursor-pointer"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container mx-auto  flex items-center justify-around gap-2  py-10 ">
              {drinks.map((item: MenuItem) => (
                <div className="max-w-xs p-6 rounded-md shadow-lg bg-zinc-500 drop-shadow-xl ">
                  <img
                    src={item.image}
                    alt=""
                    className="object-cover object-center w-full rounded-md h-72 "
                  />
                  <div className="mt-6 mb-2">
                    <span className="block text-xs font-medium tracking-widest uppercase ">
                      {item.category}
                    </span>
                    <h2 className="text-xl font-semibold tracking-wide">
                      Nam maximus purus
                    </h2>
                  </div>
                  <p className="">
                    Mauris et lorem at elit tristique dignissim et ullamcorper
                    elit. In sed feugiat mi. Etiam ut lacinia dui.
                  </p>
                  <div>
                    <button
                      onClick={() => handleAddCart(item)}
                      className=" rounded bg-violet-500 text-white border-0  px-4 py-2 hover:bg-black hover:text-white transition duration-300 mt-5 cursor-pointer"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default OrderPage;
