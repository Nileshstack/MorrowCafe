"use client";

import { useEffect, useRef, useState } from "react";

type SuccessCardProps = {
  claimCode: string;
  message: string;
};

export function SuccessCard({ claimCode, message }: SuccessCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

  useEffect(() => {
    cardRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isCopied) return;

    const timeout = window.setTimeout(() => setIsCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [isCopied]);

  async function copyClaimCode() {
    try {
      await navigator.clipboard.writeText(claimCode);
      setCopyError("");
      setIsCopied(true);
    } catch {
      setIsCopied(false);
      setCopyError("Copy unavailable. Select the code to copy it manually.");
    }
  }

  return (
    <section
      aria-labelledby="claim-success-heading"
      className="success-card-enter mt-5 border border-cafe-sage/50 bg-cafe-paper px-5 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe-espresso sm:px-6 sm:py-7"
      ref={cardRef}
      role="status"
      tabIndex={-1}
    >
      <span
        aria-hidden="true"
        className="success-mark relative isolate grid h-10 w-10 place-items-center rounded-full bg-cafe-sage/20 text-xl text-cafe-espresso"
      >
        <span className="success-particle" />
        <span className="success-particle" />
        <span className="success-particle" />
        <span className="success-particle" />
        <span className="success-particle" />
        <span className="success-particle" />
        <span className="success-particle" />
        <span className="success-particle" />
        <span className="relative z-10">✓</span>
      </span>
      <h3
        className="mt-4 font-display text-3xl font-bold leading-none text-cafe-terracotta sm:text-4xl lg:text-5xl"
        id="claim-success-heading"
      >
        ₹150 OFF
      </h3>
      <p className="mt-3 text-sm leading-6 text-cafe-coffee">{message}</p>
      <p className="mt-5 text-sm font-semibold text-cafe-espresso">
        Show this code at Morrow Café
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <code className="border border-cafe-coffee/70 bg-cafe-cream px-4 py-3 font-mono text-xl font-bold tracking-[0.08em] text-cafe-espresso sm:text-2xl">
          {claimCode}
        </code>
        <button
          aria-label={isCopied ? "Claim code copied" : "Copy claim code"}
          className="inline-flex h-11 items-center justify-center gap-2 border border-cafe-coffee/70 px-3 text-sm font-semibold text-cafe-espresso transition-colors hover:bg-cafe-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-terracotta"
          onClick={copyClaimCode}
          type="button"
        >
          {isCopied ? (
            <svg
              aria-hidden="true"
              className="h-4 w-4 text-cafe-sage"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                d="m4 10 4 4 8-8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 20 20"
            >
              <rect
                height="11"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                width="9"
                x="7"
                y="6"
              />
              <path
                d="M5 13H4.5A1.5 1.5 0 0 1 3 11.5v-8A1.5 1.5 0 0 1 4.5 2h7A1.5 1.5 0 0 1 13 3.5V4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          )}
          {isCopied ? "Copied" : "Copy code"}
        </button>
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-xs text-cafe-coffee">
        {copyError || (isCopied ? "Code copied to clipboard." : "")}
      </p>
    </section>
  );
}
