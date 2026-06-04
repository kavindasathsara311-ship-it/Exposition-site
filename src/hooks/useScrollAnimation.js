import { useEffect } from "react";

export function useScrollAnimation(ref, animationClass = "animate-in") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
        } else {
          entry.target.classList.remove(animationClass);
        }
      });
    }, observerOptions);

    observer.observe(el);

    return () => {
      if (el) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, [ref, animationClass]);
}
