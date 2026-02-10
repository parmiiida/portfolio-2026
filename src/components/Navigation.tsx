import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import {
  Home,
  FolderOpen,
  Briefcase,
  HelpCircle,
  Mail,
  PenTool,
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
    { icon: PenTool, id: "about", label: "About", url: "/" },
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
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div ref={containerRef} className="flex gap-4 bg-white/5 rounded-2xl p-2 border border-white/10">
        {navItems.map((item, i) => (
          <div className="relative group" key={item.id}>
            <a href={item.url || "#"}>
            <Button
              ref={(el) => {
                if (el) buttonsRef.current[i] = el;
              }}
              variant={activeSection === item.id ? "default" : "ghost"}
              size="icon"
              className={`rounded-xl relative overflow-hidden w-12 h-12 cursor-pointer
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
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white/5 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
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
