"use client";

import { useState } from "react";

import {
  Send,
  LoaderCircle,
  CheckCircle2,
  CircleAlert,
} from "lucide-react";


const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};


// ========================================
// CONTACT FORM
// ========================================

export default function ContactForm() {

  const [formData, setFormData] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");


  // ========================================
  // INPUT CHANGE
  // ========================================

  function handleChange(event) {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (success) {
      setSuccess("");
    }

    if (error) {
      setError("");
    }
  }


  // ========================================
  // SUBMIT
  // ========================================

  async function handleSubmit(event) {

    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";


      const response = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
            "Failed to send your message."
        );

      }


      setSuccess(
        data.message ||
          "Thank you. Your message has been sent successfully."
      );


      setFormData(initialForm);

    } catch (error) {

      console.error(
        "Contact form error:",
        error
      );


      setError(
        error.message ||
          "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }
  }


  // ========================================
  // FORM UI
  // ========================================

  return (

    <div className="rounded-3xl border border-[#DCE8F0] bg-white p-6 shadow-sm sm:p-8 lg:p-10">

      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
        Send A Message
      </p>

      <h2 className="mt-3 text-2xl font-semibold text-[#082D52]">
        Contact our team
      </h2>

      <p className="mt-3 text-sm leading-7 text-gray-500">
        Complete the form below and we'll
        contact you about your enquiry.
      </p>


      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >


        {/* ========================================
            NAME + EMAIL
        ======================================== */}

        <div className="grid gap-5 sm:grid-cols-2">

          <FormField
            label="Full Name"
            required
          >

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="Your full name"
              className={inputClasses}
            />

          </FormField>


          <FormField
            label="Email Address"
            required
          >

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClasses}
            />

          </FormField>

        </div>


        {/* ========================================
            PHONE
        ======================================== */}

        <FormField label="Phone Number">

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            placeholder="Your phone number"
            className={inputClasses}
          />

        </FormField>


        {/* ========================================
            SUBJECT
        ======================================== */}

        <FormField label="Enquiry About">

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
          >

            <option value="">
              Select an option
            </option>

            <option value="Buying a Property">
              Buying a Property
            </option>

            <option value="Renting a Property">
              Renting a Property
            </option>

            <option value="Selling a Property">
              Selling a Property
            </option>

            <option value="Letting a Property">
              Letting a Property
            </option>

            <option value="Property Management">
              Property Management
            </option>

            <option value="Room Let">
              Room Let
            </option>

            <option value="General Enquiry">
              General Enquiry
            </option>

          </select>

        </FormField>


        {/* ========================================
            MESSAGE
        ======================================== */}

        <FormField
          label="Message"
          required
        >

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Tell us how we can help..."
            className={`${inputClasses} resize-none`}
          />

        </FormField>


        {/* ========================================
            SUCCESS MESSAGE
        ======================================== */}

        {success && (

          <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">

            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>
              {success}
            </span>

          </div>

        )}


        {/* ========================================
            ERROR MESSAGE
        ======================================== */}

        {error && (

          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

            <CircleAlert
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>
              {error}
            </span>

          </div>

        )}


        {/* ========================================
            SUBMIT BUTTON
        ======================================== */}

        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#D3A72F]
            px-6
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

          {loading ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              Sending...
            </>
          ) : (
            <>
              <Send size={17} />

              Send Message
            </>
          )}

        </button>


        <p className="text-xs leading-5 text-gray-500">
          By submitting this form, you
          agree that Next Move Estates may
          contact you regarding your
          enquiry. Please do not include
          sensitive personal information
          in your message.
        </p>

      </form>

    </div>
  );
}


// ========================================
// FORM FIELD
// ========================================

function FormField({
  label,
  required = false,
  children,
}) {

  return (

    <label className="block">

      <span className="mb-2 block text-sm font-medium text-[#082D52]">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </span>

      {children}

    </label>

  );
}


// ========================================
// INPUT STYLE
// ========================================

const inputClasses = `
  w-full
  rounded-xl
  border
  border-[#DCE8F0]
  bg-white
  px-4
  py-3
  text-sm
  text-gray-900
  outline-none
  transition
  placeholder:text-gray-400
  focus:border-[#D3A72F]
  focus:ring-2
  focus:ring-[#D3A72F]/15
`;