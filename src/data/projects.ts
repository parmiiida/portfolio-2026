import parlai from "../assets/parlai.png";
import cocktail from "../assets/cocktail.png";
import yourTeacher from "../assets/CoinPulse.png";
import awwards from "../assets/awwards.png";

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  year?: string;
  status?: string;
  features?: string[];
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
    category: "AI SaaS",
    year: "2026",
    status: "In Progress",
    features: [
      "AI-powered question answering",
      "Real-time database integration",
      "Responsive modern UI design",
      "Intelligent question categorization",
      "Search functionality",
      "Supabase backend integration",
    ],
    longDescription:
      "ParlAI is a dashboard application where users can create and manage their own AI assistants.It includes assistant setup, FAQ management, test chat, analytics views, and billing/subscription flows in a single interface.The project is built with Next.js, and Supabase has been removed in favor of an in-project backend with a local JSON database.",
    gallery: [parlai, parlai],
  },
  {
    slug: "vulpino",
    title: "Vulpino",
    description: "Modern GSAP cocktail web",
    imageUrl: cocktail,
    content:
      "Vulpino is an animated cocktail experience powered by GSAP timelines, parallax scenes, and responsive motion design.",
    category: "Frontend Animation",
    year: "2025",
    status: "Completed",
    features: [
      "Smooth GSAP animations",
      "Parallax scrolling effects",
      "Interactive cocktail mixing",
      "Responsive design",
      "Performance optimized",
      "Cross-browser compatibility",
    ],
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
    category: "UI Clone",
    year: "2025",
    status: "Completed",
    features: [
      "Award-winning design inspiration",
      "Smooth page transitions",
      "Typography-focused layout",
      "Responsive grid system",
      "Micro-interactions",
      "Accessible components",
    ],
    longDescription:
      "Built with attention to detail on spacing, rhythm, and micro-interactions. Implemented accessible components and consistent theming.",
    gallery: [awwards, awwards],
  },
  {
    slug: "coin-pulse",
    title: "Coin Pulse",
    description: "CryptoPulse — Real-Time Crypto Analytics Dashboard",
    imageUrl: yourTeacher,
    content:
      "Your Teacher delivers adaptive lesson plans and quizzes using LLMs, with progress tracking and insights.",
    category: "Crypto Analytics Dashboard",
    year: "2026",
    status: "Completed",
    features: [
      "Real-time coin market tracking",
      "Global market stats and trends",
      "Interactive candlestick charts",
      "Live orderbook and trade streams",
      "Currency conversion support",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui (Radix UI-based components)",
      "lightweight-charts (TradingView charting library)",
      "CoinGecko API + WebSocket",
    ],
    longDescription:
      "CryptoPulse is a web application focused on real-time cryptocurrency market insights. It provides global market metrics, trending tokens, detailed coin pages, candlestick charts, live orderbook/trade streams, and currency conversion, powered by CoinGecko API and WebSocket data with low-latency updates.",
    gallery: [yourTeacher, yourTeacher],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((p) => p.slug === slug);
}


