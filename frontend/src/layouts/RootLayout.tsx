import { Outlet } from "react-router";
import Navber from "../components/shared/Navber";
import Footer from "../components/shared/Footer";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const RootLayout = () => {
  // useGSAP(() => {
  //   ScrollSmoother.create({
  //     smooth: 2,
  //     effects: true,
  //   });
  // });

  return (
    <section>
      <div id="smooth-wrapper">
        <nav>
          <Navber />
        </nav>
        <div id="smooth-content">
          <main className="min-h-screen">
            <Outlet />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </section>
  );
};

export default RootLayout;
