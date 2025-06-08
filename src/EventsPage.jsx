/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import coorporation from "../src/assets/cooperation.png";
import hobby from "../src/assets/hobby.png";
import music from "../src/assets/musical-notes.png";
import nightlife from "../src/assets/nightlife.png";
import food from "../src/assets/ramen.png";
import festival from "../src/assets/decoration.png";
import familyEvent from "../src/assets/familyEvent.png";
import loadingSpinner from "../src/assets/loading.gif";

const filterOptions = [
  { label: "music", image: music },
  { label: "nightlife", image: nightlife },
  { label: "hobbies", image: hobby },
  { label: "business", image: coorporation },
  { label: "food & drink", image: food },
  { label: "festivals", image: festival },
  { label: "family events", image: familyEvent },
  { label: "custom", image: null },
  { label: "other", image: null },
];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const ticketmasterRes = await fetch(
          import.meta.env.VITE_TICKETMASTER_API
        );
        const ticketmasterData = await ticketmasterRes.json();

        const tmEvents =
          ticketmasterData._embedded?.events.map((e) => ({
            title: e.name,
            image_url: e.images?.[0]?.url || "",
            date: e.dates?.start?.localDate || "",
            description: e.info || e.pleaseNote || "No description provided",
            category: (e.classifications?.[0]?.segment?.name || "Other")
              .trim()
              .toLowerCase(),
            url: e.url || "#",
          })) || [];

        const localRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events`,
          {
            credentials: "include",
          }
        );

        const localData = await localRes.json();

        const localEvents = localData.map((e) => ({
          title: e.title,
          image_url: e.images?.[0] || "",
          date: e.datetime,
          description: e.summary || "No description provided",
          category: (e.category || "Custom").trim().toLowerCase(),
          url: `/event/${e.id}`,
        }));

        setEvents([...localEvents, ...tmEvents]);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  const toggleCategory = (label) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
  };

  const filteredEvents =
    selectedCategories.size > 0
      ? events.filter((event) =>
          selectedCategories.has((event.category || "").trim().toLowerCase())
        )
      : events;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#dbd5c5]">
        <img
          src={loadingSpinner}
          alt="Loading..."
          className="w-16 h-16 mb-4 animate-spin"
        />
        <p
          className="text-xl text-[#620808] font-semibold"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          Fetching the latest events for you...
        </p>
      </div>
    );
  }

  return (
    <section className="bg-[#dbd5c5] py-10 min-h-screen" id="events">
      <div className="max-w-[75%] mx-auto px-4">
        <div className="mb-10 flex flex-wrap justify-center gap-4 md:gap-6">
          {filterOptions.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => toggleCategory(option.label)}
              className={`flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 transition duration-200 shadow text-center text-sm font-medium ${
                selectedCategories.has(option.label)
                  ? "bg-[#620808] text-[#dbd5c5]"
                  : "bg-[#dbd5c5] text-[#620808] hover:bg-[#620808] hover:text-[#dbd5c5]"
              }`}
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              {option.image && (
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-8 h-8 object-contain mb-1"
                />
              )}
              <span>{option.label}</span>
            </motion.button>
          ))}
          {selectedCategories.size > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-4 py-2 border-2 border-[#620808] text-[#620808] rounded-full transition hover:bg-[#620808] hover:text-[#dbd5c5]"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Show All
            </motion.button>
          )}
        </div>

        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-[#620808] mb-4 text-left"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          Browse All Events
        </motion.h1>
        <motion.h3
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg font-bold text-[#620808] mb-8 text-left"
          style={{ fontFamily: "Inknut Antiqua" }}
        >
          Find your favourite events
        </motion.h3>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents.map((event, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
            >
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <span className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <h2
                  className="text-lg font-bold text-[#620808]"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  {event.title}
                </h2>
                <p
                  className="text-gray-700 text-sm"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  {event.description}
                </p>
                <span className="text-xs text-gray-400 italic">
                  Category: {event.category}
                </span>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-rose-500 hover:text-rose-600 text-sm font-semibold"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Read more
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
