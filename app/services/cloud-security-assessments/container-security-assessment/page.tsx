import { Metadata } from 'next'
import ServiceTemplate from "@/app/components/ServiceTemplate"

export const metadata: Metadata = {
  title: 'container-security-assessment | DreamWorks Infotech',
  description: 'A process of evaluating cloud environments for vulnerabilities, misconfigurations, and security risks.',
  openGraph: {
    title: 'container-security-assessment | DreamWorks Infotech',
    description: 'Evaluate container-security-assessment for vulnerabilities and security risks.',
    type: 'website',
    url: 'https://dwinfotech.in/services/cloud-security-assessments/container-security-assessment',
    siteName: 'DreamWorks Infotech',
  }
}

export default function ContainerSecurityAssessment() {
  return (
    <ServiceTemplate
      title="Container Security Assessment"
      description="A security evaluation of containerized applications to detect vulnerabilities and enforce compliance."
      meaning="Container Security Assessment involves identifying vulnerabilities in containerized applications and ensuring they adhere to security best practices and compliance standards."
      importance={[
        "Identifies container vulnerabilities",
        "Prevents supply chain attacks",
        "Ensures runtime security",
        "Reduces misconfigurations",
        "Strengthens compliance with security policies",
        "Protects against unauthorized access",
      ]}
      trackRecord={{
        number: 180,
        description: "Containerized applications assessed for security",
      }}
      servicesImage={{
        url: "/assets/services/container.webp",
        description: "Container Security Assessment"
      }} 
      benefits={[
        "Improved security posture for containerized environments",
        "Reduced risk of supply chain attacks",
        "Stronger runtime security and integrity",
        "Fewer misconfigurations leading to vulnerabilities",
        "Enhanced compliance with industry security policies",
        "Increased protection from unauthorized access",
      ]}
      toolsAndTechnologies={[
        { name: "Anchore", image: "/tools/anchore.png" },
        { name: "Jit", image: "/tools/jit.png" },
        { name: "Sysdig Falco", image: "/tools/sysdig-falco.png" },
        { name: "Snyk", image: "/tools/snyk.png" },
        { name: "Skyhawk", image: "/tools/skyhawk.png" },
        { name: "Slim.AI", image: "/tools/slim-ai.png" },
      ]}
      sampleReports={[
        "Scope of Assessment",
        "Container Security Best Practices",
        "Vulnerabilities in Containerized Applications",
        "Configuration Review",
        "Recommendations for Security",
        "Conclusion",
      ]}
      assessmentMethods={{
        onsite: "Our team conducts an on-site assessment to review container security practices in your environment.",
        offsite: "Remote assessment available with secure access provided to containerized applications.",
      }}
      testimonials={[
        {
          name: "DevOps Lead",
          company: "SaaS Startup",
          quote: "Thanks to their Kubernetes security expertise, our containerized workloads are now fully compliant and resilient to cyber threats.",
        },
        {
          name: "Security Manager",
          company: "Fintech Solutions",
          quote: "The container security assessment helped us identify critical vulnerabilities, allowing us to secure our containerized applications before any incidents occurred.",
        },
        {
          name: "IT Director",
          company: "Global Retailer",
          quote: "We were impressed by the thoroughness of the assessment, which significantly improved our container security practices and ensured we were in compliance with industry standards.",
        },
      ]}
      caseStudies={[
        {
          title: "SaaS Startup Kubernetes Security",
          description: "Secured Kubernetes-based workloads for a SaaS startup, ensuring compliance with security policies and protecting against cyber threats.",
          link: "/case-studies/saas-kubernetes-security",
        },
      ]}
      serviceTimeline={[
        {
          step: 1,
          title: "Kick-off Meeting",
          description: "Introduce the process, discuss your containerized environment and security needs.",
        },
        {
          step: 2,
          title: "Questionnaire",
          description: "Gather necessary information about your containerized applications and security policies.",
        },
        {
          step: 3,
          title: "First Audit Report",
          description: "Initial audit of your container security, identifying potential vulnerabilities.",
        },
        {
          step: 4,
          title: "Confirmatory Report/Follow-up Audit",
          description: "Continuous tracking of vulnerabilities, ensuring they are resolved or mitigated.",
        },
        {
          step: 5,
          title: "Final Follow-up Clearance Report",
          description: "Provide a final report with recommendations for securing your containerized environment.",
        },
        {
          step: 6,
          title: "Issuing Clearance Certificate",
          description: "Deliver a clearance certificate confirming your container security improvements.",
        },
        {
          step: 7,
          title: "Closure Meeting",
          description: "Review the results, discuss next steps, and ensure that all security objectives are met.",
        },
      ]}
      faq={[
        {
          question: "Are container security assessments necessary for small businesses?",
          answer: "Yes, even small businesses using containers should assess security to prevent data breaches and maintain compliance.",
        },
      ]} certifications={[]}    />
  )
}
