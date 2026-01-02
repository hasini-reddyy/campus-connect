import React, { createContext, useContext, useState, useEffect } from "react";
import { College, Branch, Video, LiveEvent, Project } from "@/types";
import { seedColleges, seedBranches, seedVideos, seedEvents, seedProjects } from "@/lib/seedData";
import { isDemoMode } from "@/lib/firebase";

interface DataContextType {
  colleges: College[];
  branches: Branch[];
  videos: Video[];
  events: LiveEvent[];
  projects: Project[];
  addVideo: (video: Omit<Video, "id" | "createdAt">) => void;
  addEvent: (event: Omit<LiveEvent, "id" | "createdAt">) => void;
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  getCollegeById: (id: string) => College | undefined;
  getBranchById: (id: string) => Branch | undefined;
  getBranchesByCollegeId: (collegeId: string) => Branch[];
  getVideosByBranchId: (branchId: string) => Video[];
  getEventsByBranchId: (branchId: string) => LiveEvent[];
  getProjectsByBranchId: (branchId: string) => Project[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [colleges] = useState<College[]>(seedColleges);
  const [branches] = useState<Branch[]>(seedBranches);
  const [videos, setVideos] = useState<Video[]>(seedVideos);
  const [events, setEvents] = useState<LiveEvent[]>(seedEvents);
  const [projects, setProjects] = useState<Project[]>(seedProjects);

  const addVideo = (video: Omit<Video, "id" | "createdAt">) => {
    const newVideo: Video = {
      ...video,
      id: `video-${Date.now()}`,
      createdAt: new Date(),
    };
    setVideos((prev) => [newVideo, ...prev]);
  };

  const addEvent = (event: Omit<LiveEvent, "id" | "createdAt">) => {
    const newEvent: LiveEvent = {
      ...event,
      id: `event-${Date.now()}`,
      createdAt: new Date(),
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const addProject = (project: Omit<Project, "id" | "createdAt">) => {
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
      createdAt: new Date(),
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const getCollegeById = (id: string) => colleges.find((c) => c.id === id);
  const getBranchById = (id: string) => branches.find((b) => b.id === id);
  const getBranchesByCollegeId = (collegeId: string) => branches.filter((b) => b.collegeId === collegeId);
  const getVideosByBranchId = (branchId: string) => videos.filter((v) => v.branchId === branchId);
  const getEventsByBranchId = (branchId: string) => events.filter((e) => e.branchId === branchId);
  const getProjectsByBranchId = (branchId: string) => projects.filter((p) => p.branchId === branchId);

  return (
    <DataContext.Provider
      value={{
        colleges,
        branches,
        videos,
        events,
        projects,
        addVideo,
        addEvent,
        addProject,
        getCollegeById,
        getBranchById,
        getBranchesByCollegeId,
        getVideosByBranchId,
        getEventsByBranchId,
        getProjectsByBranchId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
