export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wang Ye",
    jobTitle: "Senior Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Red Hat",
      url: "https://www.redhat.com",
    },
    description:
      "Senior Software Engineer at Red Hat with 5+ years experience building AI-powered applications, MCP integrations, and LLM solutions.",
    url: "https://wyecv.uk",
    sameAs: [
      "https://github.com/wangyedev",
      "https://www.linkedin.com/in/wangyecv/",
    ],
    email: "wangyecv@gmail.com",
    knowsAbout: [
      "Full Stack Development",
      "AI Agent Development",
      "MCP Model Context Protocol",
      "LLM Applications",
      "React",
      "Next.js",
      "TypeScript",
      "Software Engineering",
    ],
    alumniOf: "Software Engineering",
    hasOccupation: {
      "@type": "Occupation",
      name: "Senior Software Engineer",
      occupationLocation: {
        "@type": "Country",
        name: "United States",
      },
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "AI Development",
        "Full Stack Development",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
