import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import BlurText from "@/components/animations/BlurText";

const education = [
  {
    degree: "B.Tech Artificial Intelligence and Data Science",
    institution: "Easwari Engineering College",
    location: "Chennai, Tamil Nadu",
    year: "2027 (Expected)",
    grade: "8.43 CGPA (Scale of 10) - Semester IV",
    current: true,
  },
  {
    degree: "Higher Secondary",
    institution: "Velammal Vidyashram",
    location: "Surapet, Tamil Nadu",
    year: "2023",
    grade: "82.8%",
  },
];

const certifications = [
  { name: "Microsoft Developer Associate", org: "Microsoft", year: "2025" },
  { name: "The Python Developer", org: "Udemy", year: "2023" },
  { name: "AI Foundations: Machine Learning", org: "LinkedIn", year: "2024" },
  { name: "Machine Learning with Python: Foundations", org: "LinkedIn", year: "2024" },
  { name: "Introduction to Data Science", org: "Infosys Springboard", year: "2024" },
  { name: "Introduction to OOPS in Java", org: "Infosys Springboard", year: "2024" },
  { name: "Python Essentials 1", org: "Cisco", year: "2024" },
  { name: "Learn-A-Thon 2025", org: "Cisco", year: "2025" },
  { name: "Introduction to Modern AI", org: "Cisco", year: "2025" },
  { name: "Introduction to Data Science", org: "Cisco", year: "2025" },
  { name: "Introduction to Cybersecurity", org: "Cisco", year: "2025" },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-wider uppercase text-sm">Learning Journey</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
              <BlurText text="Education & Certifications" className="justify-center" animateBy="words" delay={100} />
            </h2>
          </div>
        </FadeIn>

        {/* Education */}
        <div className="max-w-4xl mx-auto mb-16">
          <FadeIn>
            <h3 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3">
              <GraduationCap className="w-7 h-7 text-accent" />
              <span>Academic Background</span>
            </h3>
          </FadeIn>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <FadeIn key={index} delay={index * 0.15} direction="left">
                <motion.div
                  className="glass-card rounded-2xl p-6 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {edu.current && (
                    <div className="absolute top-0 right-0 px-4 py-1 bg-accent text-primary-foreground text-xs font-medium rounded-bl-xl">
                      Currently Pursuing
                    </div>
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-display font-semibold mb-2">{edu.degree}</h4>
                      <p className="text-muted-foreground mb-1">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground/70">{edu.location}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="flex items-center gap-2 text-accent mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{edu.year}</span>
                      </div>
                      <p className="text-sm font-semibold">{edu.grade}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <FadeIn delay={0.3}>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3 justify-center">
              <Award className="w-7 h-7 text-accent" />
              <span>Professional Certifications</span>
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 hover:border-accent/30 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 rounded-lg bg-accent/20 flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">{cert.org} • {cert.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default EducationSection;
