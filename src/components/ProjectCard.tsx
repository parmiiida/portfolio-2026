import { useEffect, useRef } from "react";
import { Card } from "./ui/card";
import gsap from "gsap";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  className?: string;
}

const ProjectCard = ({
  title,
  description,
  imageUrl,
  slug,
  className = "",
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!card || !image || !content) return;

    // Simple hover animation - change title and description color
    const handleMouseEnter = () => {
      gsap.to(card.querySelector('h3'), {
        color: "#7A43C1",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(card.querySelector('p'), {
        color: "#7A43C1",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card.querySelector('h3'), {
        color: "",
        duration: 0.3,
        ease: "power2.in"
      });
      gsap.to(card.querySelector('p'), {
        color: "",
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
      className={`group cursor-pointer overflow-hidden bg-white/5 border-none py-0 ${className}`}
    >
      <a href={`/projects/${slug}`}>
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            ref={imageRef}
            src={imageUrl}
            alt={title}
            className="w-full opacity-65 h-full object-cover"
          />
        </div>
        <div ref={contentRef} className="p-6">
          <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </a>
    </Card>
  );
};

export default ProjectCard;
