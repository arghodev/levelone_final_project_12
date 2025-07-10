import { Helmet } from "react-helmet-async";
import TitleSection from "../../components/shared/TitleSection";
import { Parallax } from "react-parallax";
import useMenu from "../../hooks/useMenu";
import type { MenuItem } from "../../types/propsTypes";
import SkeletenLoader from "../../components/shared/SkeletonLoader";
import { Link } from "react-router";
import { useState } from "react";

const MenuPage = () => {
  const { menu, loading } = useMenu();
  const [visibleCount, setVisibleCount] = useState(6);

  const popular = menu.filter((item: MenuItem) => item.category === "popular");

  const drinks = menu.filter((item: MenuItem) => item.category === "drinks");
  // console.log(menu);

  // if (loading) {
  //   return <SkeletenLoader />;
  // }

  // const offered = menu.filter((item: any) => item.category === "offered");
  // const dessert = menu.filter((item: any) => item.category === "dessert");
  // const drinks = menu.filter((item: any) => item.category === "drinks");

  return (
    <section className="mt-19 ">
      <Helmet>
        <title>Project 12 | Menu </title>
      </Helmet>
      <div>
        <Parallax
          blur={{ min: -15, max: 20 }}
          bgImage={
            "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
          }
          strength={-100}
        >
          <section className=" ">
            <div className="  container  p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between relative">
              <div className="absolute  left-0 right-0 top-1/7 mx-auto h-96   rounded-sm  bg-black/60 w-2/3 "></div>
              <div className="flex flex-col justify-center p-6 item-center  rounded-sm lg:max-w-md xl:max-w-lg lg:text-left w-1/2 mx-auto text-white">
                <h1 className="text-5xl font-bold leading-none sm:text-6xl text-center z-10">
                  Ac mattis
                  <span className=" text-amber-600">senectus</span>
                  <br />
                  pharetra
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
        <div>
          <TitleSection heading="From our Menu" subheading="check it out" />
        </div>

        {loading ? (
          <SkeletenLoader />
        ) : (
          <div className="grid grid-cols-2  gap-4  overflow-hidden  p-10">
            {drinks.map(({ name, image, price }, index) => (
              <div className=" flex  " key={index}>
                <div className="  p-2">
                  <img
                    src={image}
                    alt=""
                    className="object-cover overflow-hidden  w-40 mx-auto h-32 rounded-bl-full rounded-br-full rounded-tr-full"
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <h1 className="text-xl font-bold flex items-center justify-between">
                    {name} ----------{" "}
                    <span className="text-yellow-500"> ${price}</span>
                  </h1>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vitae, facilis.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mb-5 ">
          <Link to={`/order`}>
            <button className=" rounded border-0 border-b-2 px-4 py-2 hover:bg-black hover:text-white transition duration-300 mt-5 cursor-pointer">
              Order Now
            </button>
          </Link>
        </div>
      </div>

      <div>
        <Parallax
          blur={{ min: -15, max: 20 }}
          bgImage={
            "https://images.pexels.com/photos/958546/pexels-photo-958546.jpeg"
          }
          strength={-100}
        >
          <section className="">
            <div className="  container  p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between relative">
              <div className="absolute  left-0 right-0 top-1/7 mx-auto h-96   rounded-sm  bg-black/60 w-2/3 "></div>
              <div className="flex flex-col justify-center p-6 item-center  rounded-sm lg:max-w-md xl:max-w-lg lg:text-left w-1/2 mx-auto text-white">
                <h1 className="text-5xl font-bold leading-none sm:text-6xl text-center z-10">
                  Ac mattis
                  <span className=" text-amber-600">senectus</span>
                  <br />
                  pharetra
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
        <div>
          <TitleSection heading="From our Menu" subheading="check it out" />
        </div>

        <div className="grid grid-cols-2  gap-4  overflow-hidden  p-10">
          {popular.map(({ name, image, price }, index) => (
            <div className=" flex  " key={index}>
              <div className="  p-2">
                <img
                  src={image}
                  alt=""
                  className="object-cover overflow-hidden  w-40 mx-auto h-32 rounded-bl-full rounded-br-full rounded-tr-full"
                />
              </div>
              <div className=" flex flex-col gap-2">
                <h1 className="text-xl font-bold flex items-center justify-between">
                  {name} ----------{" "}
                  <span className="text-yellow-500"> ${price}</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Vitae, facilis.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mb-5 ">
          <Link to="/order">
            <button className=" rounded border-0 border-b-2 px-4 py-2 hover:bg-black hover:text-white transition duration-300 mt-5 cursor-pointer">
              Order Now
            </button>
          </Link>
        </div>
      </div>

      <div>
        <section className=" feature-item">
          <div className="  container  p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between relative">
            <div className="absolute  left-0 right-0 top-1/7 mx-auto h-96   rounded-sm  bg-black/60 w-2/3 "></div>
            <div className="flex flex-col justify-center p-6 item-center  rounded-sm lg:max-w-md xl:max-w-lg lg:text-left w-1/2 mx-auto text-white">
              <h1 className="text-5xl font-bold leading-none sm:text-6xl text-center z-10">
                Ac mattis
                <span className=" text-amber-600">senectus</span>
                <br />
                pharetra
              </h1>
              <p className="mt-6 mb-8 text-lg sm:mb-12 z-10">
                Dictum aliquam porta in condimentum ac integer
                <br className="hidden md:inline lg:hidden" />
                turpis pulvinar, est scelerisque ligula sem
              </p>
            </div>
          </div>
        </section>

        <div>
          <TitleSection heading="From our Menu" subheading="check it out" />
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-hidden p-10">
          {menu.slice(0, visibleCount).map(({ name, image, price }, index) => (
            <div className="flex" key={index}>
              <div className="p-2">
                <img
                  src={image}
                  alt=""
                  className="object-cover overflow-hidden w-40 mx-auto h-32 rounded-bl-full rounded-br-full rounded-tr-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold flex items-center justify-between">
                  {name} ----------{" "}
                  <span className="text-yellow-500">${price}</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Vitae, facilis.
                </p>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < menu.length && (
          <div className="text-center mb-10">
            <button
              onClick={() => setVisibleCount(menu.length)}
              className="rounded border-0 border-b-2 px-4 py-2 hover:bg-black hover:text-white transition duration-300 mt-5 cursor-pointer"
            >
              Load All
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuPage;
