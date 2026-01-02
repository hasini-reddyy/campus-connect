import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoList } from "@/components/VideoList";
import { EventList } from "@/components/EventList";
import { ProjectList } from "@/components/ProjectList";
import { AddContentDialog } from "@/components/AddContentDialog";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, PlayCircle, Calendar, FolderGit2, Building2 } from "lucide-react";

const BranchPage = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const { 
    getBranchById, 
    getCollegeById, 
    getVideosByBranchId, 
    getEventsByBranchId, 
    getProjectsByBranchId 
  } = useData();

  const branch = getBranchById(branchId || "");
  const college = branch ? getCollegeById(branch.collegeId) : undefined;
  const videos = getVideosByBranchId(branchId || "");
  const events = getEventsByBranchId(branchId || "");
  const projects = getProjectsByBranchId(branchId || "");

  if (!branch || !college) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container flex flex-1 flex-col items-center justify-center py-16">
          <h1 className="mb-4 font-display text-2xl font-bold text-foreground">
            Branch Not Found
          </h1>
          <p className="mb-6 text-muted-foreground">
            The branch you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={branch.imageUrl}
            alt={branch.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30" />
        </div>
        <div className="container relative py-12 md:py-20">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link to={`/college/${college.id}`}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to {college.name}
            </Link>
          </Button>
          
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <Badge className="bg-white/10 text-white hover:bg-white/20">
                <Building2 className="mr-1 h-3 w-3" />
                {college.name}
              </Badge>
            </div>
            <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
              {branch.name}
            </h1>
            <p className="text-lg text-white/80">
              {branch.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="flex-1 py-8 md:py-12">
        <div className="container">
          <Tabs defaultValue="videos" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="videos" className="gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Videos
                  <Badge variant="secondary" className="ml-1">
                    {videos.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="events" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Events
                  <Badge variant="secondary" className="ml-1">
                    {events.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="projects" className="gap-2">
                  <FolderGit2 className="h-4 w-4" />
                  Projects
                  <Badge variant="secondary" className="ml-1">
                    {projects.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="videos" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Learning Videos
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Watch educational content for {branch.name}
                  </p>
                </div>
                <AddContentDialog branchId={branch.id} type="video" />
              </div>
              <VideoList videos={videos} />
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Live Events
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Upcoming and past events in {branch.name}
                  </p>
                </div>
                <AddContentDialog branchId={branch.id} type="event" />
              </div>
              <EventList events={events} />
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Student Projects
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Explore projects created by students in {branch.name}
                  </p>
                </div>
                <AddContentDialog branchId={branch.id} type="project" />
              </div>
              <ProjectList projects={projects} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BranchPage;
