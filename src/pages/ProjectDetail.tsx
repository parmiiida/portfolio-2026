import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { Button } from "../components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useScrollAnimation, useStaggeredScrollAnimation } from "../hooks/useScrollAnimation";
import ProjectCard from "../components/ProjectCard";

// Helper functions to get project-specific data
const getTechnologiesForProject = (slug: string): string[] => {
  const techMap: Record<string, string[]> = {
    "parlai": ["Next.js", "TypeScript", "Supabase", "OpenAI API", "Tailwind CSS", "React"],
    "vulpino": ["GSAP", "JavaScript", "HTML5", "CSS3", "WebGL", "Three.js"],
    "awwards-clone": ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Next.js"],
    "your-teacher": ["React", "TypeScript", "OpenAI API", "Node.js", "MongoDB", "Express"]
  };
  return techMap[slug] || ["React", "TypeScript", "JavaScript"];
};

const getProjectLinks = (slug: string): { liveUrl?: string; githubUrl?: string } => {
  const linksMap: Record<string, { liveUrl?: string; githubUrl?: string }> = {
    "parlai": {
      liveUrl: "https://faq-mvp-e9t4.vercel.app/",
      githubUrl: "https://github.com/parmiiida/FAQ-MVP"
    },
    "vulpino": {
      liveUrl: "https://vulpinoo-m1we.vercel.app/",
      githubUrl: "https://github.com/parmiiida/Vulpinoo"
    },
    "awwards-clone": {
      liveUrl: "https://awwards-clone-two.vercel.app/",
      githubUrl: "https://github.com/parmiiida/awwards-clone"
    },
    "your-teacher": {
      liveUrl: "https://your-teacher-5v6ud5vyh-parmiiidas-projects.vercel.app/",
      githubUrl: "https://github.com/parmiiida/your-teacher"
    }
  };
  return linksMap[slug] || {};
};

const getFeaturesForProject = (slug: string): string[] => {
  const featuresMap: Record<string, string[]> = {
    "parlai": [
      "AI-powered question answering",
      "Real-time database integration",
      "Responsive modern UI design",
      "Intelligent question categorization",
      "Search functionality",
      "Supabase backend integration"
    ],
    "vulpino": [
      "Smooth GSAP animations",
      "Parallax scrolling effects",
      "Interactive cocktail mixing",
      "Responsive design",
      "Performance optimized",
      "Cross-browser compatibility"
    ],
    "awwards-clone": [
      "Award-winning design inspiration",
      "Smooth page transitions",
      "Typography-focused layout",
      "Responsive grid system",
      "Micro-interactions",
      "Accessible components"
    ],
    "your-teacher": [
      "AI-powered lesson generation",
      "Adaptive quiz system",
      "Progress tracking",
      "Interactive learning modules",
      "Real-time feedback",
      "Multi-language support"
    ]
  };
  return featuresMap[slug] || ["Modern UI/UX", "Responsive design", "Performance optimized"];
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find the project by slug
  const project = projects.find(p => p.slug === slug);
  const projectLinks = getProjectLinks(slug || '');

  // Animation refs
  const backButtonRef = useScrollAnimation<HTMLDivElement>({
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.6,
    delay: 0.2,
    ease: "power2.out"
  });

  const titleRef = useScrollAnimation<HTMLHeadingElement>({
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    delay: 0.4,
    ease: "power2.out"
  });

  const imageRef = useScrollAnimation<HTMLDivElement>({
    from: { y: 50, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1 },
    duration: 0.8,
    delay: 0.6,
    ease: "power2.out"
  });

  const contentRef = useScrollAnimation<HTMLDivElement>({
    from: { y: 30, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    delay: 0.8,
    ease: "power2.out"
  });

  const otherProjectsRef = useScrollAnimation<HTMLDivElement>({
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    delay: 1.0,
    ease: "power2.out"
  });

  const otherProjectsGridRef = useStaggeredScrollAnimation<HTMLDivElement>('.other-project-card', {
    from: { y: 30, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1 },
    duration: 0.6,
    stagger: 0.15,
    delay: 1.2,
    ease: "power2.out"
  });

  if (!project) {
    return (
      <PageLayout activeSection="projects">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link to="/">
              <Button variant="portfolio" size="portfolio">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout activeSection="projects">
      <div className="min-h-screen">
        {/* Back Button */}
        <div ref={backButtonRef} className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="lg" className="text-foreground hover:bg-surface-variant">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <h1 ref={titleRef} className="text-5xl lg:text-6xl font-bold mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Project Image */}
        <div ref={imageRef} className="mb-12">
          <div className="aspect-video overflow-hidden rounded-2xl bg-white/5 border border-white/10">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Project Details */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {getTechnologiesForProject(project.slug).map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {getFeaturesForProject(project.slug).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#7A43C1] mt-1">•</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Project Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium">Web Development</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Year:</span>
                  <p className="font-medium">2024</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <p className="font-medium text-green-400">Completed</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {projectLinks.liveUrl && (
                <Button
                  asChild
                  variant="portfolio"
                  size="portfolio"
                  className="w-full bg-[#7A43C1]"
                >
                  <a href={projectLinks.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Site
                  </a>
                </Button>
              )}

              {projectLinks.githubUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="portfolio"
                  className="w-full"
                >
                  <a href={projectLinks.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Other Projects Section */}
        <div ref={otherProjectsRef} className="mt-20 pt-20 border-t border-white/10">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Other <span className="text-[#7A43C1]">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore more of my work and discover other exciting projects.
            </p>
          </div>

          <div ref={otherProjectsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(p => p.slug !== slug) // Exclude current project
              .map((otherProject) => (
                <ProjectCard
                  key={otherProject.slug}
                  title={otherProject.title}
                  description={otherProject.description}
                  imageUrl={otherProject.imageUrl}
                  slug={otherProject.slug}
                  className="other-project-card"
                />
              ))}
          </div>

          {/* Back to All Projects Button */}
          <div className="text-center mt-12">
            <Link to="/#projects">
              <Button variant="outline" size="lg" className="text-foreground hover:bg-surface-variant">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProjectDetail;
