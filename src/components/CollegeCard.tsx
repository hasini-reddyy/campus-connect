import { Link } from "react-router-dom";
import { College } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Building2 } from "lucide-react";

interface CollegeCardProps {
  college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Link to={`/college/${college.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={college.imageUrl}
            alt={college.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge variant="secondary" className="mb-2 bg-secondary/90 text-secondary-foreground">
              <Building2 className="mr-1 h-3 w-3" />
              {college.branches.length} Branches
            </Badge>
            <h3 className="font-display text-xl font-bold text-white line-clamp-1">
              {college.name}
            </h3>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {college.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {college.location}
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
              Explore
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
