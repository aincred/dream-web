import ServiceTemplate from "@/app/components/ServiceTemplate"

export default function SourceCodeReview() {
  return (
    <ServiceTemplate
      title="Source Code Review"
      description="Identify security vulnerabilities and coding issues through comprehensive source code analysis."
      meaning="Source Code Review is a systematic examination of an application's source code to identify security vulnerabilities, coding errors, and adherence to coding standards."
      servicesImage={{
        url: "/assets/services/code.webp",
        description: "Source Code Review"
      }}
      importance={[
        "Manual code review by security experts",
        "Automated static code analysis",
        "Identification of security vulnerabilities and weaknesses",
        "Assessment of coding best practices and standards compliance",
        "Third-party library and component analysis",
        "Detailed reporting with remediation recommendations",
      ]}
      benefits={[
        "Early detection of security vulnerabilities in the development cycle",
        "Reduced cost of fixing security issues compared to post-deployment",
        "Improved overall code quality and maintainability",
        "Enhanced compliance with secure coding standards",
        "Increased developer awareness of secure coding practices",
        "Comprehensive security posture improvement for applications",
      ]}
      toolsAndTechnologies={[
        { name: "Fortify", image: "/tools/fortify.png" },
        { name: "Checkmarx", image: "/tools/checkmarx.png" },
        { name: "SonarQube", image: "/tools/sonarqube.png" },
      ]}
      faq={[
        {
          question: "What is a source code review?",
          answer: "It's an assessment of source code to identify vulnerabilities."
        },
        {
          question: "How often should source code reviews be conducted?",
          answer: "It's advisable to conduct reviews for every major release."
        }
      ]}
      testimonials={[
        {
          name: "Emily White",
          company: "CodeSecure",
          quote: "The source code review significantly improved our code quality."
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

