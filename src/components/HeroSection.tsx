import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation, useStaggeredScrollAnimation } from "../hooks/useScrollAnimation";

const HeroSection = () => {
  const titleRef = useScrollAnimation<HTMLHeadingElement>({
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 1,
    delay: 0.2,
    ease: "power3.out"
  });

  const subtitleRef = useScrollAnimation<HTMLParagraphElement>({
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    delay: 0.4,
    ease: "power2.out"
  });

  const statsRef = useStaggeredScrollAnimation<HTMLDivElement>('.stat-item', {
    from: { y: 30, opacity: 0, scale: 0.9 },
    to: { y: 0, opacity: 1, scale: 1 },
    duration: 0.6,
    stagger: 0.1,
    delay: 0.6,
    ease: "back.out(1.7)"
  });

  const buttonsRef = useScrollAnimation<HTMLDivElement>({
    from: { y: 30, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    delay: 0.8,
    ease: "power2.out"
  });

  const trustedRef = useScrollAnimation<HTMLDivElement>({
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.6,
    delay: 1,
    ease: "power2.out"
  });

  return (
    <section className="space-y-8">
      <div className="space-y-6">
        <h1 ref={titleRef} className="text-3xl font-bold leading-tight sm:text-4xl lg:text-6xl">
          Transforming Your <br />
          Ideas into <span className="text-[#7A43C1]">Reality</span>
        </h1>
        <p ref={subtitleRef} className="max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl">
          Passionate and self-driven developer.
          <br />
          Specialize in transforming ideas into pixel-perfect reality.
        </p>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:gap-10 lg:gap-12">
        <div className="stat-item text-center">
          <div className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">+1</div>
          <div className="text-muted-foreground text-sm uppercase tracking-wide">
            Years of
            <br />
            Experience
          </div>
        </div>
        <div className="stat-item text-center">
          <div className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">+50</div>
          <div className="text-muted-foreground text-sm uppercase tracking-wide">
            Projects
            <br />
            Completed
          </div>
        </div>
        <div className="stat-item text-center">
          <div className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">+10</div>
          <div className="text-muted-foreground text-sm uppercase tracking-wide">
            Worldwide
            <br />
            Clients
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div ref={buttonsRef} className="flex gap-4 flex-wrap ">
        <Button onClick={() => window.location.href = "/contact"} variant="portfolio" size="portfolio" className="bg-[#7A43C1]">
          Let's Talk
        </Button>
        <Button
          onClick={() => window.location.href = "/#projects"}
          variant="ghost"
          size="lg"
          className="text-foreground hover:bg-surface-variant"
        >
          My Work <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Trusted By */}
      <div ref={trustedRef} className="pt-8">
        <p className="text-muted-foreground text-sm mb-4">
          Relied on by companies near, far, and worldwide
        </p>
        <div className="flex flex-wrap items-center gap-5 opacity-60 sm:gap-8">
          <div className="text-lg font-semibold">Danumgroup</div>
          <div className="text-lg font-semibold">Driwego</div>
          <div className="text-lg font-semibold">Vetclub</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
