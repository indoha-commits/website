import { useEffect, useRef, useState, forwardRef } from "react";
import { useReducedMotion } from "framer-motion";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

// Component wrapper for scroll animations
interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";
  delay?: number;
  threshold?: number;
}

export const ScrollAnimation = forwardRef<HTMLDivElement, ScrollAnimationProps>(
  function ScrollAnimation(
    {
      children,
      className = "",
      animation = "fade-up",
      delay = 0,
      threshold = 0.1,
    },
    forwardedRef
  ) {
    const shouldReduceMotion = useReducedMotion();
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });

    const animationClasses: Record<string, string> = {
      "fade-up": "translate-y-4 opacity-0",
      "fade-in": "opacity-0",
      "slide-left": "-translate-x-4 opacity-0",
      "slide-right": "translate-x-4 opacity-0",
      "scale-in": "scale-[0.98] opacity-0",
    };

    const visibleClass = "translate-y-0 translate-x-0 scale-100 opacity-100";
    const baseClass = animationClasses[animation] || animationClasses["fade-up"];

    // Combine refs if forwardedRef is provided
    const setRefs = (element: HTMLDivElement | null) => {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
      if (typeof forwardedRef === "function") {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    };

    return (
      <div
        ref={setRefs}
        className={`${shouldReduceMotion ? "" : "transition-all duration-300 ease-out"} ${
          shouldReduceMotion || isVisible ? visibleClass : baseClass
        } ${className}`}
        style={{ transitionDelay: shouldReduceMotion ? undefined : `${delay}ms` }}
      >
        {children}
      </div>
    );
  }
);
