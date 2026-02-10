import PageLayout from "../components/PageLayout";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import ToolCard from "../components/ToolCard";
import FeedbackSection from "../components/FeedbackSection";
import { projects as projectsData } from "../data/projects";
import WorkHistorySection from "../components/WorkHistorySection";
import { useScrollAnimation, useStaggeredScrollAnimation } from "../hooks/useScrollAnimation";




const Index = () => {
  const projects = projectsData;

  const tools = [
    { icon: "⚛️", title: "React.js/ Next.js", description: "Website Builder" },
    { icon: "🎨", title: "GSAP/Framer motion", description: "animation Tool" },
    { icon: "🌟", title: "Tailwindcss/CSS/scss", description: "Payment Provider" },
    { icon: "🤖", title: "AI Implementation", description: "AI Assistant" },
    { icon: "📝", title: "TypeScript/JavaScript", description: "Programming languages" },
    { icon: "💾", title: "supabase/", description: "Backend services" },
  ];

  // Animation refs for main sections
  const projectsTitleRef = useScrollAnimation<HTMLHeadingElement>({
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out"
  });

  const projectsGridRef = useStaggeredScrollAnimation<HTMLDivElement>('.project-card', {
    from: { y: 60, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1 },
    duration: 0.8,
    stagger: 0.15,
    delay: 0.4,
    ease: "power2.out"
  });

  const toolsTitleRef = useScrollAnimation<HTMLHeadingElement>({
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out"
  });

  const toolsGridRef = useStaggeredScrollAnimation<HTMLDivElement>('.tool-card', {
    from: { y: 40, opacity: 0, scale: 0.9 },
    to: { y: 0, opacity: 1, scale: 1 },
    duration: 0.6,
    stagger: 0.1,
    delay: 0.4,
    ease: "back.out(1.7)"
  });

  return (
    <PageLayout activeSection="home">
      <section id="home">
        <HeroSection />
      </section>

      <section id="projects" className="space-y-8">
        <div className="space-y-4">
          <h2 ref={projectsTitleRef} className="text-4xl lg:text-5xl font-bold">
            Recent Projects <br />
            and <span className="text-[#7A43C1]">Achievements</span>
          </h2>
        </div>
        <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              slug={project.slug}
              className="project-card"
            />
          ))}
        </div>
      </section>

      <WorkHistorySection />

      <section id="tools" className="space-y-8">
        <div className="space-y-4">
          <h2 ref={toolsTitleRef} className="text-4xl lg:text-5xl font-bold">
            Top-Tier Tools for <br />
            Exceptional <span className="text-[#7A43C1]">Results</span>
          </h2>
        </div>
        <div ref={toolsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              className="tool-card"
            />
          ))}
        </div>
      </section>

      {/* <FeedbackSection /> */}
    </PageLayout>
  );
};

export default Index;
