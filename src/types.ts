export interface Experience {
  title: string;
  company: string;
  image: string;
  period: string;
  description: string;
  skills: string[];
  current: boolean;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  current: boolean;
}

export interface SimpleProject {
  name: string;
  type: string;
  tech: string[];
  link: string;
  dateAdded: string;
  image: string;
  current: boolean;
}

export interface SimpleDoc {
  name: string;
  type: string;
  link: string;
  dateAdded: string;
  image: string;
}

export interface SimpleResearch {
  name: string;
  type: string;
  description: string;
  link: string;
  dateAdded: string;
  image: string;
  current: boolean;
}

export interface PortfolioData {
  name: string;
  tagline: string;
  current: string,
  social: {
    github: string;
    linkedin: string;
    spotify: string;
    email: string;
  };
  experiences: Experience[];
  featuredProjects: Project[];
  allProjects: SimpleProject[];
  documents: SimpleDoc[];
  research: SimpleResearch[];
}