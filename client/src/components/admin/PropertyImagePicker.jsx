"use client";

import { useEffect } from "react";
import {
  ImagePlus,
  X,
  Images,
} from "lucide-react";

export default function PropertyImagePicker({
  files,
  setFiles,
}) {
  const previews = files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
  }));

  useEffect(() => {
    return () => {
      previews.forEach((item) => {
        URL.revokeObjectURL(item.url);
      });
    };
  }, [files]);

  function handleFiles(event) {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    const allowedFiles =
      selectedFiles.filter((file) =>
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ].includes(file.type)
      );

    const oversized =
      allowedFiles.filter(
        (file) =>
          file.size >
          8 * 1024 * 1024
      );

    if (oversized.length > 0) {
      alert(
        "Each image must be smaller than 8 MB."
      );

      return;
    }

    const combined = [
      ...files,
      ...allowedFiles,
    ];

    if (combined.length > 10) {
      alert(
        "You can upload maximum 10 images."
      );

      return;
    }

    setFiles(combined);

    event.target.value = "";
  }

  function removeFile(index) {
    setFiles((current) =>
      current.filter(
        (_, itemIndex) =>
          itemIndex !== index
      )
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">

        <div>
          <label className="block text-sm font-semibold text-[#082D52]">
            Property Photos
          </label>

          <p className="mt-1 text-xs text-gray-500">
            Upload JPG, PNG or WEBP.
            Maximum 10 images, 8 MB each.
          </p>
        </div>

        <span className="text-xs font-medium text-gray-400">
          {files.length}/10
        </span>

      </div>

      <label
        className="
          mt-4
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-[#DCE8F0]
          bg-[#F8FBFD]
          px-6
          py-10
          text-center
          transition
          hover:border-[#D3A72F]
          hover:bg-[#FFFDF8]
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-[#EAF2F8]
            text-[#082D52]
          "
        >
          <ImagePlus size={23} />
        </div>

        <p className="mt-3 font-semibold text-[#082D52]">
          Choose property photos
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Click here to select multiple images
        </p>

        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFiles}
          className="hidden"
        />
      </label>

      {previews.length > 0 && (
        <div className="mt-5">

          <div className="mb-3 flex items-center gap-2">

            <Images
              size={17}
              className="text-[#D3A72F]"
            />

            <p className="text-sm font-semibold text-[#082D52]">
              Selected Photos
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

            {previews.map(
              (item, index) => (

                <div
                  key={`${item.file.name}-${index}`}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-100
                  "
                >
                  <img
                    src={item.url}
                    alt={`Selected property photo ${
                      index + 1
                    }`}
                    className="aspect-[4/3] h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeFile(index)
                    }
                    className="
                      absolute
                      right-2
                      top-2
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-red-600
                      shadow-md
                      transition
                      hover:bg-red-50
                    "
                  >
                    <X size={16} />
                  </button>

                  {index === 0 && (
                    <div
                      className="
                        absolute
                        bottom-2
                        left-2
                        rounded-full
                        bg-[#082D52]
                        px-3
                        py-1
                        text-[11px]
                        font-semibold
                        text-white
                      "
                    >
                      Cover Photo
                    </div>
                  )}

                </div>

              )
            )}

          </div>

          <p className="mt-3 text-xs text-gray-500">
            The first uploaded image will
            automatically be used as the
            cover photo.
          </p>

        </div>
      )}
    </div>
  );
}