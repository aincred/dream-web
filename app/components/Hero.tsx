"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NetworkAnimation } from "./NetworkAnimation";

// Pre-define animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay }
  })
}

const scrollIndicatorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
}

export function Hero() {
  return (
    <div 
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-bg-zinc-950"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
    >
      {/* Network Animation Background */}
      <div className="absolute inset-0">
        <NetworkAnimation />
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="text-red-600 dark:text-red-400 font-semibold text-lg">
              Welcome to Dreamworks Infotech
            </span>
          </motion.div>
          
          <motion.h1 
            className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            <span className="block text-black dark:text-white font-extrabold">
              {/* Secure your digital */}
              Yes! Dare to Dream, 
            </span>
            <span className="block text-gradient">We’ll Make It Work.</span>
          </motion.h1>
          
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3l mx-auto"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            An ISO 27001:2022 and ISO 9001:2015 Certified Company
            <br />
            Since 2009, We Have Been the Trusted Force Behind Innovative Cybersecurity and IT Solutions, Driving Digital Success for Businesses.
            <br />
            This Organization Is Empanelled By <span className="text-red-600 dark:text-red-400" >CERT-In</span> for Providing Information Security Auditing Service
          </motion.p>
          
          <motion.div 
            className="mt-10 flex justify-center gap-6"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/services">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial="hidden"
        animate="visible"
      >
        <div className="w-6 h-10 border-2 border-red-600 dark:border-red-400 rounded-full p-1">
          <div className="w-1 h-2 bg-red-600 dark:bg-red-400 rounded-full mx-auto animate-bounce" />
        </div>
      </motion.div>
    </div>
  )
}


// 'use client'

// import { motion } from 'framer-motion'
// import { Button } from "@/components/ui/button"
// import Link from 'next/link'
// import { NetworkAnimation } from './NetworkAnimation'

// export function Hero() {
//   return (
//     <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-bg-zinc-950">
//       {/* Network Animation Background */}
//       <div className="absolute inset-0">
//         <NetworkAnimation />
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <span className="text-red-600 dark:text-red-400 font-semibold text-lg">
//               Welcome to Dreamworks Infotech
//             </span>
//           </motion.div>
          
//           <motion.h1 
//             className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <span className="block text-black dark:text-white">Secure your digital</span>
//             <span className="block text-gradient">future with us</span>
//           </motion.h1>
          
//           <motion.p 
//             className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             Your trusted partner in cybersecurity and IT solutions since 2009. 
//             We leverage cutting-edge technology to protect and empower your business 
//             in the digital age.
//           </motion.p>
          
//           <motion.div 
//             className="mt-10 flex justify-center gap-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <Button 
//               asChild 
//               size="lg" 
//               className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <Link href="/contact">Get Started</Link>
//             </Button>
//             <Button 
//               asChild 
//               variant="outline" 
//               size="lg" 
//               className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <Link href="/services">Learn More</Link>
//             </Button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ 
//           duration: 0.5, 
//           delay: 1,
//           repeat: Infinity,
//           repeatType: "reverse"
//         }}
//       >
//         <div className="w-6 h-10 border-2 border-red-600 dark:border-red-400 rounded-full p-1">
//           <div className="w-1 h-2 bg-red-600 dark:bg-red-400 rounded-full mx-auto animate-bounce" />
//         </div>
//       </motion.div>
//     </div>
//   )
// }

