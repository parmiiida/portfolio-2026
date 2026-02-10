import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';

// Try to import ScrollTrigger, fallback to basic animations if not available
let ScrollTrigger: any = null;
try {
  // Use dynamic import for better compatibility
  import('gsap/ScrollTrigger').then((module) => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
} catch (error) {
  console.warn('ScrollTrigger not available, using basic animations');
}

interface ScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  markers?: boolean;
  animation?: gsap.TweenVars;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
  options: ScrollAnimationOptions = {}
): RefObject<T | null> => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      trigger = element,
      start = "top 80%",
      end = "bottom 20%",
      scrub = false,
      once = true,
      markers = false,
      animation = {},
      from = { y: 50, opacity: 0 },
      to = { y: 0, opacity: 1 },
      duration = 0.8,
      delay = 0,
      ease = "power2.out"
    } = options;

    // Set initial state
    gsap.set(element, from);

    if (ScrollTrigger) {
      // Use ScrollTrigger if available
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          once,
          markers,
          onEnter: () => {
            if (!scrub) {
              gsap.to(element, {
                ...to,
                duration,
                delay,
                ease,
                ...animation
              });
            }
          }
        }
      });

      if (scrub) {
        tl.to(element, {
          ...to,
          duration,
          ease,
          ...animation
        });
      }

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.trigger === element || trigger.trigger === trigger) {
            trigger.kill();
          }
        });
      };
    } else {
      // Fallback to Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(element, {
                ...to,
                duration,
                delay,
                ease,
                ...animation
              });

              if (once) {
                observer.unobserve(element);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -20% 0px'
        }
      );

      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }
  }, [options]);

  return elementRef;
};

// Hook for animating multiple elements with stagger
export const useStaggeredScrollAnimation = <T extends HTMLElement = HTMLElement>(
  selector: string,
  options: ScrollAnimationOptions = {}
): RefObject<T | null> => {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const {
      trigger = container,
      start = "top 80%",
      end = "bottom 20%",
      scrub = false,
      once = true,
      markers = false,
      from = { y: 50, opacity: 0 },
      to = { y: 0, opacity: 1 },
      duration = 0.6,
      delay = 0,
      ease = "power2.out",
      stagger = 0.1
    } = options;

    // Set initial state for all elements
    gsap.set(elements, from);

    if (ScrollTrigger) {
      // Use ScrollTrigger if available
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          once,
          markers,
          onEnter: () => {
            if (!scrub) {
              gsap.to(elements, {
                ...to,
                duration,
                delay,
                ease,
                stagger
              });
            }
          }
        }
      });

      if (scrub) {
        tl.to(elements, {
          ...to,
          duration,
          ease,
          stagger
        });
      }

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.trigger === container) {
            trigger.kill();
          }
        });
      };
    } else {
      // Fallback to Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(elements, {
                ...to,
                duration,
                delay,
                ease,
                stagger
              });

              if (once) {
                observer.unobserve(container);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -20% 0px'
        }
      );

      observer.observe(container);

      return () => {
        observer.unobserve(container);
      };
    }
  }, [selector, options]);

  return containerRef;
};

// Hook for text animations
export const useTextScrollAnimation = <T extends HTMLElement = HTMLElement>(
  options: ScrollAnimationOptions = {}
): RefObject<T | null> => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      trigger = element,
      start = "top 80%",
      end = "bottom 20%",
      once = true,
      from = { y: 30, opacity: 0 },
      to = { y: 0, opacity: 1 },
      duration = 0.8,
      delay = 0,
      ease = "power2.out"
    } = options;

    // Split text into words for animation
    const text = element.textContent || '';
    const words = text.split(' ');

    // Clear element and create spans for each word
    element.innerHTML = words.map(word => `<span class="inline-block">${word}</span>`).join(' ');

    const wordSpans = element.querySelectorAll('span');

    // Set initial state
    gsap.set(wordSpans, from);

    if (ScrollTrigger) {
      // Use ScrollTrigger if available
      gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          once,
          onEnter: () => {
            gsap.to(wordSpans, {
              ...to,
              duration,
              delay,
              ease,
              stagger: 0.05
            });
          }
        }
      });

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.trigger === element) {
            trigger.kill();
          }
        });
      };
    } else {
      // Fallback to Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(wordSpans, {
                ...to,
                duration,
                delay,
                ease,
                stagger: 0.05
              });

              if (once) {
                observer.unobserve(element);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -20% 0px'
        }
      );

      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }
  }, [options]);

  return elementRef;
};
