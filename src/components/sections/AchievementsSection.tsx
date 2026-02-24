import { motion } from "framer-motion";
import { Trophy, Medal, Award, Star } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import BlurText from "@/components/animations/BlurText";
import TerminalWindow from "@/components/TerminalWindow";

const achievements = [
  { title: "Winner – VisAIon Hackathon", org: "CIKLUM & IET", description: "AI-driven customer personalization system", icon: Trophy, tier: "gold" },
  { title: "2nd Place – TechXelerate'25 Hackathon", org: "BITS Pilani", icon: Medal, tier: "silver" },
  { title: "Winner – Agile Network Ideathon 2025", icon: Trophy, tier: "gold" },
  { title: "Top 10 Finalist – CMR Hackfest 3.0", icon: Star, tier: "bronze" },
  { title: "Finalist – HITS Intellithon", description: "AI-based solutions", icon: Award, tier: "silver" },
  { title: "Multiple Podium Finishes", description: "National-level symposiums in AI, ML, Cybersecurity, and Web Development", icon: Star, tier: "bronze" },
];

const speakerExperience = [
  { title: "IGEN ENERGATHON Speaker", description: "Participated for 2025 minutes" },
  { title: "AI and ML Workshop", description: "Montfort Matriculation School - 200+ 11th and 12th students" },
];

const AchievementsSection = () => {
  const getTierStyles = (tier: string) => {
    switch (tier) {
      case "gold": return "from-yellow-500/30 to-yellow-600/10 border-yellow-500/30";
      case "silver": return "from-gray-300/30 to-gray-400/10 border-gray-400/30";
      default: return "from-amber-700/30 to-amber-800/10 border-amber-700/30";
    }
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <motion.div
        className="absolute top-20 right-10 text-accent/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <Trophy className="w-64 h-64" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="font-mono text-accent text-sm">
              <span className="text-muted-foreground">$</span> cat achievements.log
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
              <BlurText text="Achievements & Awards" className="justify-center" animateBy="words" delay={100} />
            </h2>
          </div>
        </FadeIn>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {achievements.map((achievement, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                className={`relative rounded-2xl p-6 bg-gradient-to-br ${getTierStyles(achievement.tier)} backdrop-blur-sm border h-full`}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-background/50">
                    <achievement.icon className={`w-6 h-6 ${
                      achievement.tier === "gold" ? "text-yellow-500" :
                      achievement.tier === "silver" ? "text-gray-300" :
                      "text-amber-600"
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{achievement.title}</h3>
                    {achievement.org && <p className="text-sm text-muted-foreground font-mono mb-1">{achievement.org}</p>}
                    {achievement.description && <p className="text-sm text-foreground/70">{achievement.description}</p>}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Speaker Experience */}
        <FadeIn delay={0.5}>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-display font-semibold text-center mb-8">
              <span className="text-gradient">Speaker Experience</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {speakerExperience.map((exp, index) => (
                <TerminalWindow key={index} title={`talk-${index}.md`}>
                  <motion.div
                    className="p-5 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                  >
                    <h4 className="font-semibold mb-2">{exp.title}</h4>
                    <p className="text-sm text-muted-foreground font-mono">{exp.description}</p>
                  </motion.div>
                </TerminalWindow>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AchievementsSection;
