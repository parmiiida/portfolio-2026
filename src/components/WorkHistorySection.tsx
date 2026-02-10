import { useScrollAnimation, useStaggeredScrollAnimation } from "../hooks/useScrollAnimation";

interface WorkItem {
  company: string;
  role: string;
  date: string;
  description: string;
  responsibilities?: string[];
}

const workHistory: WorkItem[] = [
  {
    company: "Danum Group",
    role: "Product Designer & Developer",
    date: "2025 – Present",
    description: `Developed and managed React components to create dynamic user interfaces.
Worked closely with teams to address UI/UX challenges and guarantee seamless functionality.`,
    responsibilities: [
      "Built reusable component library with Tailwind and Radix UI",
      "Integrated REST APIs and handled client-side caching",
      "Collaborated with designers to refine UX flows",
      "Improved performance and accessibility scores",
    ]
  },
  {
    company: "Upwork",
    role: "Fullstack Developer",
    date: "2025 – present",
    description: "experienced in building modern, scalable web applications using Next.js, React, Node.js, and Supabase. Skilled in designing responsive UIs, integrating APIs, implementing authentication, and adding AI-powered features to enhance user experience.",
    responsibilities: [
       " Developed and deployed responsive, high-performance web applications with Next.js and React.",

    "Built and optimized RESTful APIs and backend logic with Node.js.",

       " Managed database design, authentication, and data handling using Supabase.",

        "Integrated AI-powered features (chatbots, content generation, automation tools).",

       " Implemented JWT authentication and secure user management flows.",

       " Created interactive animations and modern UI components using Tailwind CSS, GSAP, and Framer Motion.",

       " Collaborated with clients on Upwork, delivering custom solutions tailored to business needs.",


    ]
  },
  {
    company: "Florya",
    role: "Intern Frontend Developer",
    date: "2024 – 2025",
    description: "Implemented Piexl perfect designs to HTML5 and CSS.",
    responsibilities: [
      "Developed UI features with Javascript, HTML and CSS",
      "Maintained design consistency across pages",
    ]
  },
];

const WorkHistorySection = () => {
  const titleRef = useScrollAnimation<HTMLHeadingElement>({
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out"
  });

  const workItemsRef = useStaggeredScrollAnimation<HTMLDivElement>('.work-item', {
    from: { y: 60, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1 },
    duration: 0.8,
    stagger: 0.2,
    delay: 0.4,
    ease: "power2.out"
  });

  return (
    <section id="work" className="space-y-8">
      <div className="space-y-4">
        <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold">
          Work <span className="text-[#7A43C1]">History</span>
        </h2>
      </div>

      <div ref={workItemsRef} className="space-y-6">
        {workHistory.map((item, idx) => (
          <div key={idx} className="work-item bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold">{item.company}</h3>
                <p className="text-white/70">{item.role}</p>
              </div>
              <div className="text-white/60 text-sm">{item.date}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div>
                <h3 className="text-white/90 font-medium">Overview</h3>
                <p className="text-white/80 mt-3 leading-relaxed">{item.description}</p>
              </div>
              {item.responsibilities && item.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-white/90 font-medium">Responsibilities</h3>
                  <ul className="mt-3 list-disc list-inside text-white/80 space-y-1">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkHistorySection;


