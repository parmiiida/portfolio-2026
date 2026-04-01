import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import {
  Home,
  FolderOpen,
  Briefcase,
  HelpCircle,
  Mail,
} from "lucide-react";
import gsap from "gsap";

interface NavigationProps {
  activeSection?: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const navItems = [
    { icon: Home, id: "home", label: "Home", url: "/" },
    { icon: FolderOpen, id: "projects", label: "Projects", url: "/#projects" },
    { icon: Briefcase, id: "tools", label: "Tools", url: "/#tools" },
    { icon: HelpCircle, id: "faq", label: "FAQ", url: "/#faq" },
    { icon: Mail, id: "contact", label: "Contact", url: "/contact" },
  ];

  // Refs for gsap
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const tooltipsRef = useRef<HTMLSpanElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animation for the navigation container
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    buttonsRef.current.forEach((btn, index) => {
      if (!btn) return;

      const tooltip = tooltipsRef.current[index];
      const item = navItems[index];

      // Initial state for tooltips
      if (tooltip) {
        gsap.set(tooltip, { scale: 0, opacity: 0 });
      }

      btn.addEventListener("mouseenter", () => {
        // Only animate if not already active
        if (activeSection !== item.id) {
          gsap.to(btn, {
            backgroundColor: "#7A43C1",
            color: "white",
            scale: 1,
            duration: 0.3,
            ease: "power2.out",

          });
        }

        // Animate tooltip
        if (tooltip) {
          gsap.to(tooltip, {
            scale: 1,
            opacity: 1,
            duration: 0.2,
            ease: "back.out(1.7)"
          });
        }
      });

      btn.addEventListener("mouseleave", () => {
        // Only animate if not active
        if (activeSection !== item.id) {
          gsap.to(btn, {
            backgroundColor: "",
            color: "",
            boxShadow: "",
            scale: 1,
            duration: 0.1,
            ease: "power2.in",
          });
        }

        // Hide tooltip
        if (tooltip) {
          gsap.to(tooltip, {
            scale: 0,
            opacity: 0,
            duration: 0.15,
            ease: "power2.in"
          });
        }
      });
    });
  }, [activeSection]);

  return (
    <div className="fixed left-1/2 top-3 z-50 w-[calc(100%-1rem)] -translate-x-1/2 sm:top-6 sm:w-auto">
      <div
        ref={containerRef}
        className="flex justify-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1.5 sm:gap-3 sm:p-2"
      >
        {navItems.map((item, i) => (
          <div className="relative group" key={item.id}>
            <a href={item.url || "#"}>
            <Button
              ref={(el) => {
                if (el) buttonsRef.current[i] = el;
              }}
              variant={activeSection === item.id ? "default" : "ghost"}
              size="icon"
              className={`relative h-10 w-10 cursor-pointer overflow-hidden rounded-xl sm:h-12 sm:w-12
                ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "hover:bg-surface-variant text-white/80"
                }`}
            >
              <item.icon className="h-5 w-5 relative z-10" />
            </Button>
            </a>

            {/* Enhanced Tooltip */}
            <span
              ref={(el) => {
                if (el) tooltipsRef.current[i] = el;
              }}
              className="absolute -bottom-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-white/5 px-3 py-2 text-xs text-white md:block"
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
