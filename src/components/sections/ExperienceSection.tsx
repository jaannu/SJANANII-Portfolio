import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import BlurText from "@/components/animations/BlurText";
import TerminalWindow from "@/components/TerminalWindow";

const experiences = [
  {
    title: "Web Analyst Intern",
    company: "Zoho Corporation",
    period: "March 2025 – May 2025",
    highlights: [
      "Building a GitHub extension for Zoho Projects to enhance repository management efficiency",
      "Mapping GitHub repositories to Zoho Projects for seamless integration and tracking",
      "Streamlining developer workflows by bridging version control with project management",
    ],
    current: true,
  },
  {
    title: "AI Intern – Cybersecurity",
    company: "ASSR Emporium, KK Nagar",
    period: "July 2025 – December 2025",
    highlights: [
      "Designed a multimodal agentic RAG system that improved threat identification efficiency by ~30%",
      "Reduced incident response time by ~28% through LLM-powered semantic retrieval and intelligent alerting",
      "Enhanced cybersecurity team productivity by ~20% by automating threat knowledge access",
    ],
  },
  {
    title: "Research Intern - Machine Learning",
    company: "SRM Group Research Team, Ramapuram",
    period: "April 2025 – June 2025",
    highlights: [
      "Analyzed 10,000+ historical operational records to identify recurring failure patterns",
      "Implemented a self-adapting ML model that reduced predicted downtime by ~25%",
      "Improved maintenance planning efficiency by ~20% using trend analysis",
    ],
  },
  {
    title: "Intern – Data Science",
    company: "TVS Credit Services, Nungambakkam",
    period: "December 2024 – January 2025",
    highlights: [
      "Automated vehicle valuation workflow using CNN-based image classification, reducing manual effort by ~35%",
      "Improved resale price estimation accuracy by ~18% through computer vision",
      "Accelerated evaluation turnaround time by ~30%",
    ],
  },
];

const leadership = [
  {
    title: "Executive Secretary",
    org: "SCARDS Student Club, Easwari Engineering College",
    period: "October 2025 – Present",
    description: "Managed 10+ college-level events, coordinating 50+ team members",
  },
  {
    title: "Joint Technical Head",
    org: "SCARDS Student Club, Easwari Engineering College",
    period: "Oct 2024 - Feb 2025",
    description: "Led 12+ technical workshops impacting 350+ students, increased participation by ~40%",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="font-mono text-accent text-sm">
              <span className="text-muted-foreground">$</span> cat career.log
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
              <BlurText text="Experience & Leadership" className="justify-center" animateBy="words" delay={100} />
            </h2>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary to-accent/20 transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <FadeIn key={index} delay={index * 0.15} direction={index % 2 === 0 ? "left" : "right"}>
                <motion.div
                  className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-accent shadow-glow transform -translate-x-1/2 md:-translate-x-1/2 mt-6">
                    {exp.current && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-accent"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="rounded-xl border border-border/20 overflow-hidden backdrop-blur-2xl bg-background/15">
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/30 border-b border-border/15">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-crimson-bright/80" />
                          <div className="w-3 h-3 rounded-full bg-crimson-medium/60" />
                          <div className="w-3 h-3 rounded-full bg-crimson-dark/60" />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground ml-2">{`job-${index}.sh`}</span>
                      </div>
                      <div className="p-5">
                        <div className={`flex items-center gap-2 text-accent text-sm mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                          <Calendar className="w-4 h-4" />
                          <span className="font-mono text-xs">{exp.period}</span>
                          {exp.current && (
                            <span className="px-2 py-0.5 bg-accent/20 rounded-full text-xs font-mono">Active</span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-display font-semibold mb-1">{exp.title}</h3>
                        <p className="text-muted-foreground mb-4 font-mono text-sm">{exp.company}</p>
                        
                        <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className={`flex items-start gap-2 text-sm text-foreground/80 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                              <span className="text-accent font-mono mt-0.5 flex-shrink-0">→</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <FadeIn delay={0.4}>
          <div className="mt-20">
            <h3 className="text-2xl font-display font-semibold text-center mb-8">
              <span className="text-gradient">Leadership Roles</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {leadership.map((role, index) => (
                <div key={index} className="rounded-xl border border-border/20 overflow-hidden backdrop-blur-2xl bg-background/15">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/30 border-b border-border/15">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-crimson-bright/80" />
                      <div className="w-3 h-3 rounded-full bg-crimson-medium/60" />
                      <div className="w-3 h-3 rounded-full bg-crimson-dark/60" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground ml-2">{`role-${index}.md`}</span>
                  </div>
                  <motion.div className="p-5" whileHover={{ y: -5 }}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-accent/20">
                        <Briefcase className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{role.title}</h4>
                        <p className="text-sm text-muted-foreground font-mono">{role.org}</p>
                        <p className="text-xs text-accent font-mono mb-2">{role.period}</p>
                        <p className="text-sm text-foreground/80">{role.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ExperienceSection;
