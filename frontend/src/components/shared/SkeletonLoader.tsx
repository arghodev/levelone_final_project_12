const SkeletenLoader = () => {
  return (
    <section className="flex justify-center items-center  ">
      <div className=" py-5 my-10 rounded shadow-md  sm:w-96 animate-pulse w-96 bg-gray-100">
        <div className="flex p-4 space-x-4 sm:px-8">
          <div className="flex-shrink-0 w-16 h-16 rounded-full "></div>
          <div className="flex-1 py-2 space-y-4 ">
            <div className="w-full h-3 rounded "></div>
            <div className="w-5/6 h-3 rounded "></div>
          </div>
        </div>
        <div className="p-4 space-y-4 sm:px-8">
          <div className="w-full h-4 rounded "></div>
          <div className="w-full h-4 rounded "></div>
          <div className="w-3/4 h-4 rounded "></div>
        </div>
      </div>
    </section>
  );
};

export default SkeletenLoader;
