import profileJson from "@/content/profile.json";

export type ExperienceItem = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
};

export type EducationItem = {
  school: string;
  credential: string;
  start: string;
  end: string;
  details: string[];
};

export type Profile = {
  navInitials: string;
  name: string;
  role: string;
  location: string;
  headline: string;
  about: string;
  email: string;
  linkedin: string;
  githubUsername: string;
  pinnedRepoNames: string[];
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
};

export const profile: Profile = profileJson;
