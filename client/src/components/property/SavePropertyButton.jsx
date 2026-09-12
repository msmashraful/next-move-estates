"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Loader2,
} from "lucide-react";

import { useRouter } from "next/navigation";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


export default function SavePropertyButton({
  propertyId,
  className = "",
  showText = true,
  onSavedChange,
}) {

  const router =
    useRouter();


  const [saved, setSaved] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [checking, setChecking] =
    useState(true);

  const [message, setMessage] =
    useState("");


  // ========================================
  // CHECK SAVED STATUS
  // ========================================

  useEffect(() => {

    const checkSavedStatus =
      async () => {

        const token =
          localStorage.getItem(
            "customer_token"
          );


        if (!token) {
          setChecking(false);
          return;
        }


        try {

          const response =
            await fetch(
              `${API_URL}/api/saved-properties/check/${propertyId}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },

                cache:
                  "no-store",
              }
            );


          if (
            response.status === 401
          ) {

            localStorage.removeItem(
              "customer_token"
            );

            localStorage.removeItem(
              "customer_user"
            );


            window.dispatchEvent(
              new Event(
                "customer-auth-change"
              )
            );


            setSaved(false);

            return;
          }


          const data =
            await response.json();


          if (
            response.ok &&
            data.success
          ) {

            setSaved(
              Boolean(
                data.saved
              )
            );

          }

        } catch (error) {

          console.error(
            "Check saved property error:",
            error
          );

        } finally {

          setChecking(false);

        }

      };


    if (propertyId) {
      checkSavedStatus();
    }

  }, [propertyId]);


  // ========================================
  // SAVE / UNSAVE
  // ========================================

  const handleSave =
    async (event) => {

      event.preventDefault();
      event.stopPropagation();


      const token =
        localStorage.getItem(
          "customer_token"
        );


      if (!token) {

        router.push(
          `/sign-in?redirect=${encodeURIComponent(
            window.location.pathname
          )}`
        );

        return;
      }


      try {

        setLoading(true);
        setMessage("");


        const response =
          await fetch(
            `${API_URL}/api/saved-properties/${propertyId}`,
            {
              method:
                saved
                  ? "DELETE"
                  : "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
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
            "Unexpected saved property response:",
            text
          );


          throw new Error(
            "Unexpected server response."
          );

        }


        if (
          response.status === 401
        ) {

          localStorage.removeItem(
            "customer_token"
          );

          localStorage.removeItem(
            "customer_user"
          );


          window.dispatchEvent(
            new Event(
              "customer-auth-change"
            )
          );


          router.push(
            `/sign-in?redirect=${encodeURIComponent(
              window.location.pathname
            )}`
          );


          return;
        }


        if (!response.ok) {

          setMessage(
            data.message ||
              "Unable to update saved property."
          );

          return;
        }


        const newSavedState =
          Boolean(data.saved);


        setSaved(
          newSavedState
        );


        // Parent component-কে জানানো হবে
        if (
          typeof onSavedChange ===
          "function"
        ) {

          onSavedChange(
            newSavedState,
            propertyId
          );

        }


        setMessage(
          data.message || ""
        );


        setTimeout(() => {
          setMessage("");
        }, 1800);


      } catch (error) {

        console.error(
          "Saved property error:",
          error
        );


        setMessage(
          "Unable to update saved property."
        );


      } finally {

        setLoading(false);

      }

    };


  return (
    <div className="relative">

      <button
        type="button"
        onClick={
          handleSave
        }
        disabled={
          loading ||
          checking
        }
        aria-label={
          saved
            ? "Remove from saved properties"
            : "Save property"
        }
        className={`
          inline-flex
          items-center
          justify-center
          gap-2
          transition
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${className}
        `}
      >

        {loading ||
        checking ? (

          <Loader2
            size={20}
            className="animate-spin"
          />

        ) : (

          <Heart
            size={21}
            className={
              saved
                ? "fill-current"
                : ""
            }
          />

        )}


        {showText && (

          <span>

            {saved
              ? "Saved"
              : "Save"}

          </span>

        )}

      </button>


      {message && (

        <div
          className="
            absolute
            right-0
            top-[calc(100%+8px)]
            z-30
            w-max
            max-w-[260px]
            rounded-lg
            bg-[#082D52]
            px-3
            py-2
            text-xs
            font-medium
            text-white
            shadow-lg
          "
        >

          {message}

        </div>

      )}

    </div>
  );
}