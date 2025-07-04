import Category from "../../components/Category";
import FeatureItem from "../../components/FeatureItem";
import Hero from "../../components/Hero";
import PopulerMenu from "../../components/PopulerMenu";
import ContactForm from "../contact/ContactForm";

const HomePage = () => {
  return (
    <section className="container mx-auto">
      <Hero />
      <Category />
      <PopulerMenu />
      <FeatureItem />
      <ContactForm />
    </section>
  );
};

export default HomePage;
