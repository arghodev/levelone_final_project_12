import { useEffect, useState } from "react";
import TitleSection from "./shared/TitleSection";
import type { MenuItem } from "../types/propsTypes";

// interface MenuItem {
//   name: string;
//   image: string;
//   price: number;
//   category: string;
// }

const PopulerMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const populerdata = data.filter(
          (item: MenuItem) => item.category === "popular"
        );
        setMenu(populerdata);
      });
    //   setLoading(false);
  }, []);
  // console.log(menu);

  //   if (loading) {
  //     return <h1>Loading...</h1>;
  //   }
  return (
    <section className="container mx-auto my-10">
      <div>
        <TitleSection heading="From Our Menu" subheading="check it out" />
      </div>
      <div className="grid grid-cols-2  gap-4  overflow-hidden  py-10">
        {menu.map(({ name, image, price }, index) => (
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
                facilis.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopulerMenu;
