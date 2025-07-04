import TitleSection from "./shared/TitleSection";

const Category = () => {
  return (
    <section className="container mx-auto my-10">
      <div>
        <TitleSection
          heading="Order now"
          subheading="From 11:00 am to 10:00 pm"
        />
      </div>
      <div className="grid grid-cols-3 gap-4  overflow-hidden  py-10">
        <div className="group overflow-hidden w-80 mx-auto h-96 rounded-2xl relative">
          <img
            src="src/assets/home/slide1.jpg"
            alt=""
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-125"
          />

          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-white/30 backdrop-blur-sm transition-all duration-300 h-20 group-hover:h-full ">
            <h1 className="text-3xl font-bold text-black">Pizza</h1>
          </div>
        </div>
        <div className="group overflow-hidden w-80 mx-auto h-96 rounded-2xl relative">
          <img
            src="src/assets/home/slide3.jpg"
            alt=""
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-125"
          />

          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-white/30 backdrop-blur-sm transition-all duration-300 h-20 group-hover:h-full ">
            <h1 className="text-3xl font-bold text-black">Pizza</h1>
          </div>
        </div>
        <div className="group overflow-hidden w-80 mx-auto h-96 rounded-2xl relative">
          <img
            src="src/assets/home/slide2.jpg"
            alt=""
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-125"
          />

          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-white/30 backdrop-blur-sm transition-all duration-300 h-20 group-hover:h-full ">
            <h1 className="text-3xl font-bold text-black">Pizza</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
