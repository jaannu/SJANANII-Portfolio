import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, MapPin, Send, Heart } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import BlurText from "@/components/animations/BlurText";
import Magnet from "@/components/animations/Magnet";
import GradientText from "@/components/animations/GradientText";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-crimson-bright/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-wider uppercase text-sm">Get In Touch</span>
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
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              <Magnet strength={0.1}>
                <motion.a
                  href="mailto:j.a.n27suresh@gmail.com"
                  className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover:border-accent/50 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-4 rounded-xl bg-gradient-accent group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">j.a.n27suresh@gmail.com</p>
                  </div>
                </motion.a>
              </Magnet>

              <Magnet strength={0.1}>
                <motion.a
                  href="tel:+918056028354"
                  className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover:border-accent/50 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-4 rounded-xl bg-gradient-accent group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">+91 8056028354</p>
                  </div>
                </motion.a>
              </Magnet>

              <Magnet strength={0.1}>
                <motion.a
                  href="https://linkedin.com/in/s-jananii-724468289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover:border-accent/50 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-4 rounded-xl bg-gradient-accent group-hover:scale-110 transition-transform">
                    <Linkedin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">LinkedIn</p>
                    <p className="font-medium">s-jananii-724468289</p>
                  </div>
                </motion.a>
              </Magnet>

              <Magnet strength={0.1}>
                <motion.div
                  className="glass-card rounded-2xl p-6 flex items-center gap-4"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-4 rounded-xl bg-gradient-accent">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="font-medium">Chennai, Tamil Nadu, India</p>
                  </div>
                </motion.div>
              </Magnet>
            </div>

            {/* CTA */}
            <FadeIn delay={0.4}>
              <div className="text-center">
                <Magnet strength={0.15}>
                  <motion.a
                    href="mailto:j.a.n27suresh@gmail.com?subject=Let's Connect!"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-accent rounded-full font-semibold text-primary-foreground shadow-glow hover:shadow-elevated transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    Send Me a Message
                  </motion.a>
                </Magnet>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </div>

      {/* Footer */}
      <FadeIn delay={0.6}>
        <footer className="mt-24 pt-8 border-t border-border/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
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
