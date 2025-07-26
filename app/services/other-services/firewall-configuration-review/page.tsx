import ServiceTemplate from "@/app/components/ServiceTemplate"

export default function FirewallConfigurationReview() {
  return (
    <ServiceTemplate
      title="Firewall Configuration Review"
      description="Assess and optimize your firewall configurations to enhance network security."
      meaning="A Firewall Configuration Review is a detailed examination of an organization's firewall settings and rules to ensure they are properly configured."
      servicesImage={{
        url: "/assets/services/firewall.webp",
        description: "Firewall Configuration Review"
      }}
      importance={[
        "Comprehensive firewall rule set analysis",
        "Identification of redundant or conflicting rules",
        "Assessment of rule ordering and efficiency",
        "Evaluation of access control lists (ACLs)",
        "Review of logging and monitoring configurations",
        "Compliance checking against security best practices",
      ]}
      benefits={[
        "Enhanced network security through optimized firewall configurations",
        "Improved network performance by eliminating redundant or inefficient rules",
        "Reduced risk of unauthorized access and potential breaches",
        "Better visibility into network traffic patterns and potential threats",
        "Increased compliance with regulatory requirements",
        "Simplified firewall management and maintenance",
      ]}
      toolsAndTechnologies={[
        { name: "Palo Alto Networks", image: "/tools/palo-alto.png" },
        { name: "Fortinet", image: "/tools/fortinet.png" },
        { name: "Cisco ASA", image: "/tools/cisco-asa.png" },
      ]}
      faq={[
        {
          question: "What is a firewall configuration review?",
          answer: "It's an assessment of firewall settings to ensure they are secure and effective."
        },
        {
          question: "How often should firewall reviews be conducted?",
          answer: "It's advisable to review firewall configurations at least annually."
        }
      ]}
      testimonials={[
        {
          name: "Mark Johnson",
          company: "SecureNet",
          quote: "The firewall review significantly improved our network security posture."
        }
      ]} sampleReports={[]}  
      certifications={[
        { name: "CISA", imageUrl: "/certifications/cisa.png" },
        { name: "CEH", imageUrl: "/certifications/ceh.png" },
        { name: "ISO/IEC 27001 ASSOCIATE", imageUrl: "/certifications/iso-27001.png" },
      ]}
       caseStudies={[]} serviceTimeline={[]}    />
  )
}

