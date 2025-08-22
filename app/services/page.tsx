"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  Shield, Search, Cloud, Settings, FileCode2, Target, Database, Fingerprint,
  Server, Mail, UserCog, Workflow, Network, Lock, Key, Container, ShieldCheck,
  Code, HardDrive, PhoneCall, Users, Settings2, Router, FileWarning
} from "lucide-react"

// Your updated services data
const serviceCategories = [
  {
    title: "Governance, Risk & Compliance",
    icon: Shield,
    color: "from-indigo-500 to-purple-500",
    services: [
      { title: "ISO 27001 Compliance - Audit and Implementation", icon: ShieldCheck, link: "/services/governance-risk-compliance/iso-27001-compliance" },
      { title: "Compliance with Standards, Laws, and Regulations", icon: FileCode2, link: "/services/governance-risk-compliance/standards-laws-regulations" },
      { title: "RBI Compliance Audit - Information Systems (IS) Audits", icon: Search, link: "/services/governance-risk-compliance/rbi-is-audits" },
      { title: "RBI Compliance Audit - Electronic Data Processing (EDP)", icon: HardDrive, link: "/services/governance-risk-compliance/rbi-edp-audits" },
      { title: "RBI Compliance Audit - SAR for Data Localization Audit", icon: Database, link: "/services/governance-risk-compliance/rbi-sar-data-localization" },
      { title: "UIDAI Compliance - AUA / KUA Audit", icon: Key, link: "/services/governance-risk-compliance/uidai-aua-kua-audit" },
      { title: "UIDAI Compliance - Sub-AUA / Sub-KUA Audit", icon: Lock, link: "/services/governance-risk-compliance/uidai-sub-aua-sub-kua-audit" },
      { title: "UIDAI Compliance - ASA Audit", icon: Fingerprint, link: "/services/governance-risk-compliance/uidai-asa-audit" },
      { title: "Third Party Risk Management (TPRM)", icon: Users, link: "/services/governance-risk-compliance/third-party-risk-management" },
      { title: "PCI Compliance", icon: Shield, link: "/services/governance-risk-compliance/pci-compliance" },
    ],
  },
  {
    title: "Vulnerability Assessment & Penetration Testing",
    icon: Search,
    color: "from-pink-500 to-rose-500",
    services: [
      { title: "Web Application", icon: Code, link: "/services/vulnerability-assessment-penetration-testing/web-application" },
      { title: "Mobile Application", icon: PhoneCall, link: "/services/vulnerability-assessment-penetration-testing/mobile-application" },
      { title: "Network & Wireless", icon: Network, link: "/services/vulnerability-assessment-penetration-testing/network-wireless" },
      { title: "API and Web Services", icon: Workflow, link: "/services/vulnerability-assessment-penetration-testing/api-web-services" },
      { title: "Internet of Things (IoT) Penetration Testing", icon: Settings, link: "/services/vulnerability-assessment-penetration-testing/iot-penetration-testing" },
      { title: "ICS/SCADA Security Assessment", icon: Server, link: "/services/vulnerability-assessment-penetration-testing/ics-scada-security-assessment" },
    ],
  },
  {
    title: "Cloud Security Assessments",
    icon: Cloud,
    color: "from-cyan-500 to-blue-500",
    services: [
      { title: "Cloud Security Assessment", icon: Cloud, link: "/services/cloud-security-assessments/cloud-security-assessment" },
      { title: "Identity & Access Management", icon: UserCog, link: "/services/cloud-security-assessments/identity-access-management" },
      { title: "Container Security Assessment", icon: Container, link: "/services/cloud-security-assessments/container-security-assessment" },
      { title: "Docker Security Assessment", icon: Container, link: "/services/cloud-security-assessments/docker-security-assessment" },
      { title: "Kubernetes Security Assessment", icon: Container, link: "/services/cloud-security-assessments/kubernetes-security-assessment" },
      { title: "Data & Information Protection", icon: Shield, link: "/services/cloud-security-assessments/data-information-protection" },
      { title: "DevSecOps", icon: Code, link: "/services/cloud-security-assessments/devsecops" },
    ],
  },
  {
    title: "Other Services",
    icon: Settings2,
    color: "from-emerald-500 to-teal-500",
    services: [
      { title: "Secure SDLC Review", icon: FileCode2, link: "/services/other-services/secure-sdlc-review" },
      { title: "Source Code Review", icon: Code, link: "/services/other-services/source-code-review" },
      { title: "Red Teaming", icon: Target, link: "/services/other-services/red-teaming" },
      { title: "Database Review", icon: Database, link: "/services/other-services/database-review" },
      { title: "IT Infrastructure Review", icon: Server, link: "/services/other-services/it-infrastructure-review" },
      { title: "Phishing Campaign", icon: Mail, link: "/services/other-services/phishing-campaign" },
      { title: "Virtual CISO", icon: UserCog, link: "/services/other-services/virtual-ciso" },
      { title: "Configuration / Hardening Reviews", icon: Settings, link: "/services/other-services/configuration-hardening-reviews" },
      { title: "Firewall Configuration Review", icon: Router, link: "/services/other-services/firewall-configuration-review" },
      { title: "Cyber Forensics Analysis", icon: FileWarning, link: "/services/other-services/cyber-forensics-analysis" },
    ],
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function Services() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div className="relative min-h-screen py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.2),transparent_40%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.15),transparent_40%)]" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Protect your digital ecosystem with our cutting-edge security and compliance solutions.
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="space-y-16">
          {serviceCategories.map((category, index) => {
            const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
            const Icon = category.icon

            return (
              <motion.div
                key={index}
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeInUp}
                className="relative rounded-3xl p-8 border border-gray-200 dark:border-gray-800 
                           bg-white/70 dark:bg-zinc-900/70 shadow-lg backdrop-blur-lg"
              >
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${category.color} text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {category.title}
                  </h2>
                </div>

                {/* Services Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service, i) => {
                    const ServiceIcon = service.icon
                    return (
                      <motion.a
                        key={i}
                        href={service.link}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.03 }}
                        className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 
                                   bg-white/60 dark:bg-zinc-800/60 shadow-sm hover:shadow-xl cursor-pointer 
                                   transition-all duration-300 group"
                      >
                        <ServiceIcon className="w-5 h-5 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-red-500 dark:group-hover:text-red-400">
                          {service.title}
                        </span>
                      </motion.a>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}














// "use client"

// import { motion } from "framer-motion"
// import { useInView } from "react-intersection-observer"
// import { ServiceCategory } from "../components/ServiceCategory"
// import {
//   Shield,
//   Search,
//   Cloud,
//   Settings,
//   FileCode2,
//   Target,
//   Database,
//   Fingerprint,
//   Server,
//   Mail,
//   UserCog,
//   Workflow,
//   Network,
//   Lock,
//   Key,
//   Container,
//   ShieldCheck,
//   Code,
//   HardDrive,
//   PhoneCall,
//   Users,
//   Settings2,
//   Router,
//   FileWarning,
// } from "lucide-react"

// const serviceCategories = [
//   {
//     title: "Governance, Risk & Compliance",
//     icon: Shield,
//     services: [
//       { title: "ISO 27001 Compliance - Audit and Implementation", icon: ShieldCheck, link: "/services/governance-risk-compliance/iso-27001-compliance" },
//       { title: "Compliance with Standards, Laws, and Regulations", icon: FileCode2, link: "/services/governance-risk-compliance/standards-laws-regulations" },
//       { title: "RBI Compliance Audit - Information Systems (IS) Audits", icon: Search, link: "/services/governance-risk-compliance/rbi-is-audits" },
//       { title: "RBI Compliance Audit - Electronic Data Processing (EDP)", icon: HardDrive, link: "/services/governance-risk-compliance/rbi-edp-audits" },
//       { title: "RBI Compliance Audit - SAR for Data Localization Audit", icon: Database, link: "/services/governance-risk-compliance/rbi-sar-data-localization" },
//       { title: "UIDAI Compliance - AUA / KUA Audit", icon: Key, link: "/services/governance-risk-compliance/uidai-aua-kua-audit" },
//       { title: "UIDAI Compliance - Sub-AUA / Sub-KUA Audit", icon: Lock, link: "/services/governance-risk-compliance/uidai-sub-aua-sub-kua-audit" },
//       { title: "UIDAI Compliance - ASA Audit", icon: Fingerprint, link: "/services/governance-risk-compliance/uidai-asa-audit" },
//       { title: "Third Party Risk Management (TPRM)", icon: Users, link: "/services/governance-risk-compliance/third-party-risk-management" },
//       { title: "PCI Compliance", icon: Shield, link: "/services/governance-risk-compliance/pci-compliance" },
//     ],
//   },
//   {
//     title: "Vulnerability Assessment & Penetration Testing",
//     icon: Search,
//     services: [
//       { title: "Web Application", icon: Code, link: "/services/vulnerability-assessment-penetration-testing/web-application" },
//       { title: "Mobile Application", icon: PhoneCall, link: "/services/vulnerability-assessment-penetration-testing/mobile-application" },
//       { title: "Network & Wireless", icon: Network, link: "/services/vulnerability-assessment-penetration-testing/network-wireless" },
//       { title: "API and Web Services", icon: Workflow, link: "/services/vulnerability-assessment-penetration-testing/api-web-services" },
//       { title: "Internet of Things (IoT) Penetration Testing", icon: Settings, link: "/services/vulnerability-assessment-penetration-testing/iot-penetration-testing" },
//       { title: "ICS/SCADA Security Assessment", icon: Server, link: "/services/vulnerability-assessment-penetration-testing/ics-scada-security-assessment" },
//     ],
//   },
//   {
//     title: "Cloud Security Assessments",
//     icon: Cloud,
//     services: [
//       { title: "Cloud Security Assessment", icon: Cloud, link: "/services/cloud-security-assessments/cloud-security-assessment" },
//       { title: "Identity & Access Management", icon: UserCog, link: "/services/cloud-security-assessments/identity-access-management" },
//       { title: "Container Security Assessment", icon: Container, link: "/services/cloud-security-assessments/container-security-assessment" },
//       { title: "Docker Security Assessment", icon: Container, link: "/services/cloud-security-assessments/docker-security-assessment" },
//       { title: "Kubernetes Security Assessment", icon: Container, link: "/services/cloud-security-assessments/kubernetes-security-assessment" },
//       { title: "Data & Information Protection", icon: Shield, link: "/services/cloud-security-assessments/data-information-protection" },
//       { title: "DevSecOps", icon: Code, link: "/services/cloud-security-assessments/devsecops" },
//     ],
//   },
//   {
//     title: "Other Services",
//     icon: Settings2,
//     services: [
//       { title: "Secure SDLC Review", icon: FileCode2, link: "/services/other-services/secure-sdlc-review" },
//       { title: "Source Code Review", icon: Code, link: "/services/other-services/source-code-review" },
//       { title: "Red Teaming", icon: Target, link: "/services/other-services/red-teaming" },
//       { title: "Database Review", icon: Database, link: "/services/other-services/database-review" },
//       { title: "IT Infrastructure Review", icon: Server, link: "/services/other-services/it-infrastructure-review" },
//       { title: "Phishing Campaign", icon: Mail, link: "/services/other-services/phishing-campaign" },
//       { title: "Virtual CISO", icon: UserCog, link: "/services/other-services/virtual-ciso" },
//       { title: "Configuration / Hardening Reviews", icon: Settings, link: "/services/other-services/configuration-hardening-reviews" },
//       { title: "Firewall Configuration Review", icon: Router, link: "/services/other-services/firewall-configuration-review" },
//       { title: "Cyber Forensics Analysis", icon: FileWarning, link: "/services/other-services/cyber-forensics-analysis" },
//     ],
//   },
// ]

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// }

// export default function Services() {
//   const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

//   return (
//     <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black">
//       {/* Background decoration */}
//       <div className="absolute inset-0 -z-10 bg-grid-slate-200/20 dark:bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           ref={headerRef}
//           initial="hidden"
//           animate={headerInView ? "visible" : "hidden"}
//           variants={fadeInUp}
//           className="text-center mb-16"
//         >
//           <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
//             Our <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Services</span>
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Explore our comprehensive range of cybersecurity and IT solutions designed to protect your digital assets
//             and optimize your infrastructure.
//           </p>
//         </motion.div>

//         {/* Service Categories */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {serviceCategories.map((category, index) => {
//             const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

//             return (
//               <motion.div
//                 key={index}
//                 ref={ref}
//                 initial="hidden"
//                 animate={inView ? "visible" : "hidden"}
//                 variants={fadeInUp}
//                 whileHover={{ scale: 1.02 }}
//                 className="rounded-2xl p-6 shadow-lg backdrop-blur-md border border-gray-200 dark:border-gray-800 
//                            bg-white/70 dark:bg-zinc-900/70 transition-all duration-300 hover:shadow-2xl"
//               >
//                 <ServiceCategory {...category} />
//               </motion.div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }
