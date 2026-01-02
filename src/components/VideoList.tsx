import { Video } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, User, Calendar } from "lucide-react";
import { format } from "date-fns";

interface VideoListProps {
  videos: Video[];
}

export function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
        <PlayCircle className="mb-3 h-12 w-12 text-muted-foreground/50" />
        <h3 className="mb-1 font-display text-lg font-semibold text-foreground">No videos yet</h3>
        <p className="text-sm text-muted-foreground">Be the first to add a learning video!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden transition-all hover:shadow-card-hover">
          <div className="flex flex-col md:flex-row">
            <div className="relative aspect-video w-full md:w-80 flex-shrink-0">
              <iframe
                src={video.url}
                title={video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
                  {video.title}
                </h3>
                <Badge variant="outline" className="shrink-0">
                  <PlayCircle className="mr-1 h-3 w-3" />
                  Video
                </Badge>
              </div>
              <p className="mb-auto text-sm text-muted-foreground line-clamp-2">
                {video.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {video.uploaderName}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(new Date(video.createdAt), "MMM d, yyyy")}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
