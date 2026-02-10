import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const ContactForm = () => {
  const collabCardRef = useRef<HTMLDivElement>(null);
  const circleButtonRef = useRef<HTMLButtonElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = collabCardRef.current;
    const circleButton = circleButtonRef.current;
    const flash = flashRef.current;

    if (!card || !circleButton || !flash) return;

    // Initial setup
    gsap.set(flash, { scale: 0, opacity: 0 });
    gsap.set(circleButton, { scale: 0.8, opacity: 0.7 });

    // Card hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        backgroundColor: "rgba(122, 67, 193, 0.1)",
        borderColor: "rgba(122, 67, 193, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(circleButton, {
        scale: 1,
        opacity: 1,
        backgroundColor: "rgba(122, 67, 193, 0.9)",
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      // Flash animation
      gsap.to(flash, {
        scale: 1,
        opacity: 0.6,
        duration: 0.4,
        ease: "power2.out"
      });

      // Continuous flash movement
      gsap.to(flash, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "none"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3,
        ease: "power2.in"
      });

      gsap.to(circleButton, {
        scale: 0.8,
        opacity: 0.7,
        backgroundColor: "rgba(122, 67, 193, 0.5)",
        duration: 0.3,
        ease: "power2.in"
      });

      gsap.to(flash, {
        scale: 0,
        opacity: 0,
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`New message from ${name}`);
    const body = encodeURIComponent(message + `\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:parmida@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="space-y-8 ">
      <div className="space-y-4">
        <h2 className="text-4xl lg:text-5xl font-bold">
          Let's Create <br />
          Something <span>Amazing</span>
        </h2>
      </div>

      <Card className="bg-white/5 border-none p-8 rounded-3xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-input border-none bg-white/10 text-foreground placeholder:text-muted-foreground rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-none bg-white/10 text-foreground placeholder:text-muted-foreground rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Your Message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-input border-none bg-white/10 text-foreground placeholder:text-muted-foreground rounded-xl resize-none"
            />
          </div>

          <Button variant="portfolio" size="portfolio" className="w-full" type="submit">
            Send <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Card>

    </section>
  );
};

export default ContactForm;
