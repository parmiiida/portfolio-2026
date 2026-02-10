import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const FeedbackSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll animations
  const titleRef = useScrollAnimation<HTMLHeadingElement>({
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out"
  });

  const controlsRef = useScrollAnimation<HTMLDivElement>({
    from: { y: 30, opacity: 0, scale: 0.9 },
    to: { y: 0, opacity: 1, scale: 1 },
    duration: 0.6,
    delay: 0.4,
    ease: "back.out(1.7)"
  });

  const testimonialRef = useScrollAnimation<HTMLDivElement>({
    from: { y: 60, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1 },
    duration: 0.8,
    delay: 0.6,
    ease: "power2.out"
  });

  const dotsRef = useScrollAnimation<HTMLDivElement>({
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.6,
    delay: 0.8,
    ease: "power2.out"
  });

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Robert P.",
      role: "Product Manager",
      company: "TechCorp",
      content: "Working with John was a pleasure. He transformed our ideas into a polished product with impressive attention to detail in both design and development.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah M.",
      role: "CEO",
      company: "StartupXYZ",
      content: "The level of professionalism and creativity John brought to our project exceeded all expectations. Highly recommended for any development work.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael D.",
      role: "Design Director",
      company: "Creative Agency",
      content: "John's ability to understand complex requirements and translate them into beautiful, functional solutions is truly remarkable.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const prevBtn = prevButtonRef.current;
    const nextBtn = nextButtonRef.current;

    if (!container || !card || !prevBtn || !nextBtn) return;

    // Initial animation
    gsap.fromTo(container,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Button hover animations
    const buttons = [prevBtn, nextBtn];

    buttons.forEach(btn => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
          scale: 1.1,
          backgroundColor: "rgba(122, 67, 193, 0.9)",
          duration: 0.2,
          ease: "power2.out"
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          scale: 1,
          backgroundColor: "rgba(122, 67, 193, 0.7)",
          duration: 0.2,
          ease: "power2.in"
        });
      });
    });

    // Card hover animation
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(122, 67, 193, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.in"
      });
    });

  }, []);

  const nextTestimonial = () => {
    const card = cardRef.current;
    if (!card) return;

    // Animate out to the left
    gsap.to(card, {
      x: -100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        // Animate in from the right
        gsap.fromTo(card,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  const prevTestimonial = () => {
    const card = cardRef.current;
    if (!card) return;

    // Animate out to the right
    gsap.to(card, {
      x: 100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        // Animate in from the left
        gsap.fromTo(card,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  const animateCardTransition = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={containerRef} className="py-20 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold text-white">
            What Clients Say <br/>About My{" "}
            <span className="text-[#7A43C1]">Work</span>
          </h2>
        </div>

        {/* Navigation Controls */}
        <div ref={controlsRef} className="flex gap-3">
          <Button
            ref={prevButtonRef}
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full bg-purple-600/70 hover:bg-purple-600 text-white p-0 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            ref={nextButtonRef}
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full bg-purple-600/70 hover:bg-purple-600 text-white p-0 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Testimonial Card */}
      <div className="flex justify-center">
        <Card
          ref={testimonialRef}
          className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-4xl w-full transition-all duration-300"
        >
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {currentTestimonial.name}
                </h3>
                <p className="text-white/60 text-sm">
                  {currentTestimonial.role} at {currentTestimonial.company}
                </p>
              </div>

              <p className="text-white/80 text-lg leading-relaxed">
                "{currentTestimonial.content}"
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Dots Indicator */}
      <div ref={dotsRef} className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              animateCardTransition();
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "bg-[#7A43C1] scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeedbackSection;
