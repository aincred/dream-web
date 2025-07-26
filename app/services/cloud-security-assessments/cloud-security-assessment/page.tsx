import { Metadata } from 'next'
import ServiceTemplate from "@/app/components/ServiceTemplate";

export const metadata: Metadata = {
  title: 'Cloud Security Assessment | DreamWorks Infotech',
  description: 'A process of evaluating cloud environments for vulnerabilities, misconfigurations, and security risks.',
  openGraph: {
    title: 'Cloud Security Assessment | DreamWorks Infotech',
    description: 'Evaluate cloud environments for vulnerabilities and security risks.',
    type: 'website',
    url: 'https://dwinfotech.in/services/cloud-security-assessments/cloud-security-assessment',
    siteName: 'DreamWorks Infotech',
  }
}

export default function CloudSecurityAssessment() {
  return (
    <ServiceTemplate
      title="Cloud Security Assessment"
      description="A process of evaluating cloud environments for vulnerabilities, misconfigurations, and security risks."
      meaning="A Cloud Security Assessment is designed to identify security gaps, evaluate risks, and ensure best practices in cloud environments, providing organizations with a clear security posture."
      importance={[
        "Prevents unauthorized access",
        "Identifies misconfigurations",
        "Enhances compliance with industry standards",
        "Protects sensitive data",
        "Detects cloud-specific threats",
        "Strengthens overall cloud security posture",
      ]}
      trackRecord={{
        number: 300,
        description: "Cloud environments assessed and secured successfully",
      }}
      servicesImage={{
        url: "/assets/services/cloud.webp",
        description: "Cloud Security Assessment"
      }} 
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
        { step: 6, title: "Issuing Clearance Certificate", description: "Provide security clearance for compliance adherence." },
        { step: 7, title: "Client Feedback & Closure", description: "Gather feedback and issue project completion certification." },
      ]}
      toolsAndTechnologies={[
        { name: "Cloud Security Alliance", image: "/tools/postman.png" },
      ]}
      testimonials={[
        {
          name: "CTO, Fintech Company",
          company: "Fintech Company",
          quote: "Dreamworks Infotech helped us secure our cloud infrastructure, identifying critical misconfigurations and strengthening our defenses.",
        },
      ]}
      certifications={[
        { name: "Certified Ethical Hacker (CEH)", imageUrl: "/certifications/ceh.png" },
        { name: "Azure Security Certification", imageUrl: "/certifications/azure-security.png" },
        { name: "AWS Certified Security", imageUrl: "/certifications/aws-security.png" },
      ]}
      faq={[
        {
          question: "What is the difference between a Cloud Security Assessment and a regular security audit?",
          answer: "A Cloud Security Assessment focuses specifically on cloud environments, addressing unique challenges such as misconfigurations, API security, and identity management.",
        },
      ]} benefits={[]} sampleReports={[]} caseStudies={[]}    />
  );
}

