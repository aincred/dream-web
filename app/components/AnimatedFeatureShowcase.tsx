'use client'

import { motion } from 'framer-motion'
import { Shield, Code, BarChart } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Protect your digital assets with our state-of-the-art security solutions.',
  },
  {
    icon: Code,
    title: 'Custom Software',
    description: 'Tailored software solutions to meet your unique business needs.',
  },
  {
    icon: BarChart,
    title: 'IT Optimization',
    description: 'Enhance your IT infrastructure for improved performance and efficiency.',
  },
]

export function AnimatedFeatureShowcase() {
  return (
    <div className="py-24 sm:py-32 bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#e53a20]">Our Expertise</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Cutting-edge solutions for your business
          </p>
        </div>
        <div className="mt-20 flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="w-full sm:w-64 bg-gray-700 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e53a20]">
                <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-7 text-white">{feature.title}</h3>
              <p className="mt-2 text-base leading-7 text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

