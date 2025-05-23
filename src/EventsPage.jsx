import "./App.css";
import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import coorporation from "../src/assets/cooperation.png";
import hobby from "../src/assets/hobby.png";
import music from "../src/assets/musical-notes.png";
import nightlife from "../src/assets/nightlife.png";
import food from "../src/assets/ramen.png";
import festival from "../src/assets/decoration.png";
import familyEvent from "../src/assets/familyEvent.png";
import { useEffect, useState } from "react";

const filterOptions = [
  { label: "Music", image: music },
  { label: "Nightlife", image: nightlife },
  { label: "Hobbies", image: hobby },
  { label: "Business", image: coorporation },
  { label: "Food & Drink", image: food },
  { label: "Festivals", image: festival },
  { label: "Family Events", image: familyEvent },
];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:5050/api/events");
      const data = await res.json();
      console.log("🔥 Events from backend:", data);
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const toggleCategory = (label) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const filteredEvents =
    selectedCategories.size > 0
      ? events.filter((event) => selectedCategories.has(event.category))
      : events;

  return (
    <section id="events" className="bg-[#dbd5c5] py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-[80%] px-4 md:px-8">
        {/* Show All / Clear Filters Button */}
        {selectedCategories.size > 0 && (
          <div className="mb-6 text-center">
            <button
              onClick={() => setSelectedCategories(new Set())}
              className="px-4 py-2 rounded border-2 border-[#620808] text-[#620808] hover:bg-[#620808] hover:text-[#dbd5c5] transition"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Show All
            </button>
          </div>
        )}

        {/* Filter Bubble Row */}
        <div className="mb-10 flex flex-wrap justify-center gap-4 md:gap-6">
          {filterOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => toggleCategory(option.label)}
              className={`flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 transition duration-200 shadow ${
                selectedCategories.has(option.label)
                  ? "bg-[#620808] text-[#dbd5c5]"
                  : "bg-[#dbd5c5] text-[#620808] hover:bg-[#620808] hover:text-[#dbd5c5]"
              }`}
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              <img
                src={option.image}
                alt={option.label}
                className="w-8 h-8 object-contain mb-1"
              />
              <span className="text-md text-center leading-tight">
                {option.label}
              </span>
            </button>
          ))}
        </div>
        {/* Title and Description */}
        <div className="mb-10 md:mb-16">
          <h2
            className="mb-4 text-left text-5xl font-bold text-[#620808] md:mb-6"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Events in your area
          </h2>
          <p
            className="text-left max-w-screen-md text-[#620808] md:text-lg"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            Find the perfect events for you
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-12">
          {filteredEvents.map((event, index) => (
            <article
              key={index}
              className="flex flex-col items-center gap-4 md:flex-row lg:gap-6"
            >
              <div className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <h2
                  className="text-xl font-bold text-gray-800"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  {event.title}
                </h2>
                <p
                  className="text-gray-500"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  {event.description}
                </p>
                <Link
                  to="/event"
                  className="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
