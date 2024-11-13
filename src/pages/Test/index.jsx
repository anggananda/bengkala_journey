import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ScrollableSections() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="space-y-10 py-10">
      {/* Section 1 */}
      <section
        className="min-h-screen flex items-center justify-center bg-blue-100"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold">Section 1: Welcome</h2>
      </section>

      {/* Section 2 */}
      <section
        className="min-h-screen flex items-center justify-center bg-green-100"
        data-aos="fade-left"
      >
        <h2 className="text-3xl font-bold">Section 2: About Us</h2>
      </section>

      {/* Section 3 */}
      <section
        className="min-h-screen flex items-center justify-center bg-yellow-100"
        data-aos="fade-right"
      >
        <h2 className="text-3xl font-bold">Section 3: Our Services</h2>
      </section>

      {/* Section 4 */}
      <section
        className="min-h-screen flex items-center justify-center bg-red-100"
        data-aos="zoom-in"
      >
        <h2 className="text-3xl font-bold">Section 4: Contact Us</h2>
      </section>
    </div>
  );
}

export default ScrollableSections;
