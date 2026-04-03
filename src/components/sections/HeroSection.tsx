import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import BlurText from "@/components/animations/BlurText";
import SplitText from "@/components/animations/SplitText";
import GradientText from "@/components/animations/GradientText";
import Magnet from "@/components/animations/Magnet";
import FadeIn from "@/components/animations/FadeIn";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto mb-8">
              <div className="p-6 md:p-10 text-center backdrop-blur-2xl bg-background/20 rounded-2xl border border-border/15 shadow-elevated">
                <p className="font-mono text-sm text-accent mb-4">
                  <span className="text-muted-foreground">$</span> whoami
                </p>
                
                <BlurText
                  text="Hello, I'm"
                  className="justify-center text-lg md:text-xl text-muted-foreground mb-4 font-sans tracking-wider uppercase"
                  delay={80}
                  animateBy="letters"
                />
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6">
                  <SplitText
                    text="S Jananii"
                    className="justify-center"
                    splitBy="chars"
                    delay={60}
                    as="span"
                  />
                </h1>

                <div className="mb-6">
                  <GradientText className="text-2xl md:text-3xl font-display font-medium">
                    AI & Data Science Engineer
                  </GradientText>
                </div>

                <p className="font-mono text-xs text-muted-foreground/60 mt-4">
                  <span className="text-accent">→</span> Building intelligent, data-driven solutions that make an impact
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Contact Links */}
          <FadeIn delay={0.6}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Magnet strength={0.2}>
                <a
                  href="mailto:j.a.n27suresh@gmail.com"
                  className="group flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-2xl bg-background/20 border border-border/15 hover:border-accent/50 transition-all duration-300"
                >
                  <Mail className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-mono">j.a.n27suresh@gmail.com</span>
                </a>
              </Magnet>

              <Magnet strength={0.2}>
                <a
                  href="tel:+918056028354"
                  className="group flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-2xl bg-background/20 border border-border/15 hover:border-accent/50 transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-mono">+91 8056028354</span>
                </a>
              </Magnet>

              <Magnet strength={0.2}>
                <a
                  href="https://linkedin.com/in/s-jananii-724468289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-2xl bg-background/20 border border-border/15 hover:border-accent/50 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-mono">LinkedIn</span>
                </a>
              </Magnet>

              <Magnet strength={0.2}>
                <span className="flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-2xl bg-background/20 border border-border/15">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-sm font-mono">Chennai, Tamil Nadu</span>
                </span>
              </Magnet>
            </div>
          </FadeIn>

          {/* CTA Button */}
          <FadeIn delay={0.8}>
            <Magnet strength={0.15}>
              <motion.a
                href="#experience"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-accent rounded-full font-semibold text-primary-foreground shadow-glow hover:shadow-elevated transition-all duration-300 font-mono"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-primary-foreground/60">$</span> explore --work
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </motion.a>
            </Magnet>
          </FadeIn>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-accent rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
