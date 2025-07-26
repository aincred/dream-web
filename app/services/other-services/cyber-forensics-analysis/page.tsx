import ServiceTemplate from "@/app/components/ServiceTemplate"

export default function CyberForensicsAnalysis() {
  return (
    <ServiceTemplate
      title="Cyber Forensics Analysis"
      description="Investigate and analyze digital evidence for security incidents and legal purposes."
      meaning="Cyber Forensics Analysis is the process of collecting, preserving, analyzing, and presenting digital evidence related to cybersecurity incidents or potential criminal activities."
      servicesImage={{
        url: "/assets/services/forensic.webp",
        description: "Cyber Forensics Analysis"
      }}
      importance={[
        "Digital evidence collection and preservation",
        "Disk and memory forensics",
        "Network traffic analysis",
        "Malware analysis and reverse engineering",
        "Mobile device forensics",
        "Expert witness testimony and reporting",
      ]}
      benefits={[
        "Thorough investigation of security incidents and data breaches",
        "Legally admissible evidence for potential litigation",
        "Identification of attack vectors and methods",
        "Improved incident response and recovery processes",
        "Support for regulatory compliance and reporting requirements",
        "Enhanced understanding of threats for future prevention",
      ]}
      toolsAndTechnologies={[
        { name: "EnCase", image: "/tools/encase.png" },
        { name: "FTK Imager", image: "/tools/ftk.png" },
        { name: "Wireshark", image: "/tools/wireshark.png" },
      ]}
      faq={[
        {
          question: "What is digital forensics?",
          answer: "Digital forensics is the process of recovering and investigating material found in digital devices, often in relation to computer crime."
        },
        {
          question: "How long does a cyber forensics analysis take?",
          answer: "The duration depends on the complexity of the case, but it typically takes several days to weeks."
        }
      ]}
      testimonials={[
        {
          name: "John Doe",
          company: "Tech Solutions",
          quote: "The cyber forensics team provided invaluable insights that helped us recover from a major incident."
        }
      ]}
      sampleReports={[
        "Incident Report",
        "Evidence Collection Report",
        "Analysis Findings",
        "Recommendations for Security Improvements"
      ]}
       
      certifications={[
        { name: "CISA", imageUrl: "/certifications/cisa.png" },
        { name: "CEH", imageUrl: "/certifications/ceh.png" },
        { name: "ISO/IEC 27001 ASSOCIATE", imageUrl: "/certifications/iso-27001.png" },
      ]}
      
      caseStudies={[
        {
          title: "Data Breach Investigation", description: "A detailed analysis of a data breach incident and the forensic methods used.",
          link: ""
        },
        {
          title: "Malware Analysis Case", description: "An in-depth look at a malware analysis conducted for a client.",
          link: ""
        }
      ]}
      serviceTimeline={[
        { step: 1, title: "Initial Consultation", description: "Discuss the scope and requirements of the analysis." },
        { step: 2, title: "Evidence Collection", description: "Collect and preserve digital evidence." },
        { step: 3, title: "Analysis Phase", description: "Conduct a thorough analysis of the collected evidence." },
        { step: 4, title: "Reporting", description: "Prepare a detailed report of findings." },
        { step: 5, title: "Follow-up Consultation", description: "Discuss findings and recommendations." }
      ]}
    />
  )
}

