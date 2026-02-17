import ImageWithLoader from "./ui/image-with-loader";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  status: "finished" | "in-dev";
  tags?: string[];
}

const ProjectCard = ({ image, title, description, status, tags }: ProjectCardProps) => {
  return (
    <div className="group h-full flex flex-col rounded-lg border border-dashed bg-card overflow-hidden transition-all hover:border-solid hover:border-primary hover:shadow-md">
      <div className="aspect-video overflow-hidden relative">
        <ImageWithLoader
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-mono rounded ${
            status === "finished"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground border border-border"
          }`}
        >
          {status === "finished" ? "Finished" : "In Development"}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-mono text-lg font-medium text-foreground line-clamp-1">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono rounded bg-accent text-accent-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
