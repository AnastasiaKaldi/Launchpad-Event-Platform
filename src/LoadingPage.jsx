// LandingPage.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Homepage from "./Homepage";
import EventsPage from "./EventsPage";
import CreateEvent from "../src/CreateEvent";
import Footer from "./Footer";

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="overflow-x-hidden bg-[#dbd5c5]">
      <Homepage />
      <EventsPage />
      <CreateEvent />
      <Footer />
    </div>
  );
};

export default LandingPage;
