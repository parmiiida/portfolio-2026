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
      <div className="flex py-20 justify-center ">
        <div className=" min-h-screen px-16 py-8">
          <div className="sticky top-24 w-full max-w-md">
            <ProfileCard />
          </div>
        </div>

        <div className=" min-h-screen px-16 py-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-24">
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


