import parlai from "../assets/parlai.png";
import cocktail from "../assets/cocktail.png";
import yourTeacher from "../assets/YourTeacher.png";
import awwards from "../assets/awwards.png";

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  content?: string;
  longDescription?: string;
  gallery?: string[];
}

export const projects: ProjectItem[] = [
  {
    slug: "parlai",
    title: "FAQ-MVP",
    description: "AI-Powered FAQ Assistant",
    imageUrl: parlai,
    content:
      "FAQ-MVP is an intelligent FAQ system powered by AI that provides instant answers to common questions with a modern, responsive interface.",
    longDescription:
      "Built with Next.js and Supabase, this project features real-time question processing, intelligent categorization, and a sleek user interface. The system uses AI to understand context and provide relevant answers, making it perfect for customer support and knowledge management.",
    gallery: [parlai, parlai],
  },
  {
    slug: "vulpino",
    title: "Vulpino",
    description: "Modern GSAP cocktail web",
    imageUrl: cocktail,
    content:
      "Vulpino is an animated cocktail experience powered by GSAP timelines, parallax scenes, and responsive motion design.",
    longDescription:
      "Crafted motion-first interactions with layered timelines and scroll-based triggers. Focused on performance with lazy-loading and GPU-accelerated transforms.",
    gallery: [cocktail, cocktail],
  },
  {
    slug: "awwards-clone",
    title: "Awwards",
    description:
      "A clean clone of Awwwards website including a brief animation and developed UI",
    imageUrl: awwards,
    content:
      "This clone focuses on typography, smooth page transitions, and award-style layout inspired by Awwwards.",
    longDescription:
      "Built with attention to detail on spacing, rhythm, and micro-interactions. Implemented accessible components and consistent theming.",
    gallery: [awwards, awwards],
  },
  {
    slug: "your-teacher",
    title: "Your Teacher",
    description: "An AI-powered interactive teaching assistant",
    imageUrl: yourTeacher,
    content:
      "Your Teacher delivers adaptive lesson plans and quizzes using LLMs, with progress tracking and insights.",
    longDescription:
      "Implemented curriculum generation, quiz engines, and progress visualization. Focused on clear UX for learners and instructors.",
    gallery: [yourTeacher, yourTeacher],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((p) => p.slug === slug);
}


