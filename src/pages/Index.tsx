import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
import { CollegeCard } from "@/components/CollegeCard";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Calendar, FolderGit2, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  const { colleges, videos, events, projects } = useData();
  const { user, signInWithGoogle, isDemoMode } = useAuth();

  const stats = [
    { icon: GraduationCap, label: "Colleges", value: colleges.length },
    { icon: BookOpen, label: "Videos", value: videos.length },
    { icon: Calendar, label: "Events", value: events.length },
    { icon: FolderGit2, label: "Projects", value: projects.length },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20" variant="secondary">
              <Sparkles className="mr-1.5 h-3 w-3" />
              Hackathon 2026 Project
            </Badge>
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Your Gateway to{" "}
              <span className="text-secondary">Campus Learning</span>
            </h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">
              Discover learning resources, live events, and student projects across 
              colleges and branches. Connect, learn, and grow together.
            </p>
            {!user && (
              <Button
                size="lg"
                onClick={signInWithGoogle}
                className="gap-2 bg-white text-primary hover:bg-white/90"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-background py-8">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-lg bg-muted/50 p-4 text-center transition-colors hover:bg-muted"
              >
                <stat.icon className="mb-2 h-6 w-6 text-primary" />
                <span className="font-display text-2xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section className="flex-1 py-12 md:py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="mb-2 font-display text-2xl font-bold text-foreground md:text-3xl">
              Explore Colleges
            </h2>
            <p className="text-muted-foreground">
              Browse enrolled colleges and discover their learning resources
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college, index) => (
              <div
                key={college.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CollegeCard college={college} />
              </div>
            ))}
          </div>

          {colleges.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
              <GraduationCap className="mb-4 h-16 w-16 text-muted-foreground/50" />
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                No colleges yet
              </h3>
              <p className="text-muted-foreground">
                Colleges will appear here once they're enrolled in the platform.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Demo Mode Notice */}
      {isDemoMode && (
        <section className="border-t border-border bg-secondary/10 py-8">
          <div className="container">
            <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-6 text-center">
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                🔧 Demo Mode Active
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                This app is running in demo mode with sample data. To enable real Firebase 
                authentication and database, add your Firebase configuration to the environment variables.
              </p>
              <code className="rounded bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID...
              </code>
            </div>
          </div>
        </section>
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default Index;
