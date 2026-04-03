import { motion } from "framer-motion";
import { Code, Database, Wrench, Brain, Globe, Server } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import BlurText from "@/components/animations/BlurText";
import TerminalWindow from "@/components/TerminalWindow";
import FloatingParticles from "@/components/3d/FloatingParticles";

const skillCategories = [
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "Java", "C", "C++", "JavaScript"],
    color: "from-crimson-bright to-crimson-medium",
  },
  {
    title: "Machine Learning",
    icon: Brain,
    skills: ["Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Seaborn"],
    color: "from-crimson-medium to-crimson-dark",
  },
  {
    title: "Web & Backend",
    icon: Globe,
    skills: ["React.js", "Node.js", "REST APIs", "JSON"],
    color: "from-crimson-dark to-crimson-darker",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["SQL", "Firebase"],
    color: "from-crimson-darker to-crimson-darkest",
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["GitHub", "Jupyter Notebook", "Canva", "MS Excel", "PowerPoint"],
    color: "from-crimson-bright to-crimson-dark",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* 3D Floating particles background */}
      <FloatingParticles />

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="font-mono text-accent text-sm">
              <span className="text-muted-foreground">$</span> ls skills/
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
              <BlurText text="Skills & Technologies" className="justify-center" animateBy="words" delay={100} />
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <TerminalWindow title={`${category.title.toLowerCase().replace(/ & /g, '-')}.config`}>
                <motion.div
                  className="p-6 h-full"
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 40px hsl(355 70% 43% / 0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                    <category.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-display font-semibold mb-4">{category.title}</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="px-3 py-1.5 text-sm rounded-full bg-secondary/80 text-secondary-foreground border border-border/50 hover:border-accent/50 transition-colors cursor-default font-mono"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </TerminalWindow>
            </FadeIn>
          ))}
        </div>

        {/* Skills visualization */}
        <FadeIn delay={0.5}>
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-semibold text-center mb-8">
              <span className="text-gradient">Core Competencies</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Data Science", value: 90 },
                { label: "Machine Learning", value: 85 },
                { label: "Web Development", value: 80 },
                { label: "Cybersecurity AI", value: 75 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="none" className="text-secondary" />
                      <motion.circle
                        cx="48" cy="48" r="40"
                        stroke="url(#gradient)"
                        strokeWidth="6" fill="none" strokeLinecap="round"
                        strokeDasharray={251}
                        initial={{ strokeDashoffset: 251 }}
                        whileInView={{ strokeDashoffset: 251 - (251 * item.value) / 100 }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(355 85% 27%)" />
                          <stop offset="100%" stopColor="hsl(355 70% 55%)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold font-mono">{item.value}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default SkillsSection;
