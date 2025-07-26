import { Metadata } from 'next'
import ServiceTemplate from "@/app/components/ServiceTemplate"

export const metadata: Metadata = {
  title: 'Third Party Risk Management (TPRM) | DreamWorks Infotech',
  description: 'Identify, assess, and manage risks associated with third-party vendors to ensure the security and compliance of your business.',
  openGraph: {
    title: 'Third Party Risk Management (TPRM) | DreamWorks Infotech',
    description: 'Identify, assess, and manage risks associated with third-party vendors to ensure the security and compliance of your business.',
    type: 'website',
    url: 'https://dwinfotech.in/services/governance-risk-compliance/third-party-risk-management',
    siteName: 'DreamWorks Infotech',
  }
}

export default function ThirdPartyRiskManagement() {
  return (
    <ServiceTemplate
      title="Third Party Risk Management (TPRM)"
      description="Identify, assess, and manage risks associated with third-party vendors to ensure the security and compliance of your business."
      meaning="Third-Party Risk Management (TPRM) is a comprehensive approach to identifying, evaluating, and mitigating risks that arise from your organization's relationships with third-party vendors, suppliers, and service providers. It ensures that external partners meet the necessary compliance and security standards to avoid risks such as data breaches or operational disruptions."
      importance={[
        "Ensures the security and integrity of your supply chain by assessing the risks associated with third-party vendors.",
        "Helps mitigate financial, operational, and reputational risks by thoroughly evaluating vendor risks before forming partnerships.",
        "Assures compliance with regulatory requirements by ensuring that vendors adhere to industry standards and guidelines.",
        "Reduces the likelihood of data breaches or cyber-attacks originating from vulnerable third-party relationships.",
        "Improves decision-making by categorizing third-party risks based on their potential impact on the organization.",
        "Strengthens overall risk governance, making it easier to track, assess, and manage risks throughout the vendor lifecycle.",
      ]}
      trackRecord={{
        number: 42,
        description: "Successfully managed third-party risk assessments for over 42 clients across diverse industries, identifying critical vendor risks and implementing mitigation strategies.",
      }}
      sampleReports={[
        "Executive Summary",
        "Third-Party Risk Assessment Methodology",
        "Third-Party Risk Framework",
        "Identification of Critical Vendors",
        "Risk Categorization",
        "Vendor Risk Evaluation",
        "Mitigation Strategies",
        "Recommendations",
        "Conclusion",
      ]}
      certifications={[
        { name: "CISA", imageUrl: "/certifications/cisa.png" },
        { name: "ISO 27001 LA", imageUrl: "/certifications/iso27001-la.jpeg" },
        { name: "ISO 27001 Implementer", imageUrl: "/certifications/iso27001-implementer.png" },
      ]}
      assessmentMethods={{
        onsite: "On-site evaluation of vendor contracts, security policies, and operational practices to identify and assess risks.",
        offsite: "Remote risk assessment based on vendor documentation and questionnaires, focusing on their risk management practices and compliance status.",
      }}
      testimonials={[
        {
          name: "CFO",
          company: "Global Logistics Co.",
          quote: "Thanks to their thorough third-party risk management services, we were able to assess and mitigate potential vendor risks that could have impacted our operations significantly.",
        },
        {
          name: "Risk Manager",
          company: "Tech Solutions Ltd.",
          quote: "The insights we gained from their TPRM audit were invaluable in identifying key risks in our third-party relationships and improving our overall risk management framework.",
        },
        {
          name: "Compliance Officer",
          company: "HealthTech Innovations",
          quote: "Their team provided expert guidance on managing third-party risks, ensuring our vendors comply with data protection and regulatory standards.",
        },
      ]}
      caseStudies={[
        {
          title: "Mitigating Vendor Risks for a Global Logistics Company",
          description: "A comprehensive third-party risk management solution helped identify critical risks and streamline vendor selection and management processes.",
          link: "/case-studies/third-party-risk-logistics",
        },
        {
          title: "Strengthening Risk Management for a HealthTech Firm",
          description: "We helped a HealthTech company evaluate vendor risks to protect patient data and ensure compliance with industry regulations.",
          link: "/case-studies/third-party-risk-healthtech",
        },
      ]}
      serviceTimeline={[
        {
          step: 1,
          title: "Initiation Mail",
          description: "Send an initiation email to begin the TPRM audit process, confirming the scope and objectives of the engagement.",
        },
        {
          step: 2,
          title: "Evidence Collection",
          description: "Collect relevant documentation from vendors to assess their security practices, compliance standards, and risk management processes.",
        },
        {
          step: 3,
          title: "Doubt Clearing Session",
          description: "Hold a session with stakeholders to clarify any questions or concerns related to the third-party risk management process and expectations.",
        },
        {
          step: 4,
          title: "Reporting",
          description: "Prepare a comprehensive report that outlines the identified risks, vendor evaluations, and recommended mitigation strategies.",
        },
        {
          step: 5,
          title: "Final Level Clearance Report",
          description: "Provide a final report confirming the assessment findings and the level of risk for each vendor, along with mitigation plans.",
        },
        {
          step: 6,
          title: "Closure Meeting",
          description: "Conduct a meeting to review the findings, discuss action plans, and close the engagement after ensuring all recommendations are understood and accepted.",
        },
      ]}
      faq={[
        {
          question: "What is Third-Party Risk Management?",
          answer: "Third-Party Risk Management (TPRM) is the process of assessing, monitoring, and mitigating risks posed by external vendors or partners that may impact your organization's operations, security, and compliance.",
        },
        {
          question: "Why is Third-Party Risk Management important?",
          answer: "It is essential to protect your organization from external risks such as cyber-attacks, compliance violations, and operational disruptions caused by third-party vendors.",
        },
        {
          question: "How often should Third-Party Risk Assessments be conducted?",
          answer: "It is recommended to conduct third-party risk assessments at least annually or whenever significant changes occur in vendor relationships, regulatory standards, or your organization's operations.",
        },
        {
          question: "How can Third-Party Risk Management benefit my company?",
          answer: "TPRM helps protect your company by identifying and mitigating potential risks in vendor relationships, ensuring compliance, and improving overall security and operational resilience.",
        },
      ]}
      servicesImage={{
        url: "/assets/services/thirdparty.webp",
        description: "Third Party Risk Management (TPRM)"
      }}
      benefits={[
        "Reduced vendor-related risks",
        "Enhanced compliance monitoring",
        "Better vendor management",
        "Improved security posture",
        "Cost optimization"
      ]}
      toolsAndTechnologies={[
        { name: "Vendor Risk Assessment", image: "/tools/vendor-risk.png" },
        { name: "Compliance Monitor", image: "/tools/compliance.png" }
      ]}
    />
  )
}
