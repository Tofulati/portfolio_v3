export interface Experience {
  title: string;
  company: string;
  image: string;
  period: string;
  description: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
}

export interface SimpleProject {
  name: string;
  type: string;
  tech: string[];
  link: string;
}

export interface SimpleDoc {
  name: string;
  type: string;
  link: string;
}

export interface PortfolioData {
  name: string;
  tagline: string;
  bio: string;
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
}