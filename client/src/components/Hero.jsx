"use client";

import { useEffect, useState } from "react";

const slides = [
  "/images/hero1.png",
  "/images/hero2.png",
  "/images/hero3.png",
  "/images/hero4.png",
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("Buy");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative min-h-[760px] overflow-hidden">
      {/* Background Slider */}
      <div
        className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${
            currentSlide * (100 / slides.length)
          }%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-full bg-cover bg-center"
            style={{
              width: `${100 / slides.length}%`,
              backgroundImage: `url(${slide})`,
            }}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Left Arrow */}
      <button
        onClick={previousSlide}
        className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-2xl text-white transition hover:bg-black"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-2xl text-white transition hover:bg-black"
      >
        ›
      </button>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-24 md:px-8 lg:pt-28">
        <div className="max-w-3xl text-white">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] md:text-base">
            Sales · Lettings · Room Let · Management
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Find a property
            <br />
            you’ll love.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
            Discover homes for sale, properties to rent and rooms across the UK,
            with professional support every step of the way.
          </p>
        </div>

        {/* Search Box */}
        <div className="mt-12 rounded-3xl bg-white p-5 shadow-2xl md:p-7">
          {/* Tabs */}
          <div className="mb-7 flex gap-3">
            {["Buy", "Rent", "Room"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-7 py-3 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Fields */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Location
              </label>

              <input
                type="text"
                placeholder="Area or postcode"
                className="h-14 w-full rounded-lg border border-gray-300 px-4 text-gray-900 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Property Type
              </label>

              <select className="h-14 w-full rounded-lg border border-gray-300 px-4 text-gray-900 outline-none focus:border-black">
                <option>Any type</option>
                <option>Flat</option>
                <option>House</option>
                <option>Studio</option>
                <option>Apartment</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Min Price
              </label>

              <select className="h-14 w-full rounded-lg border border-gray-300 px-4 text-gray-900 outline-none focus:border-black">
                <option>No min</option>
                <option>£100,000</option>
                <option>£200,000</option>
                <option>£300,000</option>
                <option>£500,000</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Bedrooms
              </label>

              <select className="h-14 w-full rounded-lg border border-gray-300 px-4 text-gray-900 outline-none focus:border-black">
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-5 flex justify-end">
            <button className="w-full rounded-lg bg-[#082a4f] px-10 py-4 font-semibold text-white transition hover:bg-[#061f3b] md:w-auto">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full border border-white ${
              currentSlide === index ? "bg-white" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}