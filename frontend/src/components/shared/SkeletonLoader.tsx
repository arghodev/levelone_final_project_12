const SkeletenLoader = () => {
  return (
    <section className="flex justify-center items-center gap-5  h-screen ">
      <div className="flex w-52 flex-col gap-4 ">
        <div className="skeleton h-32 w-full bg-slate-300"></div>
        <div className="skeleton h-4 w-28 bg-slate-300"></div>
        <div className="skeleton h-4 w-full bg-slate-300"></div>
        <div className="skeleton h-4 w-full bg-slate-300"></div>
      </div>
      <div className="flex w-52 flex-col gap-4 ">
        <div className="skeleton h-32 w-full bg-slate-300"></div>
        <div className="skeleton h-4 w-28 bg-slate-300"></div>
        <div className="skeleton h-4 w-full bg-slate-300"></div>
        <div className="skeleton h-4 w-full bg-slate-300"></div>
      </div>
    </section>
  );
};

export default SkeletenLoader;
