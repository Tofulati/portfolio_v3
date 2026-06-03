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

export interface InterestPin {
  id: string;
  title: string;
  description?: string;
  type: 'image' | 'video' | 'link' | 'spotify' | 'instagram';
  mediaUrl: string;
  link?: string;
  videoUrl?: string;
  embedUrl?: string;
  /** Post or profile permalink for type `instagram` */
  instagramUrl?: string;
  tags: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface PortfolioData {
  name: string;
  tagline: string;
  current: string,
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
  experiences: Experience[];
  featuredProjects: Project[];
  allProjects: SimpleProject[];
  documents: SimpleDoc[];
  research: SimpleResearch[];
}