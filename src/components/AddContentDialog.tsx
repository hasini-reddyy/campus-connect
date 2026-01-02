import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, PlayCircle, Calendar, FolderGit2, Lock } from "lucide-react";

interface AddContentDialogProps {
  branchId: string;
  type: "video" | "event" | "project";
}

export function AddContentDialog({ branchId, type }: AddContentDialogProps) {
  const { user } = useAuth();
  const { addVideo, addEvent, addProject } = useData();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    date: "",
    time: "",
    link: "",
    contributorName: "",
  });

  const icons = {
    video: PlayCircle,
    event: Calendar,
    project: FolderGit2,
  };

  const titles = {
    video: "Add Learning Video",
    event: "Add Live Event",
    project: "Add Project",
  };

  const Icon = icons[type];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      if (type === "video") {
        // Convert YouTube URL to embed format
        let embedUrl = formData.url;
        if (embedUrl.includes("youtube.com/watch?v=")) {
          const videoId = embedUrl.split("v=")[1]?.split("&")[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (embedUrl.includes("youtu.be/")) {
          const videoId = embedUrl.split("youtu.be/")[1]?.split("?")[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }

        addVideo({
          title: formData.title,
          description: formData.description,
          url: embedUrl,
          branchId,
          uploaderId: user.uid,
          uploaderName: user.displayName || user.email || "Anonymous",
        });
      } else if (type === "event") {
        const eventDate = new Date(`${formData.date}T${formData.time || "00:00"}`);
        addEvent({
          title: formData.title,
          description: formData.description,
          date: eventDate,
          link: formData.link || undefined,
          branchId,
          uploaderId: user.uid,
          uploaderName: user.displayName || user.email || "Anonymous",
        });
      } else if (type === "project") {
        addProject({
          title: formData.title,
          description: formData.description,
          url: formData.url,
          contributorName: formData.contributorName,
          branchId,
          uploaderId: user.uid,
          uploaderName: user.displayName || user.email || "Anonymous",
        });
      }

      toast({
        title: "Success!",
        description: `Your ${type} has been added successfully.`,
      });

      setFormData({
        title: "",
        description: "",
        url: "",
        date: "",
        time: "",
        link: "",
        contributorName: "",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add ${type}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Button variant="outline" disabled className="gap-2">
        <Lock className="h-4 w-4" />
        Sign in to add {type}
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Icon className="h-5 w-5 text-primary" />
            {titles[type]}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new {type}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={`Enter ${type} title`}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={`Describe your ${type}`}
                rows={3}
                required
              />
            </div>

            {type === "video" && (
              <div className="space-y-2">
                <Label htmlFor="url">YouTube URL *</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
              </div>
            )}

            {type === "event" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Event Link (optional)</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </>
            )}

            {type === "project" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="url">Project URL *</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://github.com/..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contributorName">Contributor/Team Name *</Label>
                  <Input
                    id="contributorName"
                    value={formData.contributorName}
                    onChange={(e) => setFormData({ ...formData, contributorName: e.target.value })}
                    placeholder="Team name or your name"
                    required
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
