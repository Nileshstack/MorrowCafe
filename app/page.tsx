import Image from "next/image";
import { FilePenLine, Store, Ticket } from "lucide-react";
import { ClaimForm } from "@/components/claim-form";
import { RevealSection } from "@/components/reveal-section";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cafe-cream" id="home">
        <section
          aria-labelledby="offer-heading"
          className="mx-auto grid max-w-[1280px] gap-6 px-5 py-6 sm:px-8 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-8 md:px-8 lg:gap-14 lg:px-14 lg:py-10"
        >
          <figure className="relative aspect-[1.55] w-full overflow-hidden rounded-sm bg-cafe-sage/30 md:order-2 md:aspect-[0.9] lg:aspect-[0.94]">
            <Image
              alt="Hands holding three freshly prepared coffees together at a café."
              className="object-cover object-center"
              fill
              priority
              sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 767px) calc(100vw - 64px), (max-width: 1023px) 43vw, min(41vw, 527px)"
              src="/morrow-cafe.jpg"
            />
            <figcaption className="absolute left-3 top-3 bg-cafe-paper/95 px-2 py-1.5 text-[11px] font-semibold text-cafe-espresso sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-xs lg:bottom-5 lg:left-5 lg:top-auto lg:px-2 lg:py-1.5 lg:text-[11px] xl:px-3 xl:py-2 xl:text-xs">
              Poured fresh in Sector 104
            </figcaption>
            <div className="absolute bottom-3 right-3 max-w-[calc(100%-1.5rem)] border border-cafe-paper/70 bg-cafe-paper/95 px-2 py-1.5 text-cafe-espresso shadow-md sm:bottom-4 sm:right-4 sm:px-2.5 sm:py-2 lg:bottom-5 lg:right-5 xl:px-4 xl:py-3">
              <p className="whitespace-nowrap text-xs font-bold sm:text-sm xl:text-base">
                <span aria-hidden="true" className="mr-1 text-cafe-terracotta">
                  ★
                </span>
                4.8 · 1,200+ reviews
              </p>
              <p className="mt-0.5 text-[10px] text-cafe-coffee sm:text-[11px] xl:text-xs">
                Loved by your neighbourhood
              </p>
            </div>
          </figure>

          <div className="rise-in flex flex-col justify-center md:order-1">
            <p className="mb-2 text-xs font-bold uppercase text-cafe-terracotta">
              A little thank-you for your next visit
            </p>
            <h2
              className="font-display text-5xl font-bold leading-none text-cafe-espresso md:text-6xl lg:text-7xl"
              id="offer-heading"
            >
              ₹150 OFF
            </h2>
            <p className="mt-3 text-sm leading-5 text-cafe-coffee">
              A little extra joy with your next coffee.
            </p>
            <a
              className="mt-5 flex min-h-13 w-full items-center justify-center gap-3 rounded-sm bg-cafe-terracotta px-5 py-3 text-base font-bold text-cafe-paper transition-colors hover:bg-cafe-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-espresso sm:w-fit sm:min-w-64"
              href="#claim"
            >
              Claim ₹150 OFF
              <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-3 text-xs text-cafe-coffee/80">
              Your next coffee break, made better.
            </p>
            <div className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-cafe-coffee/25 bg-cafe-paper/70 px-4 py-2 text-xs font-semibold text-cafe-espresso sm:text-sm">
              <svg
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-cafe-terracotta"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5 8V6.5a5 5 0 0 1 10 0V8M4 8h12l-1 9H5L4 8Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 11.5c.7.7 1.3.7 2 0s1.3-.7 2 0"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </svg>
              <span>500+ coffees claimed</span>
            </div>
          </div>
        </section>

        <RevealSection
          aria-labelledby="how-heading"
          className="bg-cafe-paper px-5 py-12 sm:px-8 sm:py-16 lg:px-14"
          id="how-it-works"
        >
          <div className="mx-auto max-w-[1120px]">
            <p className="text-xs font-bold uppercase text-cafe-terracotta">
              From here to your next coffee
            </p>
            <h2
              className="mt-2 font-display text-3xl text-cafe-espresso sm:text-4xl"
              id="how-heading"
            >
              How it works
            </h2>
            <ol className="mt-8 grid gap-7 sm:grid-cols-3 sm:gap-8">
              <li className="border-t border-cafe-coffee/25 pt-4">
                <div aria-hidden="true" className="flex items-end gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-cafe-sage/20 text-cafe-terracotta">
                    <FilePenLine size={18} strokeWidth={1.8} />
                  </span>
                  <span className="pb-0.5 text-xs font-bold text-cafe-terracotta">
                    01
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-cafe-espresso">
                  Claim your offer
                </h3>
                <p className="mt-1 text-sm leading-6 text-cafe-coffee">
                  Add your name and mobile number to get your claim code.
                </p>
              </li>
              <li className="border-t border-cafe-coffee/25 pt-4">
                <div aria-hidden="true" className="flex items-end gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-cafe-sage/20 text-cafe-terracotta">
                    <Ticket size={18} strokeWidth={1.8} />
                  </span>
                  <span className="pb-0.5 text-xs font-bold text-cafe-terracotta">
                    02
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-cafe-espresso">
                  Keep your code
                </h3>
                <p className="mt-1 text-sm leading-6 text-cafe-coffee">
                  Your ₹150 OFF code will appear as soon as you claim.
                </p>
              </li>
              <li className="border-t border-cafe-coffee/25 pt-4">
                <div aria-hidden="true" className="flex items-end gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-cafe-sage/20 text-cafe-terracotta">
                    <Store size={18} strokeWidth={1.8} />
                  </span>
                  <span className="pb-0.5 text-xs font-bold text-cafe-terracotta">
                    03
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-cafe-espresso">
                  Drop by Morrow
                </h3>
                <p className="mt-1 text-sm leading-6 text-cafe-coffee">
                  Show the code at our Sector 104 counter on your next visit.
                </p>
              </li>
            </ol>
          </div>
        </RevealSection>

        <RevealSection
          aria-labelledby="claim-heading"
          className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16 md:px-6 lg:py-20"
          id="claim"
        >
          <div className="border-y border-cafe-coffee/20 py-8 sm:py-10 md:border md:bg-cafe-paper md:px-8 md:py-9 lg:px-10 lg:py-10">
            <p className="text-xs font-bold uppercase text-cafe-terracotta">
              One quick step
            </p>
            <h2
              className="mt-2 font-display text-3xl text-cafe-espresso sm:text-4xl"
              id="claim-heading"
            >
              Get your ₹150 claim code
            </h2>
            <p className="mt-2 text-sm leading-6 text-cafe-coffee">
              Enter your details to reveal your code.
            </p>
            <ClaimForm />
          </div>
        </RevealSection>
      </main>
      <footer
        aria-label="Morrow Café information"
        className="bg-cafe-espresso px-5 pb-5 pt-10 text-cafe-paper sm:px-8 sm:pt-12 lg:px-14"
        id="visit"
      >
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 pb-9 sm:grid-cols-2 md:grid-cols-3 md:gap-10 md:pb-10">
            <section aria-labelledby="footer-cafe-heading">
              <h2
                className="font-display text-2xl text-cafe-paper"
                id="footer-cafe-heading"
              >
                Morrow Café
              </h2>
              <p className="mt-2 text-sm text-cafe-paper/75">
                Slow mornings. Good coffee.
              </p>
              <address className="mt-3 text-sm not-italic leading-6 text-cafe-paper/85">
                Sector 104, Noida
              </address>
            </section>

            <section aria-labelledby="footer-hours-heading">
              <h2
                className="text-xs font-bold uppercase text-cafe-paper/60"
                id="footer-hours-heading"
              >
                Opening hours
              </h2>
              <p className="mt-3 text-sm leading-6 text-cafe-paper/90">
                Mon–Sun
                <br />8 AM – 10 PM
              </p>
            </section>

            <RevealSection aria-labelledby="footer-terms-heading">
              <h2
                className="text-xs font-bold uppercase text-cafe-paper/60"
                id="footer-terms-heading"
              >
                Campaign terms
              </h2>
              <p className="mt-3 text-xs leading-5 text-cafe-paper/65">
                Valid at Morrow Café, Sector 104, Noida. One claim per guest.
                Show your code before billing. Cannot be exchanged for cash or
                combined with another offer.
              </p>
            </RevealSection>
          </div>

          <div className="border-t border-cafe-paper/20 pt-4 text-center text-xs text-cafe-paper/60 md:text-left">
            © 2026 Morrow Café
          </div>
        </div>
      </footer>
    </>
  );
}
