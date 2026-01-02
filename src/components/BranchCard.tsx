import { Link } from "react-router-dom";
import { Branch } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface BranchCardProps {
  branch: Branch;
}

export function BranchCard({ branch }: BranchCardProps) {
  return (
    <Link to={`/branch/${branch.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        <div className="relative h-36 overflow-hidden">
          <img
            src={branch.imageUrl}
            alt={branch.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-display text-lg font-bold text-white">
              {branch.name}
            </h3>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {branch.description}
          </p>
          <div className="flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
            View Resources
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
