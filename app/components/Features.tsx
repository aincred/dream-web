'use client'

import { motion } from 'framer-motion'
import { Shield, Code, BarChart } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    name: 'Advanced Security',
    description: 'Our cutting-edge security solutions protect your digital assets from evolving threats.',
    icon: Shield,
  },
  {
    name: 'Custom Software',
    description: 'We develop tailored software solutions to meet your unique business needs.',
    icon: Code,
  },
  {
    name: 'IT Optimization',
    description: 'Enhance your IT infrastructure for improved performance and efficiency.',
    icon: BarChart,
  },
]

export function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="bg-white dark:bg-zinc-950 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#e53a20] dark:text-red-400">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need for a secure digital presence
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Dreamworks Infotech offers comprehensive IT solutions to protect, optimize, and grow your business.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <feature.icon className="h-5 w-5 flex-none text-[#e53a20] dark:text-red-400" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

