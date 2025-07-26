import ServiceTemplate from "@/app/components/ServiceTemplate"

export default function VirtualCISO() {
  return (
    <ServiceTemplate
      title="Virtual CISO"
      description="Get expert guidance and leadership for your cybersecurity strategy without the cost of a full-time CISO."
      meaning="A Virtual CISO (Chief Information Security Officer) provides organizations with access to experienced cybersecurity leadership and expertise on a part-time or as-needed basis."
      servicesImage={{
        url: "/assets/services/virtualciso.webp",
        description: "Virtual CISO"
      }}
      importance={[
        "Development and implementation of cybersecurity strategy",
        "Risk assessment and management",
        "Security policy and procedure development",
        "Compliance management and reporting",
        "Incident response planning and management",
        "Security awareness program development",
        "Vendor risk management oversight",
      ]}
      benefits={[
        "Access to expert cybersecurity leadership at a fraction of the cost of a full-time CISO",
        "Improved alignment of security strategy with business objectives",
        "Enhanced compliance with industry regulations and standards",
        "Objective third-party perspective on security challenges",
        "Flexible and scalable security leadership to meet changing needs",
        "Continuous improvement of the organization's security posture",
      ]}
      toolsAndTechnologies={[
        { name: "Risk Management Framework", image: "/tools/risk-management.png" },
        { name: "Compliance Management Tools", image: "/tools/compliance-tools.png" },
        { name: "Incident Response Tools", image: "/tools/incident-response.png" },
      ]}
      faq={[
        {
          question: "What is a Virtual CISO?",
          answer: "It's a part-time CISO providing strategic guidance."
        },
        {
          question: "How can a Virtual CISO benefit my organization?",
          answer: "They provide expert leadership without the full-time cost."
        }
      ]}
      testimonials={[
        {
          name: "Michael Green",
          company: "CyberGuard",
          quote: "The Virtual CISO service transformed our security strategy."
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

