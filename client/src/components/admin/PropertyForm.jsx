"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
  Star,
} from "lucide-react";

import PropertyImagePicker from "./PropertyImagePicker";


export default function PropertyForm({
  initialData = null,
  mode = "create",
}) {
  const router = useRouter();

  const isEdit = mode === "edit";


  // ========================================
  // FORM DATA
  // ========================================

  const [formData, setFormData] = useState({
    title: initialData?.title || "",

    listing_type:
      initialData?.listing_type ||
      "sale",

    property_type:
      initialData?.property_type ||
      "",

    price:
      initialData?.price ?? "",

    price_period:
      initialData?.price_period ||
      "",

    address:
      initialData?.address ||
      "",

    postcode:
      initialData?.postcode ||
      "",

    bedrooms:
      initialData?.bedrooms ?? "",

    bathrooms:
      initialData?.bathrooms ?? "",

    furnished_status:
      initialData?.furnished_status ||
      "",

    available_date:
      initialData?.available_date ||
      "",

    deposit:
      initialData?.deposit ?? "",

    description:
      initialData?.description ||
      "",

    epc_rating:
      initialData?.epc_rating ||
      "",

    council_tax_band:
      initialData?.council_tax_band ||
      "",

    status:
      initialData?.status ||
      "available",

    featured:
      Boolean(
        initialData?.featured
      ),

    image:
      initialData?.image || "",
  });


  // ========================================
  // NEW IMAGE FILES
  // ========================================

  const [imageFiles, setImageFiles] =
    useState([]);


  // ========================================
  // EXISTING PROPERTY IMAGES
  // ========================================

  const [
    existingImages,
    setExistingImages,
  ] = useState(
    initialData?.images || []
  );


  // ========================================
  // LOADING STATES
  // ========================================

  const [loading, setLoading] =
    useState(false);

  const [
    uploadingImages,
    setUploadingImages,
  ] = useState(false);

  const [
    settingCoverId,
    setSettingCoverId,
  ] = useState(null);


  // ========================================
  // MESSAGE STATES
  // ========================================

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  function handleChange(e) {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setFormData((current) => ({
      ...current,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }


  // ========================================
  // SET IMAGE AS COVER PHOTO
  // ========================================

  async function handleSetCover(
    image
  ) {
    if (!isEdit) {
      return;
    }


    if (
      Number(
        image.is_primary
      ) === 1
    ) {
      return;
    }


    try {
      setSettingCoverId(
        image.id
      );

      setError("");
      setSuccess("");


      const token =
        localStorage.getItem(
          "admin_token"
        );


      if (!token) {
        router.replace(
          "/admin/login"
        );

        return;
      }


      const API_URL =
        process.env
          .NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";


      const response =
        await fetch(
          `${API_URL}/api/properties/admin/${initialData.id}/images/${image.id}/primary`,
          {
            method: "PATCH",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update cover photo"
        );
      }


      // ========================================
      // UPDATE EXISTING IMAGE LIST
      // ========================================

      if (
        Array.isArray(
          data.images
        )
      ) {
        setExistingImages(
          data.images
        );
      } else {
        setExistingImages(
          (current) =>
            current
              .map(
                (currentImage) => ({
                  ...currentImage,

                  is_primary:
                    currentImage.id ===
                    image.id
                      ? 1
                      : 0,
                })
              )
              .sort(
                (a, b) =>
                  Number(
                    b.is_primary
                  ) -
                  Number(
                    a.is_primary
                  )
              )
        );
      }


      // ========================================
      // VERY IMPORTANT
      // KEEP FORM IMAGE SYNCHRONISED
      // ========================================

      setFormData(
        (current) => ({
          ...current,

          image:
            data.cover_image ||
            image.image_url,
        })
      );


      setSuccess(
        "Cover photo updated successfully."
      );

    } catch (error) {

      console.error(
        "Set cover photo error:",
        error
      );


      setError(
        error.message ||
          "Failed to update cover photo"
      );

    } finally {

      setSettingCoverId(
        null
      );

    }
  }


  // ========================================
  // UPLOAD PROPERTY IMAGES
  // ========================================

  async function uploadPropertyImages(
    propertyId
  ) {
    if (
      imageFiles.length === 0
    ) {
      return;
    }


    setUploadingImages(true);


    try {
      const token =
        localStorage.getItem(
          "admin_token"
        );


      if (!token) {
        throw new Error(
          "Admin session not found"
        );
      }


      const API_URL =
        process.env
          .NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";


      const imageFormData =
        new FormData();


      imageFiles.forEach(
        (file) => {
          imageFormData.append(
            "images",
            file
          );
        }
      );


      const response =
        await fetch(
          `${API_URL}/api/properties/admin/${propertyId}/images`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: imageFormData,
          }
        );


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to upload property images"
        );
      }


      // ========================================
      // UPDATE GALLERY AFTER UPLOAD
      // ========================================

      if (
        Array.isArray(
          data.images
        )
      ) {
        setExistingImages(
          data.images
        );


        const cover =
          data.images.find(
            (item) =>
              Number(
                item.is_primary
              ) === 1
          );


        if (cover) {
          setFormData(
            (current) => ({
              ...current,

              image:
                cover.image_url,
            })
          );
        }
      }


      return data.images;

    } finally {

      setUploadingImages(false);

    }
  }


  // ========================================
  // SUBMIT PROPERTY
  // ========================================

  async function handleSubmit(e) {
    e.preventDefault();


    try {
      setLoading(true);

      setError("");
      setSuccess("");


      const token =
        localStorage.getItem(
          "admin_token"
        );


      if (!token) {
        router.replace(
          "/admin/login"
        );

        return;
      }


      // ========================================
      // BASIC VALIDATION
      // ========================================

      if (
        !formData.title.trim()
      ) {
        throw new Error(
          "Property title is required"
        );
      }


      if (
        !formData.listing_type
      ) {
        throw new Error(
          "Listing type is required"
        );
      }


      if (
        !formData.price ||
        Number(
          formData.price
        ) <= 0
      ) {
        throw new Error(
          "Please enter a valid price"
        );
      }


      const API_URL =
        process.env
          .NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";


      const endpoint =
        isEdit
          ? `${API_URL}/api/properties/${initialData.id}`
          : `${API_URL}/api/properties`;


      const response =
        await fetch(
          endpoint,
          {
            method:
              isEdit
                ? "PUT"
                : "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify(
                formData
              ),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save property"
        );
      }


      const savedProperty =
        data.property;


      if (
        !savedProperty?.id
      ) {
        throw new Error(
          "Property saved but property ID was not returned"
        );
      }


      // ========================================
      // UPLOAD NEW SELECTED IMAGES
      // ========================================

      if (
        imageFiles.length > 0
      ) {
        await uploadPropertyImages(
          savedProperty.id
        );
      }


      // ========================================
      // SUCCESS
      // ========================================

      setSuccess(
        isEdit
          ? "Property updated successfully."
          : "Property created successfully."
      );


      setImageFiles([]);


      setTimeout(() => {

        router.push(
          "/admin/properties"
        );

        router.refresh();

      }, 900);

    } catch (error) {

      console.error(
        "Save property error:",
        error
      );


      setError(
        error.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  }


  // ========================================
  // RENTAL CHECK
  // ========================================

  const isRental =
    formData.listing_type ===
      "letting" ||
    formData.listing_type ===
      "room";


  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-2xl
        border
        border-[#DCE8F0]
        bg-white
        p-6
        shadow-sm
        md:p-8
      "
    >

      {/* ========================================
          ERROR MESSAGE
      ======================================== */}

      {error && (
        <div
          className="
            mb-6
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            text-red-700
          "
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>
            {error}
          </span>
        </div>
      )}


      {/* ========================================
          SUCCESS MESSAGE
      ======================================== */}

      {success && (
        <div
          className="
            mb-6
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-green-200
            bg-green-50
            p-4
            text-sm
            text-green-700
          "
        >
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>
            {success}
          </span>
        </div>
      )}


      {/* ========================================
          BASIC INFORMATION
      ======================================== */}

      <div>
        <h2 className="text-xl font-semibold text-[#082D52]">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter the main details about
          this property.
        </p>
      </div>


      <div className="mt-6 grid gap-5 md:grid-cols-2">

        {/* TITLE */}

        <div className="md:col-span-2">

          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-[#082D52]"
          >
            Property Title
            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Modern Two Bedroom Apartment"
            required
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-sm
              text-[#082D52]
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          />
        </div>


        {/* LISTING TYPE */}

        <div>

          <label
            htmlFor="listing_type"
            className="mb-2 block text-sm font-semibold text-[#082D52]"
          >
            Listing Type
            <span className="text-red-500">
              *
            </span>
          </label>

          <select
            id="listing_type"
            name="listing_type"
            value={
              formData.listing_type
            }
            onChange={
              handleChange
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-sm
              text-[#082D52]
              outline-none
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          >

            <option value="sale">
              Sale
            </option>

            <option value="letting">
              Letting
            </option>

            <option value="room">
              Room Let
            </option>

          </select>

        </div>


        {/* PROPERTY TYPE */}

        <div>

          <label
            htmlFor="property_type"
            className="mb-2 block text-sm font-semibold text-[#082D52]"
          >
            Property Type
          </label>

          <select
            id="property_type"
            name="property_type"
            value={
              formData.property_type
            }
            onChange={
              handleChange
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-sm
              text-[#082D52]
              outline-none
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          >

            <option value="">
              Select property type
            </option>

            <option value="House">
              House
            </option>

            <option value="Flat">
              Flat
            </option>

            <option value="Apartment">
              Apartment
            </option>

            <option value="Studio">
              Studio
            </option>

            <option value="Bungalow">
              Bungalow
            </option>

            <option value="Room">
              Room
            </option>

            <option value="Maisonette">
              Maisonette
            </option>

          </select>

        </div>


        {/* PRICE */}

        <div>

          <label
            htmlFor="price"
            className="mb-2 block text-sm font-semibold text-[#082D52]"
          >
            Price (£)
            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            id="price"
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder={
              formData.listing_type ===
              "sale"
                ? "425000"
                : "1850"
            }
            required
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-sm
              text-[#082D52]
              outline-none
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          />

        </div>


        {/* PRICE PERIOD */}

        {isRental && (
          <div>

            <label
              htmlFor="price_period"
              className="mb-2 block text-sm font-semibold text-[#082D52]"
            >
              Price Period
            </label>

            <select
              id="price_period"
              name="price_period"
              value={
                formData.price_period
              }
              onChange={
                handleChange
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                text-[#082D52]
                outline-none
                focus:border-[#082D52]
                focus:ring-2
                focus:ring-[#082D52]/10
              "
            >

              <option value="">
                Select period
              </option>

              <option value="pcm">
                PCM
              </option>

              <option value="pw">
                Per Week
              </option>

            </select>

          </div>
        )}

      </div>


      {/* ========================================
          LOCATION
      ======================================== */}

      <div className="mt-10 border-t border-gray-200 pt-8">

        <h2 className="text-xl font-semibold text-[#082D52]">
          Location
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter the property address
          and postcode.
        </p>

      </div>


      <div className="mt-6 grid gap-5 md:grid-cols-2">

        <div className="md:col-span-2">

          <label
            htmlFor="address"
            className="mb-2 block text-sm font-semibold text-[#082D52]"
          >
            Address
          </label>

          <input
            id="address"
            type="text"
            name="address"
            value={
              formData.address
            }
            onChange={
              handleChange
            }
            placeholder="e.g. Stratford, London"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-sm
              text-[#082D52]
              outline-none
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          />

        </div>


        <div>

          <label
            htmlFor="postcode"
            className="mb-2 block text-sm font-semibold text-[#082D52]"
          >
            Postcode
          </label>

          <input
            id="postcode"
            type="text"
            name="postcode"
            value={
              formData.postcode
            }
            onChange={
              handleChange
            }
            placeholder="e.g. E15"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-sm
              uppercase
              text-[#082D52]
              outline-none
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          />

        </div>

      </div>


      {/* ========================================
          PROPERTY DETAILS
      ======================================== */}

      <div className="mt-10 border-t border-gray-200 pt-8">

        <h2 className="text-xl font-semibold text-[#082D52]">
          Property Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add rooms and additional
          property information.
        </p>

      </div>


      <div className="mt-6 grid gap-5 md:grid-cols-2">

        {/* BEDROOMS */}

        <div>

          <label
            htmlFor="bedrooms"
            className="mb-2 block text-sm font-semibold text-[#082D52]"
          >
            Bedrooms
          </label>

          <input
            id="bedrooms"
            type="number"
            min="0"
            name="bedrooms"
            value={
              formData.bedrooms
            }
            onChange={
              handleChange
            }
            placeholder="2"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-sm
              text-[#082D52]
              outline-none
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          />

        </div>


        {/* BATHROOMS */}

        <div>

          <label
            htmlFor="bathrooms"
            className="mb-2 block text-sm font-semibold text-[#082D52]"
          >
            Bathrooms
          </label>

          <input
            id="bathrooms"
            type="number"
            min="0"
            name="bathrooms"
            value={
              formData.bathrooms
            }
            onChange={
              handleChange
            }
            placeholder="1"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-sm
              text-[#082D52]
              outline-none
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          />

        </div>


        {/* FURNISHED */}

        {isRental && (
          <div>

            <label
              htmlFor="furnished_status"
              className="mb-2 block text-sm font-semibold text-[#082D52]"
            >
              Furnished Status
            </label>

            <select
              id="furnished_status"
              name="furnished_status"
              value={
                formData.furnished_status
              }
              onChange={
                handleChange
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                text-[#082D52]
                outline-none
                focus:border-[#082D52]
                focus:ring-2
                focus:ring-[#082D52]/10
              "
            >

              <option value="">
                Select
              </option>

              <option value="Furnished">
                Furnished
              </option>

              <option value="Unfurnished">
                Unfurnished
              </option>

              <option value="Part Furnished">
                Part Furnished
              </option>

            </select>

          </div>
        )}


        {/* AVAILABLE DATE */}

        {isRental && (
          <div>

            <label
              htmlFor="available_date"
              className="mb-2 block text-sm font-semibold text-[#082D52]"
            >
              Available Date
            </label>

            <input
              id="available_date"
              type="date"
              name="available_date"
              value={
                formData.available_date
              }
              onChange={
                handleChange
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                text-sm
                text-[#082D52]
                outline-none
                focus:border-[#082D52]
                focus:ring-2
                focus:ring-[#082D52]/10
              "
            />

          </div>
        )}


        {/* DEPOSIT */}

        {isRental && (
          <div>

            <label
              htmlFor="deposit"
              className="mb-2 block text-sm font-semibold text-[#082D52]"
            >
              Deposit (£)
            </label>

            <input
              id="deposit"
              type="number"
              min="0"
              step="0.01"
              name="deposit"
              value={
                formData.deposit
              }
              onChange={
                handleChange
              }
              placeholder="1500"
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                text-sm
                text-[#082D52]
                outline-none
                focus:border-[#082D52]
                focus:ring-2
                focus:ring-[#082D52]/10
              "
            />

          </div>
        )}


        {/* EPC */}

        <div>

          <label
            htmlFor="epc_rating"
            className="mb-2 block text-sm font-semibold text-[#082D52]"
          >
            EPC Rating
          </label>

          <select
            id="epc_rating"
            name="epc_rating"
            value={
              formData.epc_rating
            }
            onChange={
              handleChange
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-sm
              text-[#082D52]
              outline-none
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          >

            <option value="">
              Select rating
            </option>

            {[
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
            ].map(
              (rating) => (
                <option
                  key={rating}
                  value={rating}
                >
                  {rating}
                </option>
              )
            )}

          </select>

        </div>


        {/* COUNCIL TAX */}

        <div>

          <label
            htmlFor="council_tax_band"
            className="mb-2 block text-sm font-semibold text-[#082D52]"
          >
            Council Tax Band
          </label>

          <select
            id="council_tax_band"
            name="council_tax_band"
            value={
              formData.council_tax_band
            }
            onChange={
              handleChange
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-sm
              text-[#082D52]
              outline-none
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          >

            <option value="">
              Select band
            </option>

            {[
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
            ].map(
              (band) => (
                <option
                  key={band}
                  value={band}
                >
                  {band}
                </option>
              )
            )}

          </select>

        </div>

      </div>


      {/* ========================================
          DESCRIPTION
      ======================================== */}

      <div className="mt-10 border-t border-gray-200 pt-8">

        <h2 className="text-xl font-semibold text-[#082D52]">
          Description
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Write a clear description
          for potential buyers or tenants.
        </p>


        <textarea
          name="description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          rows={7}
          placeholder="Describe the property, location, key features and nearby amenities..."
          className="
            mt-5
            w-full
            resize-y
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            text-sm
            leading-7
            text-[#082D52]
            outline-none
            placeholder:text-gray-400
            focus:border-[#082D52]
            focus:ring-2
            focus:ring-[#082D52]/10
          "
        />

      </div>


      {/* ========================================
          PROPERTY PHOTOS
      ======================================== */}

      <div className="mt-10 border-t border-gray-200 pt-8">

        <div>
          <h2 className="text-xl font-semibold text-[#082D52]">
            Property Photos
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload property photos and
            choose which photo should
            appear as the cover.
          </p>
        </div>


        {/* ========================================
            EXISTING PHOTOS
        ======================================== */}

        {isEdit &&
          existingImages.length > 0 && (

            <div className="mt-6">

              <div className="mb-4">

                <h3 className="text-sm font-semibold text-[#082D52]">
                  Existing Photos
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Click "Set as Cover"
                  to change the main
                  property photo.
                </p>

              </div>


              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >

                {existingImages.map(
                  (image) => {

                    const isCover =
                      Number(
                        image.is_primary
                      ) === 1;


                    const isSettingCover =
                      settingCoverId ===
                      image.id;


                    return (
                      <div
                        key={image.id}
                        className={`
                          overflow-hidden
                          rounded-xl
                          border
                          bg-white
                          shadow-sm
                          ${
                            isCover
                              ? "border-[#D3A72F] ring-2 ring-[#D3A72F]/20"
                              : "border-gray-200"
                          }
                        `}
                      >

                        {/* IMAGE */}

                        <div className="relative">

                          <img
                            src={
                              image.image_url
                            }
                            alt={
                              initialData?.title ||
                              "Property"
                            }
                            className="
                              aspect-[4/3]
                              w-full
                              object-cover
                            "
                          />


                          {/* COVER BADGE */}

                          {isCover && (

                            <div
                              className="
                                absolute
                                left-3
                                top-3
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-[#D3A72F]
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                text-white
                                shadow
                              "
                            >
                              <Star
                                size={13}
                                fill="currentColor"
                              />

                              Cover Photo
                            </div>

                          )}

                        </div>


                        {/* ACTION */}

                        <div className="p-3">

                          {isCover ? (

                            <div
                              className="
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                bg-green-50
                                px-3
                                py-2.5
                                text-sm
                                font-semibold
                                text-green-700
                              "
                            >
                              <CheckCircle2
                                size={16}
                              />

                              Current Cover

                            </div>

                          ) : (

                            <button
                              type="button"
                              onClick={() =>
                                handleSetCover(
                                  image
                                )
                              }
                              disabled={
                                settingCoverId !==
                                  null ||
                                loading ||
                                uploadingImages
                              }
                              className="
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                border
                                border-[#082D52]
                                px-3
                                py-2.5
                                text-sm
                                font-semibold
                                text-[#082D52]
                                transition
                                hover:bg-[#082D52]
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                              "
                            >

                              {isSettingCover ? (
                                <>
                                  <LoaderCircle
                                    size={16}
                                    className="animate-spin"
                                  />

                                  Setting...
                                </>
                              ) : (
                                <>
                                  <Star
                                    size={16}
                                  />

                                  Set as Cover
                                </>
                              )}

                            </button>

                          )}

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          )}


        {/* ========================================
            LEGACY COVER IMAGE FALLBACK
        ======================================== */}

        {isEdit &&
          existingImages.length === 0 &&
          initialData?.image && (

            <div className="mt-6">

              <p className="text-sm font-semibold text-[#082D52]">
                Current Cover Photo
              </p>


              <div
                className="
                  mt-3
                  max-w-sm
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                "
              >
                <img
                  src={
                    initialData.image
                  }
                  alt={
                    initialData.title ||
                    "Property"
                  }
                  className="
                    aspect-[4/3]
                    w-full
                    object-cover
                  "
                />
              </div>

            </div>

          )}


        {/* ========================================
            ADD MORE PHOTOS
        ======================================== */}

        <div
          className={
            isEdit &&
            existingImages.length > 0
              ? "mt-8 border-t border-gray-200 pt-6"
              : "mt-6"
          }
        >

          {isEdit && (
            <div className="mb-4">

              <h3 className="text-sm font-semibold text-[#082D52]">
                Add More Photos
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Newly selected photos
                will be added to the
                existing gallery.
              </p>

            </div>
          )}


          <PropertyImagePicker
            files={imageFiles}
            setFiles={
              setImageFiles
            }
          />

        </div>

      </div>


      {/* ========================================
          ADMIN SETTINGS
      ======================================== */}

      <div className="mt-10 border-t border-gray-200 pt-8">

        <h2 className="text-xl font-semibold text-[#082D52]">
          Listing Settings
        </h2>


        <div className="mt-6 grid gap-5 md:grid-cols-2">

          {/* STATUS */}

          <div>

            <label
              htmlFor="status"
              className="mb-2 block text-sm font-semibold text-[#082D52]"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                text-[#082D52]
                outline-none
                focus:border-[#082D52]
                focus:ring-2
                focus:ring-[#082D52]/10
              "
            >

              <option value="available">
                Available
              </option>

              <option value="sold">
                Sold
              </option>

              <option value="let">
                Let
              </option>

              <option value="under_offer">
                Under Offer
              </option>

              <option value="draft">
                Draft
              </option>

            </select>

          </div>


          {/* FEATURED */}

          <div
            className="
              flex
              items-center
              rounded-xl
              border
              border-gray-200
              bg-[#F8FBFD]
              px-5
              py-4
            "
          >

            <input
              id="featured"
              type="checkbox"
              name="featured"
              checked={
                formData.featured
              }
              onChange={
                handleChange
              }
              className="
                h-4
                w-4
                cursor-pointer
                accent-[#082D52]
              "
            />

            <label
              htmlFor="featured"
              className="
                ml-3
                cursor-pointer
              "
            >

              <span className="block text-sm font-semibold text-[#082D52]">
                Featured Property
              </span>

              <span className="mt-1 block text-xs text-gray-500">
                Show this property
                prominently on the website.
              </span>

            </label>

          </div>

        </div>

      </div>


      {/* ========================================
          SUBMIT BUTTONS
      ======================================== */}

      <div
        className="
          mt-10
          flex
          flex-col
          gap-3
          border-t
          border-gray-200
          pt-8
          sm:flex-row
          sm:items-center
          sm:justify-end
        "
      >

        <button
          type="button"
          onClick={() =>
            router.push(
              "/admin/properties"
            )
          }
          disabled={
            loading ||
            uploadingImages ||
            settingCoverId !==
              null
          }
          className="
            rounded-xl
            border
            border-gray-300
            px-6
            py-3
            text-sm
            font-semibold
            text-[#082D52]
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>


        <button
          type="submit"
          disabled={
            loading ||
            uploadingImages ||
            settingCoverId !==
              null
          }
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#082D52]
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#0A3B69]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          {uploadingImages ? (
            <>
              <LoaderCircle
                size={17}
                className="animate-spin"
              />

              Uploading Photos...
            </>
          ) : loading ? (
            <>
              <LoaderCircle
                size={17}
                className="animate-spin"
              />

              {isEdit
                ? "Updating..."
                : "Creating..."}
            </>
          ) : (
            <>
              <Save
                size={17}
              />

              {isEdit
                ? "Update Property"
                : "Create Property"}
            </>
          )}

        </button>

      </div>

    </form>
  );
}