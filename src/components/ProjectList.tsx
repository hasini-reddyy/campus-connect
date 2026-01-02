import { Project } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderGit2, User, Calendar, ExternalLink, Users } from "lucide-react";
import { format } from "date-fns";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
        <FolderGit2 className="mb-3 h-12 w-12 text-muted-foreground/50" />
        <h3 className="mb-1 font-display text-lg font-semibold text-foreground">No projects yet</h3>
        <p className="text-sm text-muted-foreground">Share your amazing project with the community!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <Card key={project.id} className="group overflow-hidden transition-all hover:shadow-card-hover">
          <CardContent className="p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <FolderGit2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <Badge variant="secondary">
                Project
              </Badge>
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold text-foreground line-clamp-1">
              {project.title}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {project.contributorName}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {project.uploaderName}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {format(new Date(project.createdAt), "MMM d, yyyy")}
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                View Project
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
