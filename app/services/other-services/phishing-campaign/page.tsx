import ServiceTemplate from "@/app/components/ServiceTemplate"

export default function PhishingCampaign() {
  return (
    <ServiceTemplate
      title="Phishing Campaign"
      description="Test your organization's resilience against phishing attacks and improve employee awareness."
      meaning="A Phishing Campaign is a simulated phishing attack conducted with the permission of an organization to assess and improve its employees' ability to recognize and respond to phishing attempts."
      servicesImage={{
        url: "/assets/services/phishing.webp",
        description: "Phishing Campaign"
      }}
      importance={[
        "Customized phishing email creation",
        "Multi-vector phishing simulations (email, SMS, voice)",
        "Employee response tracking and analysis",
        "Real-time education for employees who fall for simulated attacks",
        "Detailed reporting on campaign results and trends",
        "Recommendations for improving security awareness training",
      ]}
      benefits={[
        "Increased employee awareness of phishing threats",
        "Identification of vulnerable individuals or departments",
        "Improved ability to detect and report real phishing attempts",
        "Reduced risk of successful phishing attacks",
        "Measurable improvements in security awareness over time",
        "Enhanced overall organizational resilience against social engineering",
      ]}
      toolsAndTechnologies={[
        { name: "KnowBe4", image: "/tools/knowbe4.png" },
        { name: "Cofense", image: "/tools/cofense.png" },
        { name: "PhishMe", image: "/tools/phishme.png" },
      ]}
      faq={[
        {
          question: "What is a phishing campaign?",
          answer: "It's a simulated attack to test employee awareness of phishing."
        },
        {
          question: "How often should phishing campaigns be conducted?",
          answer: "It's recommended to conduct them at least twice a year."
        }
      ]}
      testimonials={[
        {
          name: "Tom White",
          company: "CyberSafe",
          quote: "The phishing campaign revealed critical gaps in our training."
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

