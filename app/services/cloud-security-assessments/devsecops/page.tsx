import ServiceTemplate from "@/app/components/ServiceTemplate"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DevSecOps | DreamWorks Infotech',
  description: 'Integrate security practices into your DevOps processes for enhanced application security.',
  openGraph: {
    title: 'DevSecOps | DreamWorks Infotech',
    description: 'Integrate security practices into your DevOps processes for enhanced application security.',
    type: 'website',
    url: 'https://dwinfotech.in/services/cloud-security-assessments/devsecops',
    siteName: 'DreamWorks Infotech',
  }
}
export default function DevSecOps() {
  return (
    <ServiceTemplate
      title="DevSecOps"
      description="Integrate security practices into your DevOps processes for enhanced application security."
      meaning="DevSecOps is an approach that integrates security practices within the DevOps process, ensuring that security is a shared responsibility throughout the entire IT lifecycle, from initial design through integration, testing, deployment, and software delivery."
      servicesImage={{
        url: "/assets/services/devsecops.webp",
        description: "DevSecOps"
      }}
      importance={[
        "DevSecOps strategy development and implementation",
        "Secure coding practices and training",
        "Automated security testing integration in CI/CD pipelines",
        "Infrastructure as Code (IaC) security assessment",
        "Container and microservices security",
        "Continuous security monitoring and feedback loops",
      ]}
      benefits={[
        "Improved security posture through early and continuous security integration",
        "Faster and more secure application delivery",
        "Reduced costs associated with fixing security issues late in development",
        "Enhanced collaboration between development, operations, and security teams",
        "Increased compliance with security standards throughout the SDLC",
        "Better visibility and control over security in fast-paced development environments",
      ]}
      toolsAndTechnologies={[
        { name: "SonarQube", image: "/tools/sonarqube.png" },
        { name: "Checkmarx", image: "/tools/checkmarx.png" },
        { name: "WhiteSource", image: "/tools/whitesource.png" },
      ]}
      sampleReports={[
        "DevSecOps Implementation Plan",
        "Security Code Review",
        "Automated Security Testing",
        "Compliance with Security Standards",
        "Security Monitoring and Feedback",
      ]}
      certifications={[
        { name: "CISA", imageUrl: "/certifications/cisa.png" },
        { name: "ISO 27001 LA", imageUrl: "/certifications/iso27001-la.jpeg" },
        { name: "ISO 27001 Implementer", imageUrl: "/certifications/iso27001-implementer.png" },
      ]}
      assessmentMethods={{
        onsite: "Onsite evaluation of cloud infrastructure with hands-on security assessment.",
        offsite: "Remote assessment leveraging secure access to cloud environments.",
      }}
      serviceTimeline={[
        { step: 1, title: "Kick-off Meeting", description: "Understand security requirements and scope of assessment." },
        { step: 2, title: "Questionnaire & Data Collection", description: "Gather information about cloud configurations and policies." },
        { step: 3, title: "First Audit Report", description: "Initial findings and security posture analysis." },
        { step: 4, title: "Confirmatory Audit", description: "Review remediation efforts and perform follow-up audits." },
        { step: 5, title: "Final Follow-up Clearance Report", description: "Verify closure of identified vulnerabilities." },
      ]}
      testimonials={[
        {
          name: "John Doe",
          company: "Tech Solutions",
          quote: "DreamWorks Infotech helped us integrate security practices into our DevOps process, resulting in a more secure and faster application delivery.",
        },
        {
          name: "Jane Smith",
          company: "Software Solutions",
          quote: "The DevSecOps services provided by DreamWorks Infotech have significantly improved our security posture and reduced the time to market for new applications.",
        },
        {
          name: "John Doe",
          company: "Tech Solutions",
          quote: "DreamWorks Infotech helped us integrate security practices into our DevOps process, resulting in a more secure and faster application delivery.",
        },
      ]}
      faq={[
        {
          question: "What is DevSecOps?",
          answer: "DevSecOps is an approach that integrates security practices within the DevOps process, ensuring that security is a shared responsibility throughout the entire IT lifecycle, from initial design through integration, testing, deployment, and software delivery.",
        },
        {
          question: "Why we need DevSecOps?",
          answer: "DevSecOps is a way to make sure that security is integrated into the DevOps process. It helps to make sure that security is a shared responsibility throughout the entire IT lifecycle, from initial design through integration, testing, deployment, and software delivery.",
        },
      ]} caseStudies={[]}    />
  )
}

