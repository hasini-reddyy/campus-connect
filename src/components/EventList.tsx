import { LiveEvent } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ExternalLink, Radio } from "lucide-react";
import { format, isPast, isFuture, isToday } from "date-fns";

interface EventListProps {
  events: LiveEvent[];
}

export function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
        <Calendar className="mb-3 h-12 w-12 text-muted-foreground/50" />
        <h3 className="mb-1 font-display text-lg font-semibold text-foreground">No events yet</h3>
        <p className="text-sm text-muted-foreground">Add an upcoming event for your branch!</p>
      </div>
    );
  }

  const getEventStatus = (date: Date) => {
    const eventDate = new Date(date);
    if (isPast(eventDate) && !isToday(eventDate)) return "past";
    if (isToday(eventDate)) return "live";
    return "upcoming";
  };

  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedEvents.map((event) => {
        const status = getEventStatus(event.date);
        
        return (
          <Card key={event.id} className="overflow-hidden transition-all hover:shadow-card-hover">
            <CardContent className="p-0">
              <div className="flex">
                <div className={`flex w-24 flex-shrink-0 flex-col items-center justify-center p-4 text-center ${
                  status === "live" 
                    ? "bg-success/10 text-success" 
                    : status === "past" 
                    ? "bg-muted text-muted-foreground" 
                    : "bg-primary/10 text-primary"
                }`}>
                  <span className="text-2xl font-bold">
                    {format(new Date(event.date), "d")}
                  </span>
                  <span className="text-sm font-medium uppercase">
                    {format(new Date(event.date), "MMM")}
                  </span>
                  <span className="text-xs">
                    {format(new Date(event.date), "yyyy")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {event.title}
                    </h3>
                    {status === "live" && (
                      <Badge className="animate-pulse bg-success text-success-foreground">
                        <Radio className="mr-1 h-3 w-3" />
                        Live
                      </Badge>
                    )}
                    {status === "upcoming" && (
                      <Badge variant="outline" className="border-primary text-primary">
                        Upcoming
                      </Badge>
                    )}
                    {status === "past" && (
                      <Badge variant="secondary">
                        Past
                      </Badge>
                    )}
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {format(new Date(event.date), "h:mm a")}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {event.uploaderName}
                      </div>
                    </div>
                    {event.link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={event.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Join Event
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
