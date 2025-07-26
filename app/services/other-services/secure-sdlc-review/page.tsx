import ServiceTemplate from "@/app/components/ServiceTemplate"

export default function SecureSDLCReview() {
  return (
    <ServiceTemplate
      title="Secure SDLC Review"
      description="Integrate security into your software development lifecycle to build more secure applications."
      meaning="A Secure Software Development Life Cycle (SDLC) Review is a comprehensive assessment of your development processes to ensure security is integrated at every stage."
      servicesImage={{
        url: "/assets/services/data.webp",
        description: "Secure SDLC Review"
      }}
      importance={[
        "SDLC process analysis and optimization",
        "Security requirements gathering and threat modeling",
        "Secure coding practices review",
        "Security testing integration (SAST, DAST, IAST)",
        "Third-party component security assessment",
        "Continuous integration/continuous deployment (CI/CD) security review",
      ]}
      benefits={[
        "Reduced security vulnerabilities in final products",
        "Cost-effective security implementation",
        "Improved compliance with security standards and regulations",
        "Enhanced developer security awareness",
        "Faster time-to-market with secure applications",
        "Increased customer trust and satisfaction",
      ]}
      toolsAndTechnologies={[
        { name: "SonarQube", image: "/tools/sonarqube.png" },
        { name: "Checkmarx", image: "/tools/checkmarx.png" },
        { name: "Veracode", image: "/tools/veracode.png" },
      ]}
      faq={[
        {
          question: "What is a Secure SDLC Review?",
          answer: "It's an assessment to ensure security is integrated into the software development lifecycle."
        },
        {
          question: "How often should SDLC reviews be conducted?",
          answer: "It's recommended to conduct reviews at the start of each development cycle."
        }
      ]}
      testimonials={[
        {
          name: "David Black",
          company: "DevSecOps Inc.",
          quote: "The SDLC review helped us integrate security seamlessly into our processes."
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

