import ServiceTemplate from "@/app/components/ServiceTemplate"

export default function RedTeaming() {
  return (
    <ServiceTemplate
      title="Red Teaming"
      description="Simulate real-world cyber attacks to test your organization's detection and response capabilities."
      meaning="Red Teaming is an advanced form of security assessment that simulates a real-world attack on an organization's people, processes, and technology."
      servicesImage={{
        url: "/assets/services/redteaming.webp",
        description: "Red Teaming"
      }}
      importance={[
        "Customized attack scenario development",
        "Multi-vector attack simulations (technical, physical, social engineering)",
        "Objective-based penetration testing",
        "Evasion technique testing against security controls",
        "Assessment of blue team detection and response capabilities",
        "Detailed reporting with strategic recommendations",
      ]}
      benefits={[
        "Realistic assessment of organization's security posture",
        "Identification of complex, multi-stage attack paths",
        "Improved incident detection and response capabilities",
        "Enhanced security awareness across the organization",
        "Validation of existing security investments and controls",
        "Strategic insights for long-term security improvements",
      ]}
      toolsAndTechnologies={[
        { name: "Metasploit", image: "/tools/metasploit.png" },
        { name: "Cobalt Strike", image: "/tools/cobalt-strike.png" },
        { name: "Burp Suite", image: "/tools/burp-suite.png" },
      ]}
      faq={[
        {
          question: "What is Red Teaming?",
          answer: "It's a simulated attack to test an organization's defenses."
        },
        {
          question: "How often should Red Teaming be conducted?",
          answer: "It's advisable to conduct Red Teaming exercises annually."
        }
      ]}
      testimonials={[
        {
          name: "Sarah Green",
          company: "SecureTech",
          quote: "The Red Teaming exercise exposed vulnerabilities we never knew existed."
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

