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
import FullscreenImage from "./ui/fullscreen-image";
import { useState } from "react";

interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  status: "finished" | "in-dev";
  github?: string;
  live?: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    image: "/novaworks.png",
    title: "NovaWorks Ecommerce",
    description: "Ecommerce platform for a 3D printing business with custom quotation for user-uploaded 3D parts.",
    fullDescription: "Ecommerce platform for a 3D printing business. Developed entirely by myself. Features include a full ecommerce website with custom quotation for user-uploaded 3D parts, admin dashboard for products, categories, analytics, and order status, and Romanian/English localization.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Next.js", "TailwindCSS", "TanStack Query", "shadcn"],
    status: "in-dev",
    live: "https://novaworks.ro/",
  },
  {
    id: 2,
    image: "/medis.png",
    title: "MEDIS",
    description: "Medical conference app with ticket sales, workshop allocation, and QR code presence tracking.",
    fullDescription: "Medical conference app. Collaborated with a freelance associate, handling backend and API. Features include ticket sales with EuPlatesc payment integration, workshop allocation for attendees, and user presence tracking with QR code scanning.",
    technologies: ["Java", "Spring Boot", "PostgreSQL"],
    status: "finished",
    live: "https://medistm.ro",
  },
  {
    id: 3,
    image: "/nuvio.png",
    title: "Nuvio",
    description: "Scheduling app for barbershops, clinics, and service businesses.",
    fullDescription: "Scheduling app for barbershops, clinics, and service businesses. Contributed to backend and API using Supabase and edge functions in Node.js. Built for Dot Koda Dev.",
    technologies: ["Node.js", "Supabase", "Edge Functions"],
    status: "finished",
    live: "https://nuvio.ro",
  },
  {
    id: 4,
    image: "/exa.jpeg",
    title: "Exa Gym",
    description: "Gym membership app for the Gym One franchise.",
    fullDescription: "Gym membership app for Gym One franchise. Contributed to backend and API using Java, Spring Boot, PostgreSQL. Built for Dot Koda Dev.",
    technologies: ["Java", "Spring Boot", "PostgreSQL"],
    status: "finished",
    live: "https://exahealth.ro/",
  },
  {
    id: 5,
    image: "/lagrange.png",
    title: "Lagrange Engineering",
    description: "Corporate website for my freelance web development company.",
    fullDescription: "The official website for Lagrange Engineering, my freelance web development company. Features a modern design showcasing services, portfolio, and contact information for potential clients.",
    technologies: ["Next.js", "React", "TailwindCSS"],
    status: "finished",
    live: "https://www.lagrangeengineering.ro/ro",
  },
  {
    id: 6,
    image: "/corox.png",
    title: "Corox Engineering",
    description: "Corporate website for an industrial automation and machine safety company.",
    fullDescription: "Complete corporate website for Corox Engineering, a company specializing in industrial automation, Machine Safety, risk assessments, and integrated technical systems. Features responsive design, contact forms, service showcase, and professional branding. The website serves clients across Romania with European-quality professional services.",
    technologies: ["Next.js", "React", "TailwindCSS", "SSG"],
    status: "finished",
    live: "https://coroxengineering.ro",
  },
  {
    id: 7,
    image: "/dkat.png",
    title: "D-KAT Tour",
    description: "Showcase website for exclusive supercar and exotic vehicle experiences.",
    fullDescription: "Elegant showcase website for D-KAT Tour, a company organizing exclusive automotive experiences with supercars and exotic vehicles. The platform showcases the available vehicle fleet, including Porsche 911 Turbo S, Lamborghini Huracán, Ferrari SF90, and Rolls-Royce Dawn. Features include photo gallery, partnership system, registration page, and contact section. The design reflects the brand's premium positioning, targeting automotive enthusiasts and clients interested in luxury experiences.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
    status: "finished",
    live: "http://d-kat.com/",
  },
  {
    id: 8,
    image: "/hazard.png",
    title: "Hazzard Studio",
    description: "Professional website for a modern barbershop in Timișoara.",
    fullDescription: "Professional website for Hazzard Studio, a modern barbershop in Timișoara. The platform includes service presentation for haircuts, beard and mustache grooming, photo gallery of completed work, barber profiles, operating hours, and mobile app integration for bookings. The modern and clean design reflects the brand identity, with a focus on user experience and new client conversion.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
    status: "finished",
    live: "http://hazzardstudio.ro/",
  },
  {
    id: 9,
    image: "/cumcomunic.png",
    title: "Cum Comunic",
    description: "Relational counseling website for the ESPERE Method.",
    fullDescription: "Professional website for Liliana Enculescu, a relational counselor and accredited trainer in the ESPERE Method, with over 20 years of experience and 13,000+ clients. The platform presents counseling services for couple relationships, parent-child dynamics, workplace relationships, educator-student relations, healthcare professional-patient communication, and self-relationship. Includes sections for testimonials, FAQ, consultation booking, and detailed presentation of the ESPERE methodology.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "React", "SEO"],
    status: "finished",
    live: "http://cumcomunic.ro/",
  },
  {
    id: 10,
    image: "/cliniva.png",
    title: "Cliniva",
    description: "Medical center website for recovery and wellness services.",
    fullDescription: "Complete website for Cliniva, a modern medical recovery and wellness center in Timișoara, with a tradition dating back to 1993. The platform showcases the full range of medical services: orthopedics, physical therapy (TECAR therapy, laser, ultrasound, magnetotherapy), kinesiotherapy, chiropractic, therapeutic massage, internal medicine, and psychology. Includes medical team profiles, patient testimonials, online booking system, and CNAS insurance coverage information.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "React", "SEO"],
    status: "finished",
    live: "http://cliniva.ro/",
  },
  {
    id: 11,
    image: "/mechafusion.png",
    title: "Mechafusion UPT",
    description: "Official website for the robotics club of Politehnica University Timișoara.",
    fullDescription: "Modern and engaging website for Mechafusion, the official robotics club of Universitatea Politehnica Timișoara. Features include project showcases, member profiles, event announcements, competition results, and recruitment information. Built with a focus on showcasing innovative robotics projects and fostering community engagement among engineering students.",
    technologies: ["HTML", "JavaScript", "TailwindCSS", "AWS S3", "Cloudflare"],
    status: "finished",
    live: "https://www.clubrobotica.upt.ro/",
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionWrapper>
      <div className="py-12 px-4 md:px-16">
        <div className="mb-12">
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
                    status={project.status}
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
                <FullscreenImage
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full aspect-video rounded-lg overflow-hidden"
                />
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <DialogTitle className="font-mono text-xl">
                      {selectedProject.title}
                    </DialogTitle>
                    <span
                      className={`px-2 py-1 text-xs font-mono rounded ${
                        selectedProject.status === "finished"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {selectedProject.status === "finished" ? "Finished" : "In Development"}
                    </span>
                  </div>
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
                {selectedProject.live && (
                  <div className="flex gap-4">
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Link →
                    </a>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
