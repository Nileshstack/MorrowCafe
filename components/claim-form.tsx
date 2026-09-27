"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  validateClaimInput,
  type ClaimErrors,
  type ClaimInput,
} from "@/lib/validation";
import { SuccessCard } from "@/components/success-card";

type ClaimResponse = {
  success?: boolean;
  message?: string;
  claimCode?: string;
  errors?: ClaimErrors;
};

type ClaimStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; claimCode: string; message: string }
  | { type: "error"; message: string };

export function ClaimForm() {
  const [values, setValues] = useState<ClaimInput>({ name: "", phone: "" });
  const [errors, setErrors] = useState<ClaimErrors>({});
  const [status, setStatus] = useState<ClaimStatus>({ type: "idle" });
  const errorBannerRef = useRef<HTMLDivElement>(null);
  const loadingStatusRef = useRef<HTMLParagraphElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const previousStatus = useRef<ClaimStatus["type"]>("idle");
  const currentValidationErrors = validateClaimInput(values);
  const isValid =
    !currentValidationErrors.name && !currentValidationErrors.phone;

  useEffect(() => {
    if (status.type === "loading") {
      loadingStatusRef.current?.focus();
    } else if (status.type === "error") {
      errorBannerRef.current?.focus();
    } else if (previousStatus.current === "error" && status.type === "idle") {
      if (submitButtonRef.current && !submitButtonRef.current.disabled) {
        submitButtonRef.current.focus();
      } else {
        nameInputRef.current?.focus();
      }
    }

    previousStatus.current = status.type;
  }, [status.type]);

  if (status.type === "success") {
    return (
      <SuccessCard claimCode={status.claimCode} message={status.message} />
    );
  }

  function validateField(field: keyof ClaimInput, value: string) {
    const fieldError = validateClaimInput({ ...values, [field]: value })[field];
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      if (fieldError) {
        nextErrors[field] = fieldError;
      } else {
        delete nextErrors[field];
      }
      return nextErrors;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateClaimInput(values);
    setErrors(validationErrors);

    if (validationErrors.name || validationErrors.phone) {
      setStatus({ type: "idle" });
      return;
    }

    setStatus({ type: "loading" });
    try {
      const response = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as ClaimResponse;

      if (!response.ok) {
        setErrors(result.errors ?? {});
        setStatus({
          type: "error",
          message: result.message ?? "Unable to process your request.",
        });
        return;
      }

      if (!result.success || !result.claimCode) {
        setStatus({
          type: "error",
          message: result.message ?? "Unable to process your request.",
        });
        return;
      }

      setErrors({});
      setStatus({
        type: "success",
        claimCode: result.claimCode,
        message: result.message ?? "Your offer has been claimed.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "We couldn't connect. Please try again.",
      });
    }
  }

  return (
    <form
      aria-labelledby="claim-heading"
      className="mt-5 space-y-3"
      noValidate
      onSubmit={handleSubmit}
    >
      {status.type === "error" && (
        <div
          className="flex items-start justify-between gap-4 border border-red-800/20 bg-red-50 px-4 py-3 text-sm text-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
          ref={errorBannerRef}
          role="alert"
          tabIndex={-1}
        >
          <p>{status.message}</p>
          <button
            aria-label="Dismiss error message"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-sm text-lg leading-none hover:bg-red-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-800"
            onClick={() => setStatus({ type: "idle" })}
            type="button"
          >
            ×
          </button>
        </div>
      )}
      <fieldset
        className="m-0 min-w-0 space-y-3 border-0 p-0"
        disabled={status.type === "loading"}
      >
        <legend className="sr-only">Claim your café offer</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label
              className="block text-xs font-semibold text-cafe-espresso"
              htmlFor="claim-name"
            >
              Name
            </label>
            <input
              autoComplete="name"
              aria-describedby="claim-name-error"
              aria-invalid={Boolean(errors.name)}
              className={`mt-1.5 h-12 w-full rounded-sm border bg-cafe-paper px-3 text-sm font-normal text-cafe-espresso placeholder:text-cafe-coffee outline-none transition focus-visible:border-cafe-terracotta focus-visible:ring-2 focus-visible:ring-cafe-terracotta/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-espresso ${errors.name ? "border-red-700" : "border-cafe-coffee/70"}`}
              id="claim-name"
              name="name"
              placeholder="First and last name"
              ref={nameInputRef}
              required
              minLength={2}
              onBlur={(event) =>
                validateField("name", event.currentTarget.value)
              }
              onChange={(event) => {
                const name = event.currentTarget.value;
                setValues((currentValues) => ({
                  ...currentValues,
                  name,
                }));
              }}
              type="text"
              value={values.name}
            />
            <p
              aria-live="polite"
              className="min-h-5 pt-1 text-xs text-red-800"
              id="claim-name-error"
            >
              {errors.name}
            </p>
          </div>
          <div>
            <label
              className="block text-xs font-semibold text-cafe-espresso"
              htmlFor="claim-phone"
            >
              Phone Number
            </label>
            <input
              autoComplete="tel"
              aria-describedby="claim-phone-error"
              aria-invalid={Boolean(errors.phone)}
              className={`mt-1.5 h-12 w-full rounded-sm border bg-cafe-paper px-3 text-sm font-normal text-cafe-espresso placeholder:text-cafe-coffee outline-none transition focus-visible:border-cafe-terracotta focus-visible:ring-2 focus-visible:ring-cafe-terracotta/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-espresso ${errors.phone ? "border-red-700" : "border-cafe-coffee/70"}`}
              id="claim-phone"
              inputMode="numeric"
              name="phone"
              onBlur={(event) =>
                validateField("phone", event.currentTarget.value)
              }
              onChange={(event) => {
                const phone = event.currentTarget.value;
                setValues((currentValues) => ({
                  ...currentValues,
                  phone,
                }));
              }}
              placeholder="9876543210"
              required
              type="tel"
              value={values.phone}
            />
            <p
              aria-live="polite"
              className="min-h-5 pt-1 text-xs text-red-800"
              id="claim-phone-error"
            >
              {errors.phone}
            </p>
          </div>
        </div>
        <button
          aria-busy={status.type === "loading"}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-cafe-terracotta px-5 text-sm font-semibold text-cafe-paper transition hover:bg-cafe-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-terracotta disabled:cursor-wait disabled:opacity-65 sm:w-auto"
          disabled={!isValid || status.type === "loading"}
          ref={submitButtonRef}
          type="submit"
        >
          {status.type === "loading" ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-cafe-paper/40 border-t-cafe-paper"
              />
              Preparing your code…
            </>
          ) : (
            <>
              Claim ₹150 OFF
              <span aria-hidden="true">↗</span>
            </>
          )}
        </button>
      </fieldset>
      {status.type === "loading" && (
        <p
          className="text-sm text-cafe-coffee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-espresso"
          ref={loadingStatusRef}
          role="status"
          tabIndex={-1}
        >
          Submitting your offer request…
        </p>
      )}
    </form>
  );
}
