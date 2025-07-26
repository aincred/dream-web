'use client'

import { motion } from 'framer-motion'
import { Users, ShieldCheck, Code, Award } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const stats = [
  { name: 'Clients Served', value: 500, icon: Users },
  { name: 'Security Audits', value: 1000, icon: ShieldCheck },
  { name: 'Projects Completed', value: 750, icon: Code },
  { name: 'Industry Awards', value: 25, icon: Award },
]

export function StatisticsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="bg-white dark:bg-zinc-950 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Trusted by businesses worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our track record speaks for itself
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                className="flex flex-col bg-gray-50 dark:bg-zinc-900 p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <div className="flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-[#e53a20] dark:text-red-400 mr-2" />
                    <CountUp end={stat.value} duration={2.5} separator="," />
                    {stat.name !== 'Industry Awards' && '+'}
                  </div>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

