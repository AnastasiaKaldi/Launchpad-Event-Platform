import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Custom icons
import ticketingIcon from "../src/assets/ticket.png";
import lowFeesIcon from "../src/assets/money.png";
import partnershipIcon from "../src/assets/handshake.png";
import happyIcon from "../src/assets/happy.png";
import createEvent from "../src/assets/createEvent.png";

axios.defaults.withCredentials = true;

function CreateEvent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/auth/me")
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleCreateClick = () => {
    if (isAuthenticated) {
      navigate("/orgevent");
    } else {
      navigate("/signin?redirect=/orgevent");
    }
  };

  const features = [
    {
      title: "Event Ticketing",
      text: "Sell more tickets with customisable event pages and a seamless checkout experience.",
      icon: ticketingIcon,
    },
    {
      title: "Low-Cost Fees",
      text: "Clear value, transparent fees. So you can focus on the important things.",
      icon: lowFeesIcon,
    },
    {
      title: "Partnership",
      text: "Partner with the best and discover solutions for events of all kinds and sizes.",
      icon: partnershipIcon,
    },
    {
      title: "Happy Customers",
      text: "Reach the right people. Grow your community where thousands search for things to do.",
      icon: happyIcon,
    },
  ];

  return (
    <section
      id="create-events"
      className="min-h-screen bg-[#dbd5c5] flex items-center justify-center px-4 py-20"
    >
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-12 items-start">
        {/* LEFT SIDE: Main content */}
        <div className="flex-1">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-xl text-center mx-auto">
              <span className="absolute left-1/2 -translate-x-1/2 -top-4 h-2 w-14 bg-[#620808]"></span>
              <h2
                className="text-5xl font-bold leading-9 text-[#620808]"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                Event Hosting Made Easy
              </h2>
              <p
                className="text-[#620808] text-xl mt-2"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                Easily create events for free on a platform that attendees love
                and trust
              </p>
            </div>

            {/* Feature Cards */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:mt-24 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative rounded-xl border-t-4 border-[#a57575] bg-[#BA7F7F] shadow"
                >
                  <div className="flex flex-col items-center py-10">
                    <div className="-mt-20 flex h-20 w-20 items-center justify-center rounded-full bg-[#dbd5c5]">
                      <img
                        src={feature.icon}
                        alt={`${feature.title} Icon`}
                        className="h-10 w-10"
                      />
                    </div>
                    <span
                      className="mt-3 font-medium capitalize text-[#dbd5c5] text-2xl"
                      style={{ fontFamily: "Inknut Antiqua" }}
                    >
                      {feature.title}
                    </span>
                    <p
                      className="mt-3 text-center text-[#dbd5c5] text-lg"
                      style={{ fontFamily: "Inknut Antiqua" }}
                    >
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-16 flex justify-center">
              <button
                onClick={handleCreateClick}
                className="bg-[#620808] text-[#dbd5c5] px-6 py-3 text-lg font-semibold rounded-lg shadow hover:bg-[#5a1b1b] transition duration-300"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                Create Your Own Event
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Image */}
        <div className="hidden lg:flex w-full max-w-md justify-center items-start pt-8">
          <img
            src={createEvent}
            alt="Create Event Illustration"
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default CreateEvent;
