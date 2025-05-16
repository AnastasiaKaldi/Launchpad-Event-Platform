// LandingPage.jsx
import React from "react";
import Homepage from "./Homepage";
import EventsPage from "./EventsPage";
import CreateEvent from "../src/Createevent";
import Footer from "./Footer";

const LandingPage = () => {
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
