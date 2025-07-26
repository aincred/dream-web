"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ServiceCategory } from "../components/ServiceCategory"
import { 
  Shield, 
  Search, 
  Cloud, 
  Settings,
  FileCode2,
  Target,
  Database,
  Fingerprint,
  Server,
  Mail,
  UserCog,
  Shield as ShieldIcon,
  Workflow,
  Network,
  FileSearch,
  Lock,
  Key,
  Container,
  Cloud as CloudIcon,
  ShieldCheck,
  Code,
  Crosshair,
  HardDrive,
  Cog,
  PhoneCall,
  Users,
  Settings2,
  Router,
  FileWarning
} from "lucide-react"

const serviceCategories = [
  {
    title: "Governance, Risk & Compliance",
    icon: Shield,
    services: [
      {
        title: "ISO 27001 Compliance - Audit and Implementation",
        icon: ShieldCheck,
        link: "/services/governance-risk-compliance/iso-27001-compliance",
      },
      {
        title: "Compliance with Standards, Laws, and Regulations",
        icon: FileCode2,
        link: "/services/governance-risk-compliance/standards-laws-regulations",
      },
      {
        title: "RBI Compliance Audit - Information Systems (IS) Audits",
        icon: Search,
        link: "/services/governance-risk-compliance/rbi-is-audits",
      },
      {
        title: "RBI Compliance Audit - Electronic Data Processing (EDP)",
        icon: HardDrive,
        link: "/services/governance-risk-compliance/rbi-edp-audits",
      },
      {
        title: "RBI Compliance Audit - SAR for Data Localization Audit",
        icon: Database,
        link: "/services/governance-risk-compliance/rbi-sar-data-localization",
      },
      {
        title: "UIDAI Compliance - AUA / KUA Audit",
        icon: Key,
        link: "/services/governance-risk-compliance/uidai-aua-kua-audit"
      },
      {
        title: "UIDAI Compliance - Sub-AUA / Sub-KUA Audit",
        icon: Lock,
        link: "/services/governance-risk-compliance/uidai-sub-aua-sub-kua-audit",
      },
      {
        title: "UIDAI Compliance - ASA Audit",
        icon: Fingerprint,
        link: "/services/governance-risk-compliance/uidai-asa-audit"
      },
      {
        title: "Third Party Risk Management (TPRM)",
        icon: Users,
        link: "/services/governance-risk-compliance/third-party-risk-management",
      },
      {
        title: "PCI Compliance",
        icon: Shield,
        link: "/services/governance-risk-compliance/pci-compliance"
      },
    ],
  },
  {
    title: "Vulnerability Assessment & Penetration Testing",
    icon: Search,
    services: [
      {
        title: "Web Application",
        icon: Code,
        link: "/services/vulnerability-assessment-penetration-testing/web-application"
      },
      {
        title: "Mobile Application",
        icon: PhoneCall,
        link: "/services/vulnerability-assessment-penetration-testing/mobile-application",
      },
      {
        title: "Network & Wireless",
        icon: Network,
        link: "/services/vulnerability-assessment-penetration-testing/network-wireless"
      },
      {
        title: "API and Web Services",
        icon: Workflow,
        link: "/services/vulnerability-assessment-penetration-testing/api-web-services",
      },
      {
        title: "Internet of Things (IoT) Penetration Testing",
        icon: Settings,
        link: "/services/vulnerability-assessment-penetration-testing/iot-penetration-testing",
      },
      {
        title: "ICS/SCADA Security Assessment",
        icon: Server,
        link: "/services/vulnerability-assessment-penetration-testing/ics-scada-security-assessment",
      },
    ],
  },
  {
    title: "Cloud Security Assessments",
    icon: Cloud,
    services: [
      {
        title: "Cloud Security Assessment",
        icon: CloudIcon,
        link: "/services/cloud-security-assessments/cloud-security-assessment"
      },
      {
        title: "Identity & Access Management",
        icon: UserCog,
        link: "/services/cloud-security-assessments/identity-access-management",
      },
      {
        title: "Container Security Assessment",
        icon: Container,
        link: "/services/cloud-security-assessments/container-security-assessment",
      },
      {
        title: "Docker Security Assessment",
        icon: Container,
        link: "/services/cloud-security-assessments/docker-security-assessment"
      },
      {
        title: "Kubernetes Security Assessment",
        icon: Container,
        link: "/services/cloud-security-assessments/kubernetes-security-assessment",
      },
      {
        title: "Data & Information Protection",
        icon: Shield,
        link: "/services/cloud-security-assessments/data-information-protection",
      },
      {
        title: "DevSecOps",
        icon: Code,
        link: "/services/cloud-security-assessments/devsecops"
      },
    ],
  },
  {
    title: "Other Services",
    icon: Settings2,
    services: [
      {
        title: "Secure SDLC Review",
        icon: FileCode2,
        link: "/services/other-services/secure-sdlc-review"
      },
      {
        title: "Source Code Review",
        icon: Code,
        link: "/services/other-services/source-code-review"
      },
      {
        title: "Red Teaming",
        icon: Target,
        link: "/services/other-services/red-teaming"
      },
      {
        title: "Database Review",
        icon: Database,
        link: "/services/other-services/database-review"
      },
      {
        title: "IT Infrastructure Review",
        icon: Server,
        link: "/services/other-services/it-infrastructure-review"
      },
      {
        title: "Phishing Campaign",
        icon: Mail,
        link: "/services/other-services/phishing-campaign"
      },
      {
        title: "Virtual CISO",
        icon: UserCog,
        link: "/services/other-services/virtual-ciso"
      },
      {
        title: "Configuration / Hardening Reviews",
        icon: Settings,
        link: "/services/other-services/configuration-hardening-reviews"
      },
      {
        title: "Firewall Configuration Review",
        icon: Router,
        link: "/services/other-services/firewall-configuration-review"
      },
      {
        title: "Cyber Forensics Analysis",
        icon: FileWarning,
        link: "/services/other-services/cyber-forensics-analysis"
      },
    ],
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive range of cybersecurity and IT solutions designed to protect your digital assets
            and optimize your infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <ServiceCategory {...category} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

