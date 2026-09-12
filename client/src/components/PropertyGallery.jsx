"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Images,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function PropertyGallery({
  images = [],
  fallbackImage,
  title,
}) {
  const galleryImages =
    images.length > 0
      ? images.map((image) => image.image_url)
      : [fallbackImage];

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const currentImage =
    galleryImages[selectedIndex];

  function openGallery(index) {
    setSelectedIndex(index);
    setIsOpen(true);
  }

  function closeGallery() {
    setIsOpen(false);
  }

  function nextImage() {
    setSelectedIndex((current) =>
      current === galleryImages.length - 1
        ? 0
        : current + 1
    );
  }

  function previousImage() {
    setSelectedIndex((current) =>
      current === 0
        ? galleryImages.length - 1
        : current - 1
    );
  }

  return (
    <>
      {/* ========================================
          PROPERTY GALLERY
      ======================================== */}

      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">

        {/* MAIN IMAGE */}

        <button
          type="button"
          onClick={() => openGallery(0)}
          className="
            group
            relative
            block
            h-[340px]
            overflow-hidden
            rounded-2xl
            bg-gray-100
            text-left
            md:h-[520px]
          "
        >
          <Image
            src={galleryImages[0]}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.02]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-black/0
              transition
              group-hover:bg-black/5
            "
          />
        </button>


        {/* ========================================
            RIGHT SIDE IMAGES
        ======================================== */}

        <div className="hidden gap-3 lg:grid lg:grid-rows-2">

          {/* IMAGE 2 */}

          <button
            type="button"
            onClick={() =>
              openGallery(
                galleryImages.length > 1
                  ? 1
                  : 0
              )
            }
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              bg-gray-100
            "
          >
            <Image
              src={
                galleryImages[1] ||
                galleryImages[0]
              }
              alt={`${title} image 2`}
              fill
              sizes="33vw"
              className="
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </button>


          {/* IMAGE 3 */}

          <button
            type="button"
            onClick={() =>
              openGallery(
                galleryImages.length > 2
                  ? 2
                  : 0
              )
            }
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              bg-gray-100
            "
          >
            <Image
              src={
                galleryImages[2] ||
                galleryImages[0]
              }
              alt={`${title} image 3`}
              fill
              sizes="33vw"
              className="
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />

            {/* VIEW ALL PHOTOS */}

            <div className="absolute bottom-4 right-4 z-10">

              <span
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#082D52]
                  shadow-lg
                  transition
                  group-hover:bg-[#F7FAFC]
                "
              >
                <Images size={17} />

                View all photos

                <span className="text-gray-400">
                  ({galleryImages.length})
                </span>
              </span>

            </div>

          </button>

        </div>

      </div>


      {/* ========================================
          MOBILE VIEW ALL BUTTON
      ======================================== */}

      <button
        type="button"
        onClick={() => openGallery(0)}
        className="
          mt-3
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          text-sm
          font-semibold
          text-[#082D52]
          transition
          hover:bg-[#F7FAFC]
          lg:hidden
        "
      >
        <Images size={17} />

        View all photos

        <span className="text-gray-400">
          ({galleryImages.length})
        </span>
      </button>


      {/* ========================================
          FULL SCREEN LIGHTBOX
      ======================================== */}

      {isOpen && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/95
            px-4
            py-6
          "
        >

          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={closeGallery}
            aria-label="Close gallery"
            className="
              absolute
              right-5
              top-5
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              transition
              hover:bg-white/20
            "
          >
            <X size={23} />
          </button>


          {/* IMAGE COUNTER */}

          <div
            className="
              absolute
              left-5
              top-5
              z-20
              rounded-full
              bg-white/10
              px-4
              py-2
              text-sm
              font-medium
              text-white
            "
          >
            {selectedIndex + 1} /{" "}
            {galleryImages.length}
          </div>


          {/* PREVIOUS BUTTON */}

          {galleryImages.length > 1 && (

            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="
                absolute
                left-3
                z-20
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                transition
                hover:bg-white/20
                md:left-6
              "
            >
              <ChevronLeft size={28} />
            </button>

          )}


          {/* LARGE IMAGE */}

          <div
            className="
              relative
              h-[75vh]
              w-full
              max-w-[1200px]
            "
          >
            <Image
              src={currentImage}
              alt={`${title} ${
                selectedIndex + 1
              }`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>


          {/* NEXT BUTTON */}

          {galleryImages.length > 1 && (

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="
                absolute
                right-3
                z-20
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                transition
                hover:bg-white/20
                md:right-6
              "
            >
              <ChevronRight size={28} />
            </button>

          )}

        </div>

      )}
    </>
  );
}