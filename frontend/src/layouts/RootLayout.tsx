import { Outlet } from "react-router";
import Navber from "../components/shared/Navber";
import Footer from "../components/shared/Footer";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const RootLayout = () => {
  useGSAP(() => {
    // Only initialize if not already created
    if (!ScrollSmoother.get()) {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,
        effects: true,
      });
    } else {
      ScrollSmoother.get()?.refresh();
    }
  }, []);

  return (
    <section className="lato">
      <div id="smooth-wrapper">
        <nav>
          <Navber />
        </nav>
        <div
          id="smooth-content"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <main className="min-h-screen" style={{ flexGrow: 1 }}>
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
