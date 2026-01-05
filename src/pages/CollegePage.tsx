import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
import { BranchCard } from "@/components/BranchCard";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, MapPin, Building2, BookOpen } from "lucide-react";

const CollegePage = () => {
  const { collegeId } = useParams<{ collegeId: string }>();
  const { getCollegeById, getBranchesByCollegeId, getVideosByBranchId, getEventsByBranchId, getProjectsByBranchId } = useData();

  const college = getCollegeById(collegeId || "");
  const branches = getBranchesByCollegeId(collegeId || "");

  if (!college) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container flex flex-1 flex-col items-center justify-center py-16">
          <h1 className="mb-4 font-display text-2xl font-bold text-foreground">
            College Not Found
          </h1>
          <p className="mb-6 text-muted-foreground">
            The college you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  // Calculate totals
  const totalVideos = branches.reduce((acc, branch) => acc + getVideosByBranchId(branch.id).length, 0);
  const totalEvents = branches.reduce((acc, branch) => acc + getEventsByBranchId(branch.id).length, 0);
  const totalProjects = branches.reduce((acc, branch) => acc + getProjectsByBranchId(branch.id).length, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={college.imageUrl}
            alt={college.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30" />
        </div>
        <div className="container relative py-16 md:py-24">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link to="/">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Colleges
            </Link>
          </Button>
          
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <Badge className="bg-white/10 text-white hover:bg-white/20">
                <MapPin className="mr-1 h-3 w-3" />
                {college.location}
              </Badge>
            </div>
            <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {college.name}
            </h1>
            <p className="text-lg text-white/80">
              {college.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border bg-background py-4">
        <div className="container">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{branches.length}</span>
              <span className="text-muted-foreground">Branches</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{totalVideos}</span>
              <span className="text-muted-foreground">Videos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{totalEvents}</span>
              <span className="text-muted-foreground">Events</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{totalProjects}</span>
              <span className="text-muted-foreground">Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
              Branches
            </h2>
            <p className="text-muted-foreground">
              Select a branch to explore its learning resources, events, and projects
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch, index) => (
              <div
                key={branch.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BranchCard branch={branch} />
              </div>
            ))}
          </div>

          {branches.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
              <Building2 className="mb-4 h-16 w-16 text-muted-foreground/50" />
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                No branches yet
              </h3>
              <p className="text-muted-foreground">
                Branches will appear here once they're added to this college.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default CollegePage;
