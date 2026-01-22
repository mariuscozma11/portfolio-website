import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import ProjectCard from "./project-card";
import SectionWrapper from "./section-wrapper";
import { useState } from "react";

interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  github?: string;
  live?: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop",
    title: "API Gateway Service",
    description: "A high-performance API gateway built with Go, handling millions of requests daily with rate limiting and caching.",
    fullDescription: "A high-performance API gateway built with Go that handles millions of requests daily. Features include intelligent rate limiting, response caching, request/response transformation, and comprehensive logging. Built with a focus on minimal latency and maximum throughput.",
    technologies: ["Go", "Redis", "PostgreSQL", "Docker", "Kubernetes"],
    github: "https://github.com",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=225&fit=crop",
    title: "Event Streaming Platform",
    description: "Real-time event streaming solution using Kafka and microservices architecture for distributed systems.",
    fullDescription: "A real-time event streaming platform designed for distributed systems. Processes millions of events per second with guaranteed delivery and exactly-once semantics. Includes a custom consumer framework and dead-letter queue handling.",
    technologies: ["Go", "Apache Kafka", "gRPC", "Protobuf", "Docker"],
    github: "https://github.com",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop",
    title: "Cloud Infrastructure CLI",
    description: "Command-line tool for managing multi-cloud infrastructure with Terraform and custom provisioning logic.",
    fullDescription: "A powerful CLI tool for managing infrastructure across AWS, Azure, and GCP. Wraps Terraform with custom provisioning logic, state management, and drift detection. Simplifies complex multi-cloud deployments into simple commands.",
    technologies: ["Go", "Terraform", "AWS SDK", "Azure SDK", "GCP SDK"],
    github: "https://github.com",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    title: "Data Pipeline Engine",
    description: "ETL pipeline framework for processing large datasets with parallel execution and fault tolerance.",
    fullDescription: "An ETL pipeline framework designed for processing terabytes of data daily. Features parallel execution, automatic retry logic, checkpoint recovery, and pluggable transformers. Integrates with various data sources and sinks.",
    technologies: ["Go", "PostgreSQL", "ClickHouse", "S3", "Docker"],
    github: "https://github.com",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop",
    title: "Auth Service",
    description: "Secure authentication microservice with OAuth2, JWT tokens, and multi-factor authentication support.",
    fullDescription: "A production-ready authentication microservice supporting OAuth2, OIDC, JWT tokens, and MFA. Includes session management, password policies, brute-force protection, and audit logging. Designed for easy integration with any application.",
    technologies: ["Go", "PostgreSQL", "Redis", "JWT", "TOTP"],
    github: "https://github.com",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop",
    title: "Monitoring Dashboard",
    description: "Real-time system monitoring dashboard with custom metrics, alerts, and performance analytics.",
    fullDescription: "A real-time monitoring dashboard for tracking system health, custom metrics, and performance analytics. Features customizable dashboards, alerting rules, anomaly detection, and historical data analysis. Built with a React frontend and Go backend.",
    technologies: ["Go", "React", "InfluxDB", "Grafana", "WebSocket"],
    github: "https://github.com",
    live: "https://example.com",
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionWrapper>
      <div className="pt-4 pb-16 px-4 md:px-16">
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-mono text-foreground">
            Projects
          </h2>
          <p className="mt-2 text-muted-foreground font-mono">
            A selection of my recent work
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {mockProjects.map((project) => (
              <CarouselItem
                key={project.id}
                className="basis-full md:basis-1/3 lg:basis-1/4 h-auto"
              >
                <div
                  className="p-1 h-full cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <ProjectCard
                    image={project.image}
                    title={project.title}
                    description={project.description}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-12 hidden md:flex" />
          <CarouselNext className="-right-12 hidden md:flex" />
          {/* Mobile controls */}
          <div className="flex justify-center gap-4 mt-4 md:hidden">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>

        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-2xl">
            {selectedProject && (
              <>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <DialogHeader>
                  <DialogTitle className="font-mono text-xl">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="font-mono text-sm">
                    {selectedProject.fullDescription}
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <h4 className="font-mono text-sm text-foreground mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      GitHub →
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
