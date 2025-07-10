interface TitleSectionProps {
  heading: string;
  subheading: string;
}

const TitleSection = ({ heading, subheading }: TitleSectionProps) => {
  return (
    <section>
      <div className="text-center m-10 w-1/2 mx-auto display ">
        <p className="italic text-yellow-500"> ---- {subheading} ---- </p>
        <h1 className="text-4xl border-zinc-300 border-t-3 border-b-3 py-2 uppercase">
          {heading}
        </h1>
      </div>
    </section>
  );
};

export default TitleSection;
