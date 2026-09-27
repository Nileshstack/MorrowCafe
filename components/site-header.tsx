export function SiteHeader() {
  return (
    <header className="border-b border-cafe-coffee/15 bg-cafe-cream">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a
          aria-label="Morrow Café home"
          className="flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe-espresso"
          href="#home"
        >
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-full bg-cafe-terracotta font-display text-xl text-cafe-paper"
          >
            m
          </span>
          <span>
            <h1 className="font-display text-2xl leading-none text-cafe-espresso">
              Morrow Café
            </h1>
            <span className="mt-1 block text-xs text-cafe-coffee">
              Slow mornings. Good coffee.
            </span>
          </span>
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-right text-xs">
            <p className="font-semibold text-cafe-coffee">
              Sector 104
              <span className="hidden sm:inline"> · Noida</span>
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 font-medium text-cafe-espresso">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-cafe-sage"
              />
              Open · Closes 10 PM
            </p>
          </div>
          <a
            className="hidden min-h-11 items-center justify-center rounded-sm bg-cafe-terracotta px-4 text-sm font-semibold text-cafe-paper transition-colors hover:bg-cafe-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-espresso md:inline-flex"
            href="#claim"
          >
            Claim Offer
          </a>
        </div>
      </div>
    </header>
  );
}
