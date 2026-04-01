import type { ReactNode } from "react";
import Navigation from "./Navigation";
import ProfileCard from "./ProfileCard";
import FAQSection from "./FAQSection";
import CollaborateCTA from "./collab/CollaborateCTA";

interface PageLayoutProps {
  children: ReactNode;
  activeSection?: string;
}

const PageLayout = ({ children, activeSection }: PageLayoutProps) => {
  return (
    <div className="min-h-screen text-white bg-gradient-background">
      <Navigation activeSection={activeSection} />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-10 pt-24 sm:px-6 lg:flex-row lg:gap-12 lg:px-8 lg:pt-28">
        <div className="w-full lg:min-h-screen lg:w-[380px] lg:flex-shrink-0">
          <div className="top-24 w-full lg:sticky">
            <ProfileCard />
          </div>
        </div>

        <div className="w-full min-w-0 lg:min-h-screen">
          <div className="mx-auto w-full max-w-3xl space-y-16 lg:space-y-24">
            {children}
            <FAQSection />
            <CollaborateCTA />

          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;


