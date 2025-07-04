import TitleSection from "./shared/TitleSection";
import "../index.css";
const FeatureItem = () => {
  return (
    <section className="">
      <div>
        <TitleSection heading="Feature Item" subheading="check it out" />
      </div>
      <div className="feature-item bg-fixed relative  flex  px-10 py-20 gap-10">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-10 "></div>
        <div className=" w-[300vw] z-20 rounded-2xl overflow-hidden">
          <img
            src="https://thumbs.dreamstime.com/b/unhealthy-fast-food-delivery-menu-featuring-assorted-burgers-cheeseburgers-nuggets-french-fries-soda-high-calorie-low-356045884.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-white z-20">
          <h1 className="text-3xl font-extrabold uppercase ">feauter</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            illum, quaerat labore commodi, vero dolores obcaecati fuga
            temporibus voluptates architecto praesentium ut laborum nemo
            incidunt itaque maiores voluptate odit neque quam aperiam ratione
            tempore enim. Saepe aperiam molestias quaerat excepturi quasi iste
            natus debitis, ipsam, sed, pariatur hic obcaecati odit!
          </p>
        <button className=" rounded border-0 border-b-2 px-4 py-2 hover:bg-white hover:text-black transition duration-300 mt-5">Order Now</button>
        </div>
      </div>
    </section>
  );
};

export default FeatureItem;
