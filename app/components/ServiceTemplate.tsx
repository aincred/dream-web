"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Check } from "lucide-react"
import Marquee from "react-fast-marquee"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"


interface ServiceTemplateProps {
  title: string
  description: string
  meaning: string
  importance: string[]
  trackRecord?: {
    number: number
    description: string
  }
  servicesImage?: {
    url: string,
    description: string
  }
  benefits: string[]
  toolsAndTechnologies: { name: string; image: string }[]
  sampleReports: string[]
  certifications: {
    name: string
    imageUrl: string
  }[]
  assessmentMethods?: {
    onsite?: string
    offsite?: string
  }
  testimonials: {
    name: string
    company: string
    quote: string
  }[]
  caseStudies: {
    title: string
    description: string
    link: string
  }[]
  faq: {
    question: string
    answer: string
  }[]
  serviceTimeline: {
    step: number
    title: string
    description: string
  }[]
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1} },
}

const slideIn = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
}

export default function ServiceTemplate({
  title,
  description,
  meaning,
  importance = [],
  trackRecord,
  servicesImage,
  benefits = [],
  toolsAndTechnologies = [],
  sampleReports = [],
  certifications = [],
  assessmentMethods = { onsite: "", offsite: "" },
  testimonials = [],
  caseStudies = [],
  faq = [],
  serviceTimeline = [],
}: ServiceTemplateProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px"
  })

  const timelineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const TimelineSection = () => {
    const [timelineRef, timelineInView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: "50px"
    })
    useEffect(() => {
      if (timelineInView) {
        controls.start("visible")
      }
    }, [timelineInView, controls])

    return (
      <motion.section
        ref={timelineRef}
        initial="hidden"
        animate={timelineInView ? "visible" : "hidden"}
        variants={stagger}
        className="mb-16"
      >
        <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Service Process
        </motion.h2>

        <VerticalTimeline>
          {serviceTimeline.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element"
              contentStyle={{
                background: 'rgb(var(--card-background))',
                color: 'var(--text-color)',
                boxShadow: '0 3px 0 var(--border-color)',
              }}
              contentArrowStyle={{ borderRight: '7px solid var(--border-color)' }}
              iconStyle={{
                background: 'rgb(33, 150, 243)',
                color: '#fff',
              }}
              icon={<div className="flex items-center justify-center h-full text-white">{item.step}</div>}
            >
              <h3 className="vertical-timeline-element-title font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </motion.section>
    )
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <motion.header
          initial="visible"
          animate="visible"
          variants={fadeIn}
          className="bg-cover bg-center py-32 relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h1 variants={slideIn} className="text-5xl font-extrabold text-white mb-4 text-center">
              {title}
            </motion.h1>
            <motion.p variants={slideIn} className="text-xl text-gray-200 max-w-3xl mx-auto text-center">
              {description}
            </motion.p>
          </div>
        </motion.header>

        <main className="container mx-auto px-4 py-16 space-y-24">
          {/* Meaning Section */}
          <motion.section
            initial="visible"
            animate="visible"
            variants={stagger}
            className="flex flex-wrap items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <motion.div variants={slideIn} className="w-full md:w-1/2 p-12">
              <motion.h2 variants={fadeIn} className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                What is {title}?
              </motion.h2>
              <motion.p variants={fadeIn} className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {meaning}
              </motion.p>
            </motion.div>
            <motion.div variants={fadeIn} className="w-full md:w-1/2">
              {/* <Image
                src="/assets/services/compliance.webp"
                alt="Illustration representing meaning"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              /> */}
              <Image
                src={servicesImage?.url || ''}
                alt={servicesImage?.description || "Illustration representing meaning"}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.section>

          {/* Importance Section */}
          <motion.section
            initial="visible"
            animate="visible"
            variants={stagger}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-12"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-8 text-center">
              Why It Is Important
            </motion.h2>
            {importance && importance.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {importance.map((point, index) => (
                  <motion.div key={index} variants={fadeInUp} className="flex items-start space-x-4">
                    <Check className="flex-shrink-0 w-6 h-6 text-green-400" />
                    <p className="text-lg">{point}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Track Record */}
          {trackRecord && trackRecord.number > 0 && (
            <motion.section
              initial="visible"
              animate="visible"
              variants={stagger}
              className="text-center"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Our Track Record
              </motion.h2>
              <motion.div
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow-lg inline-block"
              >
                <motion.p
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-4"
                >
                  {trackRecord.number}+
                </motion.p>
                <p className="text-xl text-gray-700 dark:text-gray-300">{trackRecord.description}</p>
              </motion.div>
            </motion.section>
          )}

          {/* Tools & Technologies */}
          <motion.section
            initial="visible"
            animate="visible"
            variants={stagger}
            className="py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Tools & Technologies We Use
            </motion.h2>
            {toolsAndTechnologies && toolsAndTechnologies.length > 0 && (
              <Marquee gradient={false} speed={50}>
                {toolsAndTechnologies.map((tool, index) => (
                  <div key={index} className="mx-10">
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{tool.name}</h3>
                  </div>
                ))}
              </Marquee>
            )}
          </motion.section>

          {/* Sample Reports */}
          {sampleReports && sampleReports.length > 0 && (
          <motion.section
            initial="visible"
            animate="visible"
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Sample Reports & Deliverables
            </motion.h2>
            
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleReports.map((report, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{report}</h3>
                    {/* <p className="text-gray-700 dark:text-gray-300">
                      Comprehensive insights and actionable recommendations to enhance your security posture.
                    </p> */}
                  </motion.div>
                ))}
              </div>
            
          </motion.section>)}

          {/* Certifications */}
          <motion.section
            initial="visible"
            animate="visible"
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Our Certifications
            </motion.h2>
            {certifications && certifications.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-8">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-[200px] h-[240px] flex flex-col items-center justify-center"
                  >
                    <div className="relative w-[120px] h-[120px] mb-4">
                      <Image
                        src={cert.imageUrl || "/placeholder.svg"}
                        alt={cert.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-center text-gray-700 dark:text-gray-300 text-sm">{cert.name}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Assessment Methods */}
          {(assessmentMethods?.onsite || assessmentMethods?.offsite) && (
            <motion.section
              initial="visible"
              animate="visible"
              variants={stagger}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-12"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
              >
                Assessment Methods
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8">
                {assessmentMethods?.onsite && (
                  <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Onsite</h3>
                    <p className="text-gray-700 dark:text-gray-300">{assessmentMethods.onsite}</p>
                  </motion.div>
                )}
                {assessmentMethods?.offsite && (
                  <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Offsite</h3>
                    <p className="text-gray-700 dark:text-gray-300">{assessmentMethods.offsite}</p>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}

          {/* Service Timeline */}
          {serviceTimeline && serviceTimeline.length > 0 && (<TimelineSection />)}

          {/* Client Testimonials */}
          <motion.section
            initial="visible"
            animate="visible"
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Client Testimonials
            </motion.h2>
            {testimonials && testimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <p className="italic text-gray-700 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
                    <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.company}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Frequently Asked Questions */}
          <motion.section
            initial="visible"
            animate="visible"
            variants={stagger}
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Frequently Asked Questions
            </motion.h2>
            {faq && faq.length > 0 && (
              <div className="space-y-6">
                {faq.map((item, index) => (
                  <motion.div key={index} variants={fadeIn}>
                    <AnimatePresence>
                      <motion.details
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md group"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                      >
                        <summary className="text-xl font-semibold cursor-pointer text-gray-900 dark:text-white group-open:mb-4">
                          {item.question}
                        </summary>
                        <motion.div
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-gray-700 dark:text-gray-300 mt-2">{item.answer}</p>
                        </motion.div>
                      </motion.details>
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Call-to-Action */}
          <motion.div
            initial="visible"
            animate="visible"
            variants={fadeIn}
            className="text-center bg-blue-600 dark:bg-blue-700 p-12 rounded-lg shadow-lg"
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-bold text-white mb-4">
              Ready to Secure Your Digital Assets?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-gray-200 mb-8">
              Let's discuss how we can help protect and grow your business.
            </motion.p>
            <motion.div variants={fadeIn}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/contact">Contact Us for {title}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </main>
      </div>
      
      <style jsx global>{`
        :root {
          --card-background: 255, 255, 255;
          --text-color: #333;
          --border-color: #e5e7eb;
        }

        .dark {
          --card-background: 17, 24, 39;
          --text-color: #fff;
          --border-color: #374151;
        }

        .vertical-timeline-element-content {
          box-shadow: 0 3px 0 var(--border-color) !important;
        }

        .vertical-timeline-element-icon {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-weight: bold !important;
          font-size: 1.2rem !important;
        }
      `}</style>
    </>
  )
}


