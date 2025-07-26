import { Metadata } from 'next'
import ServiceTemplate from "@/app/components/ServiceTemplate"

export const metadata: Metadata = {
  title: 'ISO 27001 Compliance - Audit and Implementation | DreamWorks Infotech',
  description: 'Ensure your organization meets the highest standards for information security management by achieving ISO 27001 certification.',
  openGraph: {
    title: 'ISO 27001 Compliance - Audit and Implementation | DreamWorks Infotech',
    description: 'Achieve ISO 27001 certification and enhance your information security management.',
    type: 'website',
    url: 'https://dwinfotech.in/services/governance-risk-compliance/iso-27001-compliance',
    siteName: 'DreamWorks Infotech',
  }
}

export default function ISO27001ComplianceAudit() {
  return (
    <ServiceTemplate
      title="ISO 27001 Compliance - Audit and Implementation"
      description="Ensure your organization meets the highest standards for information security management by achieving ISO 27001 certification."
      meaning="ISO 27001 is the international standard for Information Security Management Systems (ISMS), focusing on establishing, implementing, operating, monitoring, reviewing, maintaining, and improving information security in the context of the organization's overall business risks."
      importance={[
        "Provides a systematic approach to managing sensitive company information.",
        "Helps identify and address potential security risks.",
        "Enhances trust with clients and stakeholders by demonstrating commitment to information security.",
        "Improves compliance with legal, regulatory, and contractual requirements.",
        "Reduces the risk of data breaches, cyberattacks, and security incidents.",
        "Facilitates continual improvement of security practices through regular audits and reviews.",
      ]}
      trackRecord={{
        number: 150,
        description: "ISO 27001 audits conducted and certifications achieved",
      }}
      sampleReports={[
        "Introduction and Scope of Audit",
        "Methodology and Approach",
        "Information Security Management System (ISMS) Overview",
        "Risk Assessment and Treatment Plan",
        "Gap Analysis",
        "Compliance with ISO 27001 Controls",
        "Recommendations for Improvement",
        "Audit Findings",
        "Conclusion and Certification Status",
      ]}
      assessmentMethods={{
        onsite: "Our team performs an on-site audit of your information security management practices, systems, and infrastructure.",
        offsite: "We conduct remote assessments with secure access to your documentation and systems.",
      }}
      testimonials={[
        {
          name: "Security Manager",
          company: "FinSecure Inc.",
          quote: "The ISO 27001 audit helped us identify critical security gaps and provided a clear path to achieve certification, greatly improving our security posture.",
        },
        {
          name: "Compliance Officer",
          company: "TechSolutions Ltd.",
          quote: "Thanks to Dreamworks Infotech's guidance, we successfully achieved ISO 27001 certification and now have a robust framework for managing information security.",
        },
        {
          name: "CTO",
          company: "HealthNet Solutions",
          quote: "The audit provided valuable insights and actionable recommendations, leading to improved security practices across our organization.",
        },
      ]}
      caseStudies={[
        {
          title: "Healthcare Sector ISO 27001 Implementation",
          description: "Helped a healthcare provider achieve ISO 27001 certification, improving the protection of sensitive patient data and meeting HIPAA compliance.",
          link: "/case-studies/healthcare-iso27001",
        },
        {
          title: "Financial Services Firm Security Enhancement",
          description: "Assisted a financial services firm in becoming ISO 27001 compliant, reducing security risks and enhancing client trust.",
          link: "/case-studies/financial-iso27001",
        },
      ]}
      serviceTimeline={[
        {
          step: 1,
          title: "Initiation Mail",
          description: "Send an official initiation email to kickstart the audit process.",
        },
        {
          step: 2,
          title: "Evidence Collection",
          description: "Gather documentation and evidence to assess current information security practices.",
        },
        {
          step: 3,
          title: "Doubt Clearing Session",
          description: "Address any questions or concerns regarding the audit process and requirements.",
        },
        {
          step: 4,
          title: "Reporting",
          description: "Compile and present findings, including gaps, risks, and areas for improvement.",
        },
        {
          step: 5,
          title: "Final Level Clearance Report",
          description: "Provide a detailed report confirming the closure of all identified issues and achieving compliance.",
        },
        {
          step: 6,
          title: "Closure Meeting",
          description: "Discuss the audit results, next steps, and certification process.",
        },
      ]}
      faq={[
        {
          question: "How long does the ISO 27001 audit take?",
          answer: "The audit process typically takes 4-6 weeks, depending on the complexity of your organization's information security systems.",
        },
        {
          question: "What are the main benefits of achieving ISO 27001 certification?",
          answer: "ISO 27001 certification demonstrates your commitment to information security, reduces security risks, ensures compliance with legal and regulatory requirements, and builds trust with clients and stakeholders.",
        },
        {
          question: "Is ISO 27001 certification mandatory?",
          answer: "ISO 27001 certification is not legally required but is highly recommended for organizations that manage sensitive data and want to show their commitment to best practices in information security.",
        },
        {
          question: "How often should we perform an ISO 27001 audit?",
          answer: "ISO 27001 audits should be performed annually to ensure your information security management system is continuously improving and to maintain certification.",
        },
      ]}
      certifications={[
        { name: "CISA", imageUrl: "/certifications/cisa.png" },
        { name: "ISO 27001 LA", imageUrl: "/certifications/iso27001-la.jpeg" },
        { name: "ISO 27001 Implementer", imageUrl: "/certifications/iso27001-implementer.png" },
      ]}
      benefits={[]}
      toolsAndTechnologies={[]}
      servicesImage={{
        url: "/assets/services/compliance.webp",
        description: "ISO 27001 Compliance - Audit and Implementation"
      }}
    />
  )
}
