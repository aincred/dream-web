import ServiceTemplate from "@/app/components/ServiceTemplate"

export default function DatabaseReview() {
  return (
    <ServiceTemplate
      title="Database Review"
      description="Assess and enhance the security of your database systems to protect sensitive data."
      meaning="A Database Review is a comprehensive assessment of database systems, focusing on security configurations, access controls, data protection mechanisms, and overall database management practices."
      servicesImage={{
        url: "/assets/services/database.webp",
        description: "Database Review"
      }}
      importance={[
        "Database configuration and hardening assessment",
        "Access control and authentication review",
        "Data encryption evaluation",
        "Backup and recovery process assessment",
        "Database activity monitoring review",
        "Compliance check for database security standards",
      ]}
      benefits={[
        "Identification of database-specific vulnerabilities and misconfigurations",
        "Enhanced protection of sensitive data stored in databases",
        "Improved compliance with data protection regulations",
        "Reduced risk of data breaches and unauthorized access",
        "Optimized database performance and security",
        "Increased confidence in database management practices",
      ]}
      toolsAndTechnologies={[
        { name: "SQLMap", image: "/tools/sqlmap.png" },
        { name: "DbProtect", image: "/tools/dbprotect.png" },
        { name: "Oracle Audit Vault", image: "/tools/oracle-audit-vault.png" },
      ]}
      faq={[
        {
          question: "What is a database review?",
          answer: "A database review assesses the security and performance of database systems."
        },
        {
          question: "How often should database reviews be conducted?",
          answer: "It's recommended to conduct reviews at least annually or after significant changes."
        }
      ]}
      testimonials={[
        {
          name: "Jane Smith",
          company: "Data Corp",
          quote: "The database review helped us identify critical vulnerabilities that we were unaware of."
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

