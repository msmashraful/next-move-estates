"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

export default function RentFilters({
  initialLocation = "",
  initialPropertyType = "",
  initialMinPrice = "",
  initialMaxPrice = "",
  initialSort = "newest",
}) {
  const router = useRouter();

  const [location, setLocation] = useState(initialLocation);
  const [propertyType, setPropertyType] =
    useState(initialPropertyType);
  const [minPrice, setMinPrice] =
    useState(initialMinPrice);
  const [maxPrice, setMaxPrice] =
    useState(initialMaxPrice);
  const [sort, setSort] =
    useState(initialSort);

  function handleSearch(e) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (propertyType) {
      params.set("property_type", propertyType);
    }

    if (minPrice) {
      params.set("min_price", minPrice);
    }

    if (maxPrice) {
      params.set("max_price", maxPrice);
    }

    if (sort && sort !== "newest") {
      params.set("sort", sort);
    }

    const queryString = params.toString();

    router.push(
      queryString
        ? `/rent?${queryString}`
        : "/rent"
    );
  }

  function handleSortChange(e) {
    const value = e.target.value;

    setSort(value);

    const params = new URLSearchParams(
      window.location.search
    );

    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const queryString = params.toString();

    router.push(
      queryString
        ? `/rent?${queryString}`
        : "/rent"
    );
  }

  function handleReset() {
    setLocation("");
    setPropertyType("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");

    router.push("/rent");
  }

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="
          rounded-2xl
          border border-[#DCE8F0]
          bg-white
          p-5
          shadow-sm
          md:p-6
        "
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">

          {/* LOCATION */}
          <div className="lg:col-span-2">

            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="Area or postcode"
              className="
                w-full
                rounded-lg
                border border-gray-300
                bg-white
                px-4 py-3
                text-sm
                text-[#082D52]
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-[#082D52]
                focus:ring-1
                focus:ring-[#082D52]/20
              "
            />

          </div>

          {/* PROPERTY TYPE */}
          <div>

            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Property Type
            </label>

            <select
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border border-gray-300
                bg-white
                px-4 py-3
                text-sm
                text-[#082D52]
                outline-none
                transition
                focus:border-[#082D52]
              "
            >
              <option value="">Any type</option>
              <option value="Flat">Flat</option>
              <option value="Apartment">
                Apartment
              </option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
            </select>

          </div>

          {/* MIN PRICE */}
          <div>

            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Min Rent
            </label>

            <select
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border border-gray-300
                bg-white
                px-4 py-3
                text-sm
                text-[#082D52]
                outline-none
                transition
                focus:border-[#082D52]
              "
            >
              <option value="">No min</option>
              <option value="500">£500 pcm</option>
              <option value="750">£750 pcm</option>
              <option value="1000">£1,000 pcm</option>
              <option value="1250">£1,250 pcm</option>
              <option value="1500">£1,500 pcm</option>
              <option value="1750">£1,750 pcm</option>
              <option value="2000">£2,000 pcm</option>
            </select>

          </div>

          {/* MAX PRICE */}
          <div>

            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Max Rent
            </label>

            <select
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border border-gray-300
                bg-white
                px-4 py-3
                text-sm
                text-[#082D52]
                outline-none
                transition
                focus:border-[#082D52]
              "
            >
              <option value="">No max</option>
              <option value="1000">£1,000 pcm</option>
              <option value="1250">£1,250 pcm</option>
              <option value="1500">£1,500 pcm</option>
              <option value="1750">£1,750 pcm</option>
              <option value="2000">£2,000 pcm</option>
              <option value="2500">£2,500 pcm</option>
              <option value="3000">£3,000 pcm</option>
            </select>

          </div>

          {/* SEARCH BUTTON */}
          <div className="flex items-end">

            <button
              type="submit"
              className="
                flex w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#D3A72F]
                px-5 py-3
                font-semibold
                text-[#082D52]
                transition-all
                duration-300
                hover:bg-[#E1B93E]
              "
            >
              <SlidersHorizontal size={18} />
              Search
            </button>

          </div>

        </div>

        {/* CLEAR FILTERS */}
        <div className="mt-4 flex justify-end">

          <button
            type="button"
            onClick={handleReset}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              transition
              hover:text-[#082D52]
            "
          >
            <RotateCcw size={15} />
            Clear filters
          </button>

        </div>

      </form>

      {/* SORT */}
      <div className="mt-10 flex justify-end">

        <select
          value={sort}
          onChange={handleSortChange}
          className="
            rounded-lg
            border border-gray-300
            bg-white
            px-4 py-2.5
            text-sm
            text-[#082D52]
            outline-none
            transition
            focus:border-[#082D52]
          "
        >
          <option value="newest">
            Newest first
          </option>

          <option value="price_asc">
            Price: Low to High
          </option>

          <option value="price_desc">
            Price: High to Low
          </option>
        </select>

      </div>
    </>
  );
}