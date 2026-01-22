import SectionWrapper from "./section-wrapper";

interface WorkExperience {
  title: string;
  period: string;
  company: string;
  description: string;
  responsibilities: string[];
}

const workExperiences: WorkExperience[] = [
  {
    title: "Full-Stack Developer and Founder",
    period: "Feb 2025 – present",
    company: "Lagrange Engineering SRL",
    description:
      "Lagrange Engineering is a Romanian company which I have founded. It specializes in custom Web Development (Basically a freelance web company right now) and as a full-stack developer my responsibilities are:",
    responsibilities: [
      "Designing and building web applications using Golang, Node.js, SQL Databases (Postgres, MySQL, SQLite) and NoSQL (MongoDB primarily) alongside associates according to the client's specifications.",
      "Designing and building user interfaces using React (Next.js or TanStack Start depending on the application) and API integration, focusing on user experience and client's specifications. Interfaces are built with the help of AI agents like Claude Code or Gemini.",
      "Creating tests that ensures that the code quality meets the client's standards, while keeping the codebase maintainable.",
      "Creating CI/CD pipelines with Github Actions, Docker and chosen Cloud Providers (AWS, Azure, Railway, Vercel) ensuring seamless predictable deployments from development to production.",
    ],
  },
  {
    title: "Freelance Web Developer",
    period: "Jan 2024 – Feb 2025",
    company: "Self-Employed",
    description:
      "As a freelance web developer I mostly developed simple web pages and a few apps, but more front-end oriented, using serverless solutions like Supabase for SQL and Firebase for NoSQL. When I started out I made vanilla HTML, CSS and Javascript web pages for friends and other people I knew, then I started learning React and other libraries and frameworks that helped me build more complex projects for actual clients.",
    responsibilities: [],
  },
  {
    title: "Industrial Automation Engineer",
    period: "Sep 2022 – Feb 2024",
    company: "TPS Industry SRL, Atlantis Project SRL",
    description:
      "Before my career in Tech, I worked as an Industrial Automation Engineer started when I was 18 years old, following my college major's field (Industrial Engineering). In this time I have worked for two companies: Tropcrim Serv SRL and Atlantis Project SRL, but the position consisted of the same responsibilities:",
    responsibilities: [
      "Industrial process automation equipment and devices design and implementation specific to the client's requirements.",
      "3D design pneumatic and electrical diagrams and technical documentation for the equipment.",
      "Programming PLCs (programmable logic controllers) and industrial robot integration and programming.",
      "Physical mounting, CNC machining and electrical wiring of the equipment.",
    ],
  },
];

const WorkExperienceSection = () => {
  return (
    <SectionWrapper>
      <div className="pt-4 pb-16 px-4">
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-mono text-foreground">
            Work Experience
          </h2>
        </div>

        <div className="space-y-8">
          {workExperiences.map((experience, index) => (
            <div key={index}>
              {/* Past career divider before the last item */}
              {index === 2 && (
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex-1 border-t border-dashed" />
                  <span className="text-muted-foreground font-mono text-sm">
                    My past career
                  </span>
                  <div className="flex-1 border-t border-dashed" />
                </div>
              )}

              <div className="border rounded-lg p-6 hover:border-primary/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-mono text-foreground">
                      {experience.title}
                    </h3>
                    <p className="text-primary font-mono text-sm">
                      {experience.company}
                    </p>
                  </div>
                  <span className="text-muted-foreground font-mono text-sm whitespace-nowrap">
                    {experience.period}
                  </span>
                </div>

                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {experience.description}
                </p>

                {experience.responsibilities.length > 0 && (
                  <ul className="mt-4 space-y-2 list-disc list-inside">
                    {experience.responsibilities.map((responsibility, idx) => (
                      <li
                        key={idx}
                        className="text-muted-foreground font-mono text-sm leading-relaxed"
                      >
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default WorkExperienceSection;
