import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I offer comprehensive product design and development services including UI/UX design, frontend development, product strategy, and digital transformation consulting.",
  },
  {
    question: "What is your design process?",
    answer:
      "My design process involves research, ideation, prototyping, testing, and iteration. I work closely with clients to understand their needs and create user-centered solutions.",
  },
  {
    question: "How do you handle project timelines?",
    answer:
      "I use agile methodologies to ensure projects are delivered on time. I provide regular updates and maintain clear communication throughout the development process.",
  },
  {
    question: "Can you work with existing teams?",
    answer:
      "Absolutely! I have extensive experience collaborating with cross-functional teams and can seamlessly integrate into your existing workflow and processes.",
  },
  {
    question: "What tools do you use?",
    answer:
      "I use industry-standard tools including Figma for design, React and TypeScript for development, and various other tools depending on project requirements.",
  },
];

const FAQSection = () => {
  return (
    <section className="space-y-8" id="faq">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Frequently <br />
          Asked <span className="text-[#7A43C1]">Questions</span>
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-2xl border-none bg-white/5 px-4 transition-colors sm:px-6"
          >
            <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
