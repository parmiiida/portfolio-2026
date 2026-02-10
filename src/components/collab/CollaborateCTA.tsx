import { useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const CollaborateCTA = () => {
  const collabCardRef = useRef<HTMLDivElement>(null);
  const circleButtonRef = useRef<HTMLButtonElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = collabCardRef.current;
    const circleButton = circleButtonRef.current;
    const flash = flashRef.current;

    if (!card || !circleButton || !flash) return;

    gsap.set(flash, { scale: 0, opacity: 0 });
    gsap.set(circleButton, { scale: 0.8, opacity: 0.7 });

    const handleMouseEnter = () => {
      gsap.to(card, {
        backgroundColor: "rgba(122, 67, 193, 0.1)",
        borderColor: "rgba(122, 67, 193, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(circleButton, {
        scale: 1,
        opacity: 1,
        backgroundColor: "rgba(122, 67, 193, 0.9)",
        duration: 0.3,
        ease: "back.out(1.7)",
      });

      gsap.to(flash, {
        scale: 1,
        opacity: 0.6,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(flash, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "none",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(circleButton, {
        scale: 0.8,
        opacity: 0.7,
        backgroundColor: "rgba(122, 67, 193, 0.5)",
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(flash, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Card
      ref={collabCardRef}
      className="bg-white/5 border border-white/10 p-8 rounded-3xl text-white relative overflow-hidden transition-all duration-300"
    >
      <div
        ref={flashRef}
        className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0"
      />
      <a href="/contact">
        <button
          ref={circleButtonRef}
          className="absolute top-6 right-6 w-12 h-12 bg-purple-600/50 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300 z-10 cursor-pointer"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </a>

      <div className="space-y-4 pr-20">
        <h3 className="text-5xl font-bold">
          Let's <br />
          <span className="text-[#7A43C1]">collaborate</span>
        </h3>
        <p className="text-white/80 max-w-2xl">
          Unlock the potential of your product with expert design and development services. Let's collaborate to create user-centered solutions that not only meet your goals but also delight your users.
        </p>
      </div>
    </Card>
  );
};

export default CollaborateCTA;


