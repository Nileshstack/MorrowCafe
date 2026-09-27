"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

type RevealSectionProps = ComponentPropsWithoutRef<"section">;

export function RevealSection({
  className = "",
  children,
  ...props
}: RevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (
      !section ||
      prefersReducedMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    setMotionAllowed(true);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      {...props}
      className={`${className} ${motionAllowed ? "transition-[opacity,transform] duration-500 ease-out" : ""} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      ref={sectionRef}
    >
      {children}
    </section>
  );
}
