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
    title: "Full-Stack Developer",
    period: "Feb 2025 – present",
    company: "Lagrange Engineering SRL",
    description:
      "Lagrange Engineering is a Romanian company which I have founded. It specializes in custom Web Development (Basically a freelance web company) and as a full-stack developer I'm responsible for:",
    responsibilities: [
      "Design and develop web application servers and APIs using Java, Spring Boot, Node.js, and both SQL and NoSQL databases, collaborating with other freelance associates to deliver solutions aligned with client specifications.",
      "Design and implement user interfaces using React, integrating APIs with a strong focus on usability and client requirements. Leverage AI-assisted development tools such as Claude Code and Gemini to enhance productivity.",
      "Develop and maintain automated tests to ensure high code quality, reliability, and long-term maintainability in accordance with client standards.",
      "Build and maintain CI/CD pipelines using GitHub Actions and Docker, deploying to cloud platforms such as AWS, Azure, Railway, and Vercel to ensure reliable and predictable releases from development through production.",
    ],
  },
  {
    title: "Freelance Web Developer",
    period: "Jan 2024 – Feb 2025",
    company: "Self-Employed",
    description:
      "Worked as a freelance web developer, primarily building front-end focused websites and web applications for individuals and small businesses. Started by creating responsive websites using HTML, CSS, and JavaScript, and later moved on to building more complex applications with React and related tools. Used serverless backend solutions such as Supabase (SQL) and Firebase (NoSQL) to handle authentication, data storage, and real-time functionality without managing infrastructure. Gradually expanded from static websites to dynamic, client-driven applications, with a focus on usability, performance, and maintainable code.",
    responsibilities: [],
  },
  {
    title: "Industrial Automation Engineer",
    period: "Sep 2022 – Feb 2024",
    company: "TPS Industry SRL, Atlantis Project SRL",
    description:
      "Before transitioning into Tech, I worked as an Industrial Automation Engineer after majoring in Industrial Engineering. I held this role at Trocprim Serv SRL and Atlantis Project SRL, where I was responsible for:",
    responsibilities: [
      "Designing and implementing industrial process automation equipment tailored to client-specific requirements.",
      "Creating 3D pneumatic and electrical system designs, including technical documentation and detailed schematics.",
      "Programming PLCs (Programmable Logic Controllers) and integrating and programming industrial robots.",
      "Performing physical assembly, CNC machining, and electrical wiring of automation equipment.",
    ],
  },
];

const WorkExperienceSection = () => {
  return (
    <SectionWrapper>
      <div className="py-12 px-4">
        <div className="mb-12">
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
