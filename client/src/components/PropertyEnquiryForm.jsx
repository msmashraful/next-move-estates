"use client";

import { useEffect, useState } from "react";

import {
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function PropertyEnquiryForm({
  propertyId,
  propertyTitle,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferred_date: "",
    message: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");


  // ========================================
  // LOAD LOGGED-IN CUSTOMER DETAILS
  // ========================================

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem(
          "customer_user"
        );

      if (!storedUser) {
        return;
      }

      const user =
        JSON.parse(storedUser);

      setFormData((current) => ({
        ...current,
        name:
          user?.name ||
          current.name,
        email:
          user?.email ||
          current.email,
        phone:
          user?.phone ||
          current.phone,
      }));

    } catch (error) {
      console.error(
        "Load customer details error:",
        error
      );
    }
  }, []);


  // ========================================
  // INPUT CHANGE
  // ========================================

  function handleChange(e) {
    const {
      name,
      value,
    } = e.target;

    setFormData(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  }


  // ========================================
  // SUBMIT FORM
  // ========================================

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const token =
        localStorage.getItem(
          "customer_token"
        );


      // ========================================
      // HEADERS
      // ========================================

      const headers = {
        "Content-Type":
          "application/json",
      };


      // Logged-in customer হলে token পাঠাব
      if (token) {
        headers.Authorization =
          `Bearer ${token}`;
      }


      // ========================================
      // SEND ENQUIRY
      // ========================================

      const response =
        await fetch(
          `${API_URL}/api/enquiries`,
          {
            method: "POST",

            headers,

            body: JSON.stringify({
              property_id:
                propertyId,

              name:
                formData.name,

              email:
                formData.email,

              phone:
                formData.phone,

              preferred_date:
                formData.preferred_date,

              message:
                formData.message,
            }),
          }
        );


      const contentType =
        response.headers.get(
          "content-type"
        );


      let data;


      if (
        contentType?.includes(
          "application/json"
        )
      ) {
        data =
          await response.json();

      } else {
        const text =
          await response.text();

        console.error(
          "Unexpected enquiry response:",
          text
        );

        throw new Error(
          "Unexpected server response."
        );
      }


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to send enquiry."
        );
      }


      // ========================================
      // SUCCESS
      // ========================================

      setSuccessMessage(
        token
          ? "Thank you. Your viewing enquiry has been sent and added to your account."
          : "Thank you. Your viewing enquiry has been sent successfully."
      );


      // Logged-in customer হলে
      // name/email/phone রেখে দেব
      // শুধু date + message clear হবে

      if (token) {
        setFormData(
          (current) => ({
            ...current,
            preferred_date: "",
            message: "",
          })
        );

      } else {
        setFormData({
          name: "",
          email: "",
          phone: "",
          preferred_date: "",
          message: "",
        });
      }


    } catch (error) {

      console.error(
        "Property enquiry error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4"
    >

      {/* ========================================
          PROPERTY
      ======================================== */}

      <div className="rounded-xl bg-white/5 p-3">

        <p className="text-xs uppercase tracking-wide text-white/40">
          Property
        </p>

        <p className="mt-1 text-sm font-medium text-white/90">
          {propertyTitle}
        </p>

      </div>


      {/* ========================================
          NAME
      ======================================== */}

      <div>

        <label
          htmlFor="enquiry-name"
          className="mb-2 block text-xs font-medium text-white/70"
        >
          Your Name *
        </label>

        <input
          id="enquiry-name"
          type="text"
          name="name"
          required
          value={
            formData.name
          }
          onChange={
            handleChange
          }
          placeholder="Full name"
          className="
            w-full
            rounded-xl
            border
            border-white/15
            bg-white
            px-4
            py-3
            text-sm
            text-[#082D52]
            outline-none
            placeholder:text-gray-400
            focus:border-[#D3A72F]
          "
        />

      </div>


      {/* ========================================
          EMAIL
      ======================================== */}

      <div>

        <label
          htmlFor="enquiry-email"
          className="mb-2 block text-xs font-medium text-white/70"
        >
          Email Address *
        </label>

        <input
          id="enquiry-email"
          type="email"
          name="email"
          required
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          placeholder="you@example.com"
          className="
            w-full
            rounded-xl
            border
            border-white/15
            bg-white
            px-4
            py-3
            text-sm
            text-[#082D52]
            outline-none
            placeholder:text-gray-400
            focus:border-[#D3A72F]
          "
        />

      </div>


      {/* ========================================
          PHONE
      ======================================== */}

      <div>

        <label
          htmlFor="enquiry-phone"
          className="mb-2 block text-xs font-medium text-white/70"
        >
          Phone Number
        </label>

        <input
          id="enquiry-phone"
          type="tel"
          name="phone"
          value={
            formData.phone
          }
          onChange={
            handleChange
          }
          placeholder="+44..."
          className="
            w-full
            rounded-xl
            border
            border-white/15
            bg-white
            px-4
            py-3
            text-sm
            text-[#082D52]
            outline-none
            placeholder:text-gray-400
            focus:border-[#D3A72F]
          "
        />

      </div>


      {/* ========================================
          PREFERRED DATE
      ======================================== */}

      <div>

        <label
          htmlFor="preferred-date"
          className="mb-2 block text-xs font-medium text-white/70"
        >
          Preferred Viewing Date
        </label>

        <input
          id="preferred-date"
          type="date"
          name="preferred_date"
          value={
            formData.preferred_date
          }
          onChange={
            handleChange
          }
          min={
            new Date()
              .toISOString()
              .split("T")[0]
          }
          className="
            w-full
            rounded-xl
            border
            border-white/15
            bg-white
            px-4
            py-3
            text-sm
            text-[#082D52]
            outline-none
            focus:border-[#D3A72F]
          "
        />

      </div>


      {/* ========================================
          MESSAGE
      ======================================== */}

      <div>

        <label
          htmlFor="enquiry-message"
          className="mb-2 block text-xs font-medium text-white/70"
        >
          Message
        </label>

        <textarea
          id="enquiry-message"
          name="message"
          rows={4}
          value={
            formData.message
          }
          onChange={
            handleChange
          }
          placeholder="I would like to arrange a viewing..."
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-white/15
            bg-white
            px-4
            py-3
            text-sm
            text-[#082D52]
            outline-none
            placeholder:text-gray-400
            focus:border-[#D3A72F]
          "
        />

      </div>


      {/* ========================================
          SUCCESS MESSAGE
      ======================================== */}

      {successMessage && (
        <div className="flex items-start gap-2 rounded-xl bg-green-500/15 p-3 text-sm text-green-100">

          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>
            {successMessage}
          </span>

        </div>
      )}


      {/* ========================================
          ERROR MESSAGE
      ======================================== */}

      {errorMessage && (
        <div className="flex items-start gap-2 rounded-xl bg-red-500/15 p-3 text-sm text-red-100">

          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>
            {errorMessage}
          </span>

        </div>
      )}


      {/* ========================================
          SUBMIT
      ======================================== */}

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#D3A72F]
          px-5
          py-3.5
          text-sm
          font-semibold
          text-[#082D52]
          transition
          hover:bg-[#E1B93E]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >

        {loading
          ? "Sending..."
          : "Arrange a Viewing"}

        {!loading && (
          <Send
            size={17}
          />
        )}

      </button>

    </form>
  );
}