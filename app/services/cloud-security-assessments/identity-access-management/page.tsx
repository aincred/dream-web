import { Metadata } from 'next'
import ServiceTemplate from "@/app/components/ServiceTemplate"

export const metadata: Metadata = {
  title: 'Identity & Access Management | DreamWorks Infotech',
  description: 'A framework ensuring that the right individuals have access to the right resources at the right times.',
  openGraph: {
    title: 'Identity & Access Management | DreamWorks Infotech',
    description: 'A framework ensuring that the right individuals have access to the right resources at the right times.',
    type: 'website',
    url: 'https://dwinfotech.in/services/cloud-security-assessments/identity-access-management',
    siteName: 'DreamWorks Infotech',
  }
}

export default function IdentityAccessManagement() {
  return (
    <ServiceTemplate
      title="Identity & Access Management"
      description="A framework ensuring that the right individuals have access to the right resources at the right times."
      meaning="Identity & Access Management (IAM) ensures that only authorized individuals can access sensitive data and resources, strengthening security and compliance."
      importance={[
        "Ensures only authorized users access sensitive data",
        "Reduces insider threats",
        "Enhances compliance with regulations",
        "Prevents identity theft",
        "Strengthens authentication mechanisms",
        "Improves user experience with seamless access",
      ]}
      trackRecord={{
        number: 150,
        description: "IAM assessments conducted for organizations worldwide",
      }}
      servicesImage={{
        url: "/assets/services/identity.webp",
        description: "Identity & Access Management"
      }} 
      benefits={[
        "Improved security by ensuring proper access controls",
        "Reduced risk of insider threats and data breaches",
        "Enhanced compliance with data protection regulations",
        "Stronger authentication and authorization mechanisms",
        "Seamless user access experience",
      ]}
      toolsAndTechnologies={[
        { name: "PACU", image: "/tools/pacu.png" },
        { name: "AWS PWN", image: "/tools/aws-pwn.png" },
        { name: "Whispers", image: "/tools/whispers.png" },
        { name: "Cloudjack", image: "/tools/cloudjack.png" },
        { name: "Redboto", image: "/tools/redboto.png" },
        { name: "CloudBrute", image: "/tools/cloudbrute.png" },
      ]}
      sampleReports={[
        "IAM Framework Review",
        "Access Control Policies and Procedures",
        "Authentication and Authorization Mechanisms",
        "User Privilege Management",
        "Risk Analysis",
        "Recommendations",
        "Conclusion",
      ]}
      certifications={[
        { name: "CISA", imageUrl: "/certifications/cisa.png" },
        { name: "CEH", imageUrl: "/certifications/ceh.png" },
      ]}
      assessmentMethods={{
        onsite: "Our team conducts an on-premises assessment to review your identity and access management practices.",
        offsite: "We offer a remote IAM assessment with secure access provided by your organization.",
      }}
      testimonials={[
        {
          name: "Security Head",
          company: "Healthcare Firm",
          quote:
            "Their IAM assessment provided us with a clear roadmap to enhance our access management strategy, reducing insider threats.",
        },
      ]}
      caseStudies={[
        {
          title: "Healthcare Firm IAM Enhancement",
          description:
            "Enhanced identity and access management practices to reduce insider threats and improve security compliance.",
          link: "/case-studies/healthcare-iam-enhancement",
        },
      ]}
      serviceTimeline={[
        {
          step: 1,
          title: "Kick-off Meeting",
          description: "Introduction to the IAM process, understanding organizational needs, and scoping.",
        },
        {
          step: 2,
          title: "Questionnaire",
          description: "Distribute a questionnaire to gather essential information about your IAM environment.",
        },
        {
          step: 3,
          title: "First Audit Report",
          description: "Initial audit of your IAM systems and procedures.",
        },
        {
          step: 4,
          title: "Confirmatory Report/Follow-up Audit",
          description: "Continuous tracking of vulnerabilities, ensuring proper mitigation.",
        },
        {
          step: 5,
          title: "Final Follow-up Clearance Report",
          description: "Final assessment and confirmation of security improvements.",
        },
        {
          step: 6,
          title: "Issuing Clearance Certificate",
          description: "Provide a certificate confirming IAM system improvements.",
        },
        {
          step: 7,
          title: "Closure Meeting",
          description: "Review the entire IAM process and discuss final thoughts.",
        },
      ]}
      faq={[
        {
          question: "How often should we perform an Identity & Access Management assessment?",
          answer:
            "It is recommended to conduct IAM assessments at least annually or whenever major changes occur in your IT infrastructure.",
        },
      ]}
    />
  )
}

