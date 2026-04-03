import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, Send } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import BlurText from "@/components/animations/BlurText";
import Magnet from "@/components/animations/Magnet";
import GradientText from "@/components/animations/GradientText";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="font-mono text-accent text-sm">
              <span className="text-muted-foreground">$</span> ping jananii
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
              <BlurText text="Let's Connect" className="justify-center" animateBy="words" delay={100} />
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-4">
              I'm always open to discussing new opportunities, innovative projects, or just having a chat about AI and technology.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-xl border border-border/20 overflow-hidden backdrop-blur-2xl bg-background/15 mb-12">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/30 border-b border-border/15">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-crimson-bright/80" />
                  <div className="w-3 h-3 rounded-full bg-crimson-medium/60" />
                  <div className="w-3 h-3 rounded-full bg-crimson-dark/60" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">contact-info.sh</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 p-4">
                <Magnet strength={0.1}>
                  <motion.a
                    href="mailto:j.a.n27suresh@gmail.com"
                    className="rounded-xl p-5 flex items-center gap-4 group hover:bg-secondary/20 transition-colors"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-4 rounded-xl bg-gradient-accent group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 font-mono">// email</p>
                      <p className="font-medium font-mono text-sm">j.a.n27suresh@gmail.com</p>
                    </div>
                  </motion.a>
                </Magnet>

                <Magnet strength={0.1}>
                  <motion.a
                    href="tel:+918056028354"
                    className="rounded-xl p-5 flex items-center gap-4 group hover:bg-secondary/20 transition-colors"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-4 rounded-xl bg-gradient-accent group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 font-mono">// phone</p>
                      <p className="font-medium font-mono text-sm">+91 8056028354</p>
                    </div>
                  </motion.a>
                </Magnet>

                <Magnet strength={0.1}>
                  <motion.a
                    href="https://linkedin.com/in/s-jananii-724468289"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl p-5 flex items-center gap-4 group hover:bg-secondary/20 transition-colors"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-4 rounded-xl bg-gradient-accent group-hover:scale-110 transition-transform">
                      <Linkedin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 font-mono">// linkedin</p>
                      <p className="font-medium font-mono text-sm">s-jananii-724468289</p>
                    </div>
                  </motion.a>
                </Magnet>

                <Magnet strength={0.1}>
                  <motion.div
                    className="rounded-xl p-5 flex items-center gap-4"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-4 rounded-xl bg-gradient-accent">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 font-mono">// location</p>
                      <p className="font-medium font-mono text-sm">Chennai, Tamil Nadu</p>
                    </div>
                  </motion.div>
                </Magnet>
              </div>
            </div>

            <FadeIn delay={0.4}>
              <div className="text-center">
                <Magnet strength={0.15}>
                  <motion.a
                    href="mailto:j.a.n27suresh@gmail.com?subject=Let's Connect!"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-accent rounded-full font-semibold text-primary-foreground shadow-glow hover:shadow-elevated transition-all duration-300 font-mono"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    $ send --message
                  </motion.a>
                </Magnet>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.6}>
        <footer className="mt-24 pt-8 border-t border-border/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground font-mono">
                © 2025 S Jananii. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
