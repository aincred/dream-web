"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function CompanyPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* Header Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Hello! We are Dreamworks!
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              A company turning ideas into beautiful things.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
            {/* Who Are We Section */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeIn}
              className="lg:sticky lg:top-24"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Who Are We?
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                  We are an Information Technology consulting company based in Ranchi with powerful and robust digital solutions that satisfy the needs of today and unlock the opportunities of tomorrow.
                </p>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12">
                  Since 2009, we are working for strengthening IT in Government departments and companies. Our broad services are:
                </p>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div 
                    className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Information Security</h3>
                  </motion.div>
                  <motion.div 
                    className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Software Development</h3>
                  </motion.div>
                  <motion.div 
                    className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">IT Consulting</h3>
                  </motion.div>
                  <motion.div 
                    className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Research & Training</h3>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Globe Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center h-full"
            >
              <div className="relative w-full aspect-square max-w-2xl">
                <Image
                  src="https://www.dwinfotech.in/assets/public/img/illustrations/globe.webp"
                  alt="Global Technology Network"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Vision & Mission Section */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-4xl mx-auto bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-8 md:p-12 mb-24"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Vision & Mission
            </h2>

            <div className="mb-12 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Dreamwork's Vision
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                To be an information technology Service Provider that would help bring the relevance of information technology and its application to all sphere of life's with highest levels of integrity, professionalism & technological capabilities. All the same, what area of business, social, private or public venture our clients and prospect be there.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Mission
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Describes the desired future position of the Dreamworks Infotech Pvt. Ltd.
              </p>
              <ul className="list-disc pl-6 space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <li>Strengthen the security posture in the public and private sectors.</li>
                <li>Having excellent command over technology and a zest to continuously upgrade.</li>
                <li>Drive positive change for all our stakeholders' employees, clients, partners and society.</li>
                <li>Investment in researches aiming to develop innovative security technologies and solutions.</li>
              </ul>
            </div>
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center mb-24"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Explore our comprehensive range of services and discover why clients from across the globe have placed their unwavering trust in us.
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href="/contact"
                className="inline-block bg-red-600 text-white px-10 py-4 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
