"use client"

import { Hero } from "./components/Hero"
import { Features } from "./components/Features"
import { ClientLogos } from "./components/ClientLogos"
import { StatisticsSection } from "./components/StatisticsSection"
import { FeaturedService } from "./components/FeaturedService"
import { CallToAction } from "./components/CallToAction"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import WhatsAppButton from "./components/WhatsAppButton"

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="bg-white dark:bg-zinc-950">
      <Hero />
      <AnimatedSection>
        <Features />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <StatisticsSection />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <FeaturedService
          title="Advanced Cybersecurity Solutions"
          description="Protect your digital assets with our state-of-the-art security services. Our team of experts uses cutting-edge technology to safeguard your business from evolving cyber threats."
          imageUrl="/assets/about/about-image.webp"
          linkUrl="/services"
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <ClientLogos />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <CallToAction
          title="Ready to secure your digital future?"
          description="Get in touch with our experts today and discover how we can help protect and grow your business."
          buttonText="Contact Us"
          buttonLink="/contact"
        />
      </AnimatedSection>
      <WhatsAppButton />
    </div>
  )
}

