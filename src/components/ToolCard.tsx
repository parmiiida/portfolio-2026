import { useEffect, useRef } from "react";
import { Card } from "./ui/card";
import gsap from "gsap";

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

const ToolCard = ({ icon, title, description, className = "" }: ToolCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    const content = contentRef.current;

    if (!card || !icon || !content) return;

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        y: -5,
        backgroundColor: "rgba(122, 67, 193, 0.1)",
        borderColor: "rgba(122, 67, 193, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(icon, {
        scale: 1.2,
        rotation: 5,
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      gsap.to(content, {
        x: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderColor: "transparent",
        duration: 0.3,
        ease: "power2.in"
      });

      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.in"
      });

      gsap.to(content, {
        x: 0,
        duration: 0.3,
        ease: "power2.in"
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
      ref={cardRef}
      className={`group cursor-pointer border-none bg-white/5 p-6 rounded-2xl ${className}`}
    >
      <div className="flex items-center gap-4">
        <div
          ref={iconRef}
          className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center text-2xl"
        >
          {icon}
        </div>
        <div ref={contentRef}>
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;
