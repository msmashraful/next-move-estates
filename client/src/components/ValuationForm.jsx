"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";


const initialForm = {
  name: "",
  email: "",
  phone: "",
  property_address: "",
  postcode: "",
  property_type: "",
  valuation_type: "sell",
  bedrooms: "",
  message: "",
};


export default function ValuationForm() {
  const searchParams =
    useSearchParams();

  const [formData, setFormData] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");


  // ========================================
  // SET VALUATION TYPE FROM URL
  //
  // /valuation?type=sell
  // /valuation?type=let
  // ========================================

  useEffect(() => {
    const type =
      searchParams.get("type");

    if (
      type === "sell" ||
      type === "let"
    ) {
      setFormData((previous) => ({
        ...previous,
        valuation_type: type,
      }));
    }
  }, [searchParams]);


  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (success) {
      setSuccess(false);
    }

    if (error) {
      setError("");
    }
  };


  // ========================================
  // SUBMIT FORM
  // ========================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);
      setError("");
      setSuccess(false);


      try {

        const API_URL =
          process.env
            .NEXT_PUBLIC_API_URL ||
          "http://localhost:5000";


        const response =
          await fetch(
            `${API_URL}/api/valuations`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
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
              "Failed to submit valuation request."
          );
        }


        setSuccess(true);


        // Keep the current valuation type
        // after successful submission.
        const currentType =
          formData.valuation_type;


        setFormData({
          ...initialForm,
          valuation_type:
            currentType,
        });


      } catch (err) {

        console.error(
          "Valuation form error:",
          err
        );


        setError(
          err.message ||
            "Something went wrong. Please try again."
        );


      } finally {

        setLoading(false);
      }
    };


  return (

    <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:p-10">

      {/* ========================================
          HEADING
      ======================================== */}

      <div className="mb-8">

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
          Free Property Valuation
        </p>


        <h2 className="text-2xl font-bold text-[#082D52] sm:text-3xl">
          Tell us about your property
        </h2>


        <p className="mt-3 text-gray-600">
          Complete the form below and a member
          of our team will contact you to
          discuss your property.
        </p>

      </div>


      {/* ========================================
          SUCCESS
      ======================================== */}

      {success && (

        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">

          Thank you. Your valuation request
          has been submitted successfully. A
          member of the Next Move Estates team
          will contact you shortly.

        </div>

      )}


      {/* ========================================
          ERROR
      ======================================== */}

      {error && (

        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">

          {error}

        </div>

      )}


      {/* ========================================
          FORM
      ======================================== */}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >

        {/* NAME */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-[#082D52]">
            Full Name *
          </label>


          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#D3A72F]"
            placeholder="Your full name"
          />

        </div>


        {/* EMAIL */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-[#082D52]">
            Email Address *
          </label>


          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#D3A72F]"
            placeholder="you@example.com"
          />

        </div>


        {/* PHONE */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-[#082D52]">
            Phone Number
          </label>


          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#D3A72F]"
            placeholder="Your phone number"
          />

        </div>


        {/* POSTCODE */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-[#082D52]">
            Postcode
          </label>


          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            autoComplete="postal-code"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#D3A72F]"
            placeholder="E11 1HZ"
          />

        </div>


        {/* PROPERTY ADDRESS */}

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-semibold text-[#082D52]">
            Property Address *
          </label>


          <input
            type="text"
            name="property_address"
            value={
              formData.property_address
            }
            onChange={handleChange}
            required
            autoComplete="street-address"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#D3A72F]"
            placeholder="Property address"
          />

        </div>


        {/* PROPERTY TYPE */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-[#082D52]">
            Property Type
          </label>


          <select
            name="property_type"
            value={
              formData.property_type
            }
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#D3A72F]"
          >

            <option value="">
              Select property type
            </option>

            <option value="House">
              House
            </option>

            <option value="Flat">
              Flat / Apartment
            </option>

            <option value="Bungalow">
              Bungalow
            </option>

            <option value="Maisonette">
              Maisonette
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        {/* BEDROOMS */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-[#082D52]">
            Bedrooms
          </label>


          <select
            name="bedrooms"
            value={
              formData.bedrooms
            }
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#D3A72F]"
          >

            <option value="">
              Select bedrooms
            </option>

            <option value="0">
              Studio
            </option>

            <option value="1">
              1 Bedroom
            </option>

            <option value="2">
              2 Bedrooms
            </option>

            <option value="3">
              3 Bedrooms
            </option>

            <option value="4">
              4 Bedrooms
            </option>

            <option value="5">
              5 Bedrooms
            </option>

            <option value="6">
              6+ Bedrooms
            </option>

          </select>

        </div>


        {/* ========================================
            VALUATION TYPE
        ======================================== */}

        <div className="md:col-span-2">

          <label className="mb-3 block text-sm font-semibold text-[#082D52]">
            I would like to *
          </label>


          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* SELL */}

            <label
              className={`
                cursor-pointer
                rounded-xl
                border
                p-4
                transition

                ${
                  formData
                    .valuation_type ===
                  "sell"
                    ? "border-[#D3A72F] bg-[#FFF9E8]"
                    : "border-gray-300 hover:border-[#D3A72F]/60"
                }
              `}
            >

              <input
                type="radio"
                name="valuation_type"
                value="sell"
                checked={
                  formData
                    .valuation_type ===
                  "sell"
                }
                onChange={
                  handleChange
                }
                className="mr-3"
              />


              <span className="font-semibold text-[#082D52]">
                Sell my property
              </span>

            </label>


            {/* LET */}

            <label
              className={`
                cursor-pointer
                rounded-xl
                border
                p-4
                transition

                ${
                  formData
                    .valuation_type ===
                  "let"
                    ? "border-[#D3A72F] bg-[#FFF9E8]"
                    : "border-gray-300 hover:border-[#D3A72F]/60"
                }
              `}
            >

              <input
                type="radio"
                name="valuation_type"
                value="let"
                checked={
                  formData
                    .valuation_type ===
                  "let"
                }
                onChange={
                  handleChange
                }
                className="mr-3"
              />


              <span className="font-semibold text-[#082D52]">
                Let my property
              </span>

            </label>

          </div>

        </div>


        {/* MESSAGE */}

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-semibold text-[#082D52]">
            Additional Information
          </label>


          <textarea
            name="message"
            value={
              formData.message
            }
            onChange={handleChange}
            rows={5}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#D3A72F]"
            placeholder="Tell us anything else about the property..."
          />

        </div>


        {/* PRIVACY */}

        <div className="md:col-span-2">

          <p className="text-sm leading-6 text-gray-500">
            By submitting this form, you
            agree that Next Move Estates may
            contact you regarding your
            property valuation request.
          </p>

        </div>


        {/* SUBMIT */}

        <div className="md:col-span-2">

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#D3A72F] px-6 py-4 font-bold text-[#082D52] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[220px]"
          >

            {loading
              ? "Submitting..."
              : formData.valuation_type ===
                  "let"
                ? "Request Free Rental Valuation"
                : "Request Free Sales Valuation"}

          </button>

        </div>

      </form>

    </div>
  );
}