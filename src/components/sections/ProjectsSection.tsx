import { motion } from "framer-motion";
import { ExternalLink, Github, Shield, Brain, Car, Users, BarChart, DollarSign, Vote } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import BlurText from "@/components/animations/BlurText";
import Magnet from "@/components/animations/Magnet";
import TerminalWindow from "@/components/TerminalWindow";

const projects = [
  {
    title: "AI Intrusion Detection with Self-Healing",
    description: "Hybrid hardware-software security system with self-healing intrusion detection, IP cooldown blocking, and prompt injection protection.",
    icon: Shield,
    tags: ["AI", "Security", "Quantum Encryption"],
    featured: true,
  },
  {
    title: "Customer Shopping Personalization",
    description: "AI-driven personalization system for CIKLUM using facial recognition to deliver targeted offers and notifications.",
    icon: Users,
    tags: ["Computer Vision", "ML", "Retail"],
    featured: true,
  },
  {
    title: "Multimodal RAG Agentic AI",
    description: "Retrieval-Augmented Generation pipeline for cybersecurity threat analysis, reducing manual effort by ~30%.",
    icon: Brain,
    tags: ["LLM", "RAG", "Cybersecurity"],
    featured: true,
  },
  {
    title: "Predictive Maintenance System",
    description: "ML model analyzing historical hardware data to identify anomaly patterns and support proactive maintenance decisions.",
    icon: BarChart,
    tags: ["ML", "Predictive Analytics"],
  },
  {
    title: "AI-Based Career Guidance System",
    description: "Personalized career guidance platform with ML-based interest mapping and gamified learning integration.",
    icon: Brain,
    tags: ["AI", "EdTech", "LLM"],
  },
  {
    title: "Vehicle Valuation Chatbot",
    description: "AI-based chatbot for TVS Credit Services using computer vision techniques for vehicle assessment.",
    icon: Car,
    tags: ["Computer Vision", "Chatbot", "CNN"],
  },
  {
    title: "Student Voting Website",
    description: "Real-time web-based voting system for college elections built with HTML, CSS, and JavaScript.",
    icon: Vote,
    tags: ["Web Dev", "JavaScript"],
  },
  {
    title: "Expense Tracker",
    description: "Application analyzing spending patterns and generating insights for better financial management.",
    icon: DollarSign,
    tags: ["Python", "Analytics"],
  },
];

const ProjectsSection = () => {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="font-mono text-accent text-sm">
              <span className="text-muted-foreground">$</span> git log --oneline projects/
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
              <BlurText text="Featured Projects" className="justify-center" animateBy="words" delay={100} />
            </h2>
          </div>
        </FadeIn>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {featuredProjects.map((project, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <Magnet strength={0.08}>
                <TerminalWindow title={`${project.title.toLowerCase().split(' ').slice(0, 2).join('-')}.py`}>
                  <motion.div
                    className="p-8 h-full flex flex-col group"
                    whileHover={{ 
                      y: -12,
                      boxShadow: "0 30px 60px hsl(355 70% 43% / 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <project.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    
                    <h3 className="text-xl font-display font-semibold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </TerminalWindow>
              </Magnet>
            </FadeIn>
          ))}
        </div>

        {/* Other Projects */}
        <FadeIn delay={0.4}>
          <h3 className="text-2xl font-display font-semibold text-center mb-8">
            <span className="text-gradient">More Projects</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {otherProjects.map((project, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-xl p-5 flex items-start gap-4 hover:border-accent/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <div className="p-2.5 rounded-lg bg-secondary/80">
                  <project.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{project.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs text-accent font-mono">
                        {tag}{tagIndex < Math.min(project.tags.length, 2) - 1 ? " •" : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ProjectsSection;
