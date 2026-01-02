export interface College {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  branches: string[];
  createdAt: Date;
}

export interface Branch {
  id: string;
  name: string;
  description: string;
  collegeId: string;
  imageUrl: string;
  createdAt: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  branchId: string;
  uploaderId: string;
  uploaderName: string;
  createdAt: Date;
}

export interface LiveEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  link?: string;
  branchId: string;
  uploaderId: string;
  uploaderName: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  branchId: string;
  contributorName: string;
  uploaderId: string;
  uploaderName: string;
  createdAt: Date;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
