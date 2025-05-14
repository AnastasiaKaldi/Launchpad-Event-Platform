import "./App.css";
import "./index.css";
import React from "react";
import { Link } from "react-router-dom";

const EventsPage = () => {
  return (
    <section className="bg-[#FBE7B2] py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-12">
          {/* Repeat this article block 9 times with different content or images */}

          {[
            {
              title: "The Pines and the Mountains",
              img: "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?auto=format&fit=crop&w=1170&q=80",
            },
            {
              title: "The Coding Mania",
              img: "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=1170&q=80",
            },
            {
              title: "Architectural Warfare",
              img: "https://images.unsplash.com/photo-1496395031280-4201b0e022ca?auto=format&fit=crop&w=2070&q=80",
            },
            {
              title: "Blues in Architecture",
              img: "https://images.unsplash.com/photo-1510081887155-56fe96846e71?auto=format&fit=crop&w=715&q=80",
            },
            {
              title: "Tech Gala 2022",
              img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1170&q=80",
            },
            {
              title: "Design Fest",
              img: "https://images.unsplash.com/photo-1502767089025-6572583495b4?auto=format&fit=crop&w=1170&q=80",
            },
            {
              title: "Innovators Meetup",
              img: "https://images.unsplash.com/photo-1559027615-5b6f84f5b723?auto=format&fit=crop&w=1170&q=80",
            },
            {
              title: "Urban Culture Expo",
              img: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1170&q=80",
            },
            {
              title: "Art in Motion",
              img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1170&q=80",
            },
          ].map((event, index) => (
            <article
              key={index}
              className="flex flex-col items-center gap-4 md:flex-row lg:gap-6"
            >
              <a
                href="#"
                className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
              >
                <img
                  src={event.img}
                  loading="lazy"
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">April 2, 2022</span>

                <h2 className="text-xl font-bold text-gray-800">
                  <Link
                    to="/event"
                    className="transition duration-100 hover:text-rose-500 active:text-rose-600"
                    style={{ fontFamily: "Inknut Antiqua" }}
                  >
                    {event.title}
                  </Link>
                </h2>

                <p
                  className="text-gray-500"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
                  necessitatibus molestias explicabo.
                </p>

                <div>
                  <Link
                    to="/event"
                    className="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700"
                    style={{ fontFamily: "Inknut Antiqua" }}
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
