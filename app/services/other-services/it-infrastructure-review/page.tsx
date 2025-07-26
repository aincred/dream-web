import ServiceTemplate from "@/app/components/ServiceTemplate"

export default function ITInfrastructureReview() {
  return (
    <ServiceTemplate
      title="IT Infrastructure Review"
      description="Evaluate and improve the security of your entire IT infrastructure."
      meaning="An IT Infrastructure Review is a comprehensive assessment of an organization's entire IT environment, including hardware, software, networks, and processes."
      servicesImage={{
        url: "/assets/services/infrastructure.webp",
        description: "IT Infrastructure Review"
      }}
      importance={[
        "Network architecture and segmentation review",
        "Server and endpoint security assessment",
        "Cloud infrastructure evaluation",
        "Software and application inventory analysis",
        "Patch management process review",
        "Disaster recovery and business continuity planning assessment",
      ]}
      benefits={[
        "Comprehensive view of the organization's IT security posture",
        "Identification of vulnerabilities across the entire IT infrastructure",
        "Improved alignment of IT infrastructure with business objectives",
        "Enhanced operational efficiency and reduced downtime",
        "Better resource allocation for IT security investments",
        "Increased resilience against cyber threats and operational disruptions",
      ]}
      toolsAndTechnologies={[
        { name: "Nessus", image: "/tools/nessus.png" },
        { name: "Qualys", image: "/tools/qualys.png" },
        { name: "SolarWinds", image: "/tools/solarwinds.png" },
      ]}
      faq={[
        {
          question: "What is an IT infrastructure review?",
          answer: "It's an assessment of all IT components to identify vulnerabilities."
        },
        {
          question: "How often should IT infrastructure reviews be conducted?",
          answer: "It's recommended to conduct reviews annually or after major changes."
        }
      ]}
      testimonials={[
        {
          name: "Alice Brown",
          company: "Tech Innovations",
          quote: "The IT infrastructure review helped us streamline our operations."
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

