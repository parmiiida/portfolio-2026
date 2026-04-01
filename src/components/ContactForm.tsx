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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setStatusMessage("");
    setIsError(false);

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 12000);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message }),
        signal: controller.signal,
      });
      window.clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatusMessage("Message sent successfully. I will get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setIsError(true);
      setStatusMessage(
        "Could not send right now. Please try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-8 ">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Let's Create <br />
          Something <span>Amazing</span>
        </h2>
      </div>

      <Card className="rounded-3xl border-none bg-white/5 p-5 sm:p-8">
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

          <Button
            variant="portfolio"
            size="portfolio"
            className="w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"} <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
          {statusMessage && (
            <p
              className={`text-sm ${
                isError ? "text-red-300" : "text-emerald-300"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </Card>

    </section>
  );
};

export default ContactForm;
