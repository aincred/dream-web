import { Metadata } from 'next'
import ServiceTemplate from "@/app/components/ServiceTemplate"

export const metadata: Metadata = {
  title: 'Configuration & Hardening Reviews | DreamWorks Infotech',
  description: 'Ensure your systems are configured securely and hardened against potential threats.',
  openGraph: {
    title: 'Configuration & Hardening Reviews | DreamWorks Infotech',
    description: 'Ensure your systems are configured securely and hardened against potential threats.',
    type: 'website',
    url: 'https://dwinfotech.in/services/other-services/configuration-hardening-reviews',
    siteName: 'DreamWorks Infotech',
  }
}

export default function ConfigurationHardeningReviews() {
  return (
    <ServiceTemplate
      title="Configuration Hardening Reviews"
      description="Assess and enhance the security of your system configurations to protect against vulnerabilities."
      meaning="Configuration Hardening Reviews involve evaluating system configurations to ensure they are secure and comply with industry best practices."
      servicesImage={{
        url: "/assets/services/hardening.webp",
        description: "Configuration Hardening Reviews"
      }}
      importance={[
        "Operating system hardening assessment",
        "Application configuration review",
        "Network device configuration review",
        "Database configuration hardening",
        "Cloud service configuration assessment",
        "Compliance with security benchmarks (CIS, NIST, etc.)",
      ]}
      benefits={[
        "Reduced attack surface by eliminating unnecessary services",
        "Improved compliance with security standards",
        "Enhanced overall system security posture",
        "Identification of misconfigurations and vulnerabilities",
        "Increased resilience against cyber threats",
        "Better resource allocation for security investments",
      ]}
      toolsAndTechnologies={[
        { name: "CIS-CAT", image: "/tools/cis-cat.png" },
        { name: "Nessus", image: "/tools/nessus.png" },
        { name: "OpenVAS", image: "/tools/openvas.png" },
      ]} sampleReports={[]}  
      certifications={[
        { name: "CISA", imageUrl: "/certifications/cisa.png" },
        { name: "CEH", imageUrl: "/certifications/ceh.png" },
        { name: "ISO/IEC 27001 ASSOCIATE", imageUrl: "/certifications/iso-27001.png" },
      ]}
       testimonials={[]} caseStudies={[]} faq={[]} serviceTimeline={[]}    />
  )
}

