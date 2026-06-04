import React, { useState } from 'react';
import { Home, Folder, BookOpen, Moon, Sun, ExternalLink, Mail, FileText, LayoutGrid, ArrowLeft, ChevronLeft, ChevronRight, RotateCw, Lock, Pin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import type { PortfolioData, InterestPin, BlogPost } from './types';
import { interestPins } from './data/interests';
import { blogPosts, blogTags } from './data/blog';
import { useInstagramEmbeds } from './hooks/useInstagramEmbeds';
import {
  instagramEmbedSrc,
  isInstagramPostUrl,
  normalizeInstagramPermalink,
} from './lib/instagram';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaMagnifyingGlass } from 'react-icons/fa6';

// Portfolio Data - Replace with your actual information
const PORTFOLIO_DATA: PortfolioData = {
  name: "Albert Ho",
  tagline: "student | researcher | developer",
  current: "Currently studying Computer Science @ UC San Diego|",
  social: {
    github: "https://github.com/Tofulati",
    linkedin: "https://linkedin.com/in/albertho",
    email: "albmtho@gmail.com"
  },
  experiences: [
    {
      title: "Frontend Engineer Intern",
      company: "Cadent",
      image: "/images/cadent.svg",
      period: "June 2026 - Present",
      description: "In progress...",
      skills: ["React"],
      current: true
    },
    {
      title: "Software Engineer Research Intern",
      company: "UCSD Health — Hojun Li Lab",
      image: "/images/ucsd-logo.png",
      period: "October 2024 - Present",
      description: "Engineered a scalable Python-based bioinformatics pipeline for parsing BAM alignment files from Oxford Nanopore’s Dorado platform, enabling efficient detection and quantification of A-to-I RNA editing events",
      skills: ["Bioinformatics", "Python", "Pandas", "R"],
      current: true
    },
    {
      title: "Data Science Intern",
      company: "Lawrence Livermore National Laboratory",
      image: "/images/llnl-logo.jpg",
      period: "July 2024 - August 2024",
      description: "Developed a production-ready machine learning pipeline for ventricular arrhythmia classification, benchmarking Logistic Regression, Random Forest, and deep learning models",
      skills: ["Python", "Pytorch", "scikit-learn", "Pandas"],
      current: false
    }
  ],
  featuredProjects: [
    {
      title: "WebDevScan",
      description: "Battle and test your inspect element skills on simulated pages",
      image: "/images/webdevscan.png",
      tech: ["React", "TypeScript", "Storybook"],
      link: "https://github.com/Tofulati/webdevscav",
      current: true
    },
    {
      title: "kumQAt",
      description: "Natural Language → Automated QA Testing with Real-Time Execution and AI Validation",
      image: "/images/kumQAt.png",
      tech: ["Next.js", "FastAPI", "Python", "SQLModel", "Gemini", "SSE"],
      link: "https://github.com/Tofulati/kumQAt",
      current: false
    },
    {
      title: "Hall Pass",
      description: "Reddit + Instagram + RateMyProf + Marketplace for Universities",
      image: "/images/HallPass.png",
      tech: ["ReactNative", "Firebase", "AWS s3", "Expo"],
      link: "https://github.com/Tofulati/hallpass",
      current: true
    },
  ],
  allProjects: [
    {
      name: "Personal Notes",
      type: "Web browser note taking application. Quick, actionable summaries and transcripts.",
      tech: ["python", "ollama"],
      link: "https://github.com/Tofulati/personalNotes",
      dateAdded: "May 2026",
      image: "/images/ucsd-logo.png",
      current: true
    },
    {
      name: "Drug Routing",
      type: "Path finding from Drugs -> Proteins -> Genes -> Diseases",
      tech: ["pytorch", "scikit-learn", "python"],
      link: "https://github.com/Tofulati/drug_routing",
      dateAdded: "April 2026",
      image: "/images/ucsd-logo.png",
      current: true
    },
    {
      name: "WebdevScan",
      type: "Train/Battle using inspect element",
      tech: ["HTML/CSS/JS", "MongoDB"],
      link: "https://github.com/Tofulati/webdevscav",
      dateAdded: "October 2025 - Present",
      image: "/images/webdevscan.png",
      current: true
    },
    {
      name: "kumQAt",
      type: "AI-Powered QA Automation Platform for Web Applications",
      tech: ["Next.js", "FastAPI", "Python", "SQLModel", "Gemini", "SSE"],
      link: "https://github.com/Tofulati/kumQAt",
      dateAdded: "April 2026",
      image: "/images/kumQAt.png",
      current: false
    },
    {
      name: "Hall Pass",
      type: "Everything Universities in One Social Media Mobile Application",
      tech: ["ReactNative", "Firebase", "AWS s3", "Expo"],
      link: "https://github.com/Tofulati/hallpass",
      dateAdded: "January 2026 - Present",
      image: "/images/HallPass.png",
      current: true
    },
    {
      name: "GuitarMax",
      type: "Realtime Learning Guitar IOS Application",
      tech: ["Swift"],
      link: "https://github.com/Tofulati/guitarmax",
      dateAdded: "December 2025 - Present",
      image: "/images/guitarmax.png",
      current: false
    },
    {
      name: "Stock-em",
      type: "Full Stack Stock Prediction and Recommendation",
      tech: ["pytorch", "huggingface", "HTML/CSS/JS"],
      link: "https://github.com/Tofulati/stock-em",
      dateAdded: "October 2025 - Present",
      image: "/images/stock-em.png",
      current: false
    },
    {
      name: "Mewsicat",
      type: "Cats + Music + Social Media Mobile App",
      tech: ["React Native", "Expo"],
      link: "https://github.com/MewsiCat/react-native-app",
      dateAdded: "November 2023 - May 2024",
      image: "/images/mewsicat.jpg",
      current: false
    },
    {
      name: "Earth Equity",
      type: "NASA Space App, Trend Prediciton Web Application",
      tech: ["React", "Python"],
      link: "https://github.com/hajin-park/Earth-Equity",
      dateAdded: "October 2023",
      image: "/images/earthequitylogo.svg",
      current: false
    }
  ],
  documents: [
    {
      name: "Albert Ho's Resume.pdf",
      type: "PDF Document",
      link: "/documents/AlbertHo.pdf",
      dateAdded: "April 16, 2026",
      image: "/images/AlbertHo.jpg"
    }
  ],
  research: [
    {
      name: "RNA Editing Detection Pipeline",
      type: "Bioinformatics Research",
      description: "Pipeline for A-to-I RNA editing",
      link: "https://www.hlilab.org/",
      dateAdded: "October 2024 - Present",
      image: "/images/ucsd-logo.png",
      current: true
    }, 
    {
      name: "Computational Methods for Gene Expression Programs",
      type: "Bioinformatics Research",
      description: "Validation of starCAT using gene expression programs",
      link: "/documents/Albert Ho - URS Hiestand - Final Product.pdf",
      dateAdded: "June 2024 - August 2024",
      image: "/images/ucsd-logo.png",
      current: false
    }, 
    {
      name: "Ventricular Arrhythmia Classification",
      type: "Machine Learning Research",
      description: "ML pipeline benchmarking for cardiac arrhythmia detection",
      link: "/documents/llnl-final.jpg",
      dateAdded: "July 2024 - August 2024",
      image: "/images/llnl-logo.jpg",
      current: false
    }
  ],
};

type TabId = 'home' | 'projects' | 'interests' | 'blog';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Initialize based on system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const tabs: Tab[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects & Files', icon: Folder },
    { id: 'interests', label: 'Board', icon: LayoutGrid },
    { id: 'blog', label: 'Blog', icon: BookOpen }
  ];

  const isDark = theme === 'dark';

  const tabUrl: Record<TabId, string> = {
    home: 'https://albertho.vercel.app/',
    projects: 'https://albertho.vercel.app/projects',
    interests: 'https://albertho.vercel.app/board',
    blog: 'https://albertho.vercel.app/blog',
  };

  return (
    <div
      className={`browser-backdrop min-h-screen transition-colors duration-300 p-4 sm:p-8 ${
        isDark ? 'theme-dark' : 'theme-light'
      }`}
    >
      <div className="browser-backdrop-wallpaper" aria-hidden />
      <div className="browser-window relative z-10 w-full max-w-6xl mx-auto rounded-xl transition-all duration-300 border overflow-hidden">
        {/* Browser chrome + tab strip */}
        <div
          className="browser-chrome select-none transition-colors duration-300"
          onDragStart={(e) => e.preventDefault()}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <div className="browser-traffic-lights flex items-center gap-2" draggable={false}>
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <button
              onClick={toggleTheme}
              type="button"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="browser-theme-toggle p-1.5 rounded-md transition-all duration-200"
              title={`Theme: ${theme}`}
            >
              {isDark ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>

          {/* Toolbar: nav + address bar */}
          <div className="flex items-center gap-2 px-4 pb-2">
            <div className="flex items-center gap-0.5 shrink-0">
              {[
                { Icon: ChevronLeft, label: 'Back' },
                { Icon: ChevronRight, label: 'Forward' },
                { Icon: RotateCw, label: 'Reload' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="browser-nav-btn p-1.5 rounded-md transition-colors"
                >
                  <Icon size={15} strokeWidth={2} />
                </button>
              ))}
            </div>

            <div
              className="browser-address-bar flex flex-1 min-w-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            >
              <Lock size={12} className="browser-lock shrink-0" strokeWidth={2.5} />
              <span className="truncate font-normal tracking-tight opacity-90">
                {tabUrl[activeTab]}
              </span>
            </div>
          </div>

          {/* Tab strip */}
          <div
            className="browser-tab-strip flex items-end gap-0.5 px-3"
            onDragStart={(e) => e.preventDefault()}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={() => setActiveTab(tab.id)}
                  className={`browser-tab group relative flex flex-1 min-w-0 items-center gap-2 max-w-[11rem] sm:max-w-[13rem] px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-t-lg -mb-px ${
                    isActive ? 'browser-tab-active z-10' : 'browser-tab-inactive'
                  }`}
                >
                  <span className="shrink-0 opacity-70">
                    <Icon size={14} />
                  </span>
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="browser-page transition-colors duration-300">
          <div className="p-6 sm:p-10">
            {activeTab === 'home' && <HomePage />}
            {activeTab === 'projects' && <ProjectsPage />}
            {activeTab === 'interests' && <InterestsPage isDark={isDark} />}
            {activeTab === 'blog' && <BlogPage />}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

interface PageProps {
  isDark?: boolean;
}

const HomePage: React.FC<PageProps> = () => (
  <div className="space-y-8 animate-fadeIn">
    {/* Hero Section */}
    <div className="rounded-xl overflow-hidden border transition-colors duration-300 t-card">
      {/* Banner Image */}
      <div 
        className="relative h-48 sm:h-64 w-full"
        style={{ 
          backgroundImage: "url('/images/background.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          opacity: 0.7
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </div>

      {/* Profile Content */}
      <div className="relative px-6 sm:px-8 pb-6">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 sm:items-start">
          {/* Profile Picture - Overlapping Banner */}
          <div className="relative -mt-16 sm:-mt-20 lg:-mt-24 flex-shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 t-profile-ring shadow-xl">
              <img
                src="/images/profile.jpg"
                alt="Albert Ho"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-3 lg:space-y-4 sm:-mt-16 lg:-mt-20">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300 t-text">
                {PORTFOLIO_DATA.name}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mt-1 font-medium transition-colors duration-300 t-text-secondary">
                {PORTFOLIO_DATA.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm lg:text-base transition-colors duration-300 t-text-muted">
              <span>{PORTFOLIO_DATA.current.split('|')[0]}</span>
              <img 
                src="/images/ucsd-logo.png" 
                alt="UCSD" 
                className="w-4 h-4 lg:w-5 lg:h-5"
              />
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
              <a 
                href={PORTFOLIO_DATA.social.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 lg:p-3 rounded-lg t-btn-ghost"
              >
                <FaGithub size={20} className="lg:w-6 lg:h-6" />
              </a>
              <a 
                href={PORTFOLIO_DATA.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 lg:p-3 rounded-lg t-btn-ghost"
              >
                <FaLinkedin size={20} className="lg:w-6 lg:h-6" />
              </a>
              <a 
                href={`mailto:${PORTFOLIO_DATA.social.email}`} 
                className="p-2.5 lg:p-3 rounded-lg t-btn-ghost"
              >
                <Mail size={20} className="lg:w-6 lg:h-6" />
              </a>
              <a 
                href="/documents/AlbertHo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume"
                className="flex items-center gap-2 p-2.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 shrink-0 t-btn-primary"
              >
                <FileText size={16} className="shrink-0" />
                <span className="hidden sm:inline">Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Experience Section */}
    <div>
      <h2 className="text-2xl font-bold mb-4 transition-colors duration-300 t-text">
        Experiences
      </h2>
      <div className="space-y-3">
        {PORTFOLIO_DATA.experiences.map((exp, idx) => (
          <div key={idx} className="p-4 sm:p-5 rounded-lg transition-all duration-300 border t-card-muted">
            <div className="flex gap-3 sm:gap-4">
              {/* Company Logo */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden border t-chip p-1.5">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-contain" />
              </div>
              
              {/* Experience Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-lg font-semibold leading-tight transition-colors duration-300 t-text">
                  {exp.title}
                </h3>
                <p className="text-sm transition-colors duration-300 t-text-muted">
                  {exp.company}
                </p>
                <p className="text-xs transition-colors duration-300 t-text-subtle">
                  {exp.period}
                </p>
                <p className="text-sm leading-relaxed pt-1 transition-colors duration-300 t-text-muted">
                  {exp.description}
                </p>
                {exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="t-chip px-2.5 py-0.5 text-xs rounded-full transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Featured Projects */}
    <div>
      <h2 className="text-3xl font-bold mb-6 transition-colors duration-300 t-text">
        Featured Projects
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.featuredProjects.map((project, idx) => (
          <a key={idx} href={project.link} target="_blank" rel="noopener noreferrer"
             className="group rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 border t-card-muted">
            <div className="aspect-video overflow-hidden">
              <img src={project.image} alt={project.title} 
                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 transition-colors duration-300 t-text">
                {project.title}
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm mb-3 transition-colors duration-300 t-text-subtle">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech, i) => (
                  <span key={i} className="t-chip px-2.5 py-0.5 text-xs rounded-full transition-colors duration-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>

    {/* Contact Section */}
    <div className="rounded-xl p-6 sm:p-8 border text-center transition-colors duration-300 t-featured">
      <h2 className="text-xl font-semibold mb-1.5 transition-colors duration-300 t-text">
        Get in touch
      </h2>
      <p className="text-sm mb-5 max-w-sm mx-auto transition-colors duration-300 t-text-muted">
        Open to collaborating, research, or a quick chat.
      </p>
      <a
        href={`mailto:${PORTFOLIO_DATA.social.email}`}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 t-btn-outline"
      >
        <Mail size={16} />
        Let&apos;s connect
      </a>
    </div>
  </div>
);

const ProjectsPage: React.FC<PageProps> = () => (
  <div className="space-y-8 animate-fadeIn">
    <h1 className="text-4xl font-bold transition-colors duration-300 t-text">
      Albert's File Explorer
    </h1>
    <div className="rounded-lg overflow-hidden transition-colors duration-300 border t-section">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b transition-colors duration-300 t-section-header">
        <div className="flex items-center gap-2">
          <FileText size={20} className="t-icon-muted" />
          <span className="font-medium t-text">
            Documents
          </span>
        </div>
      </div>

      {/* File List */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
        {PORTFOLIO_DATA.documents.map((doc, idx) => (
          <a
            key={idx}
            href={doc.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.01] flex sm:flex-row lg:flex-col t-list-item"
          >
            {/* Preview */}
            {doc.image && (
              <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden lg:w-full lg:h-auto lg:aspect-video">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between p-3 sm:p-4 ">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-sm lg:text-base line-clamp-2 t-text">
                    {doc.name}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="t-icon-link flex-shrink-0"
                  />
                </div>

                {doc.dateAdded && (
                  <p className="text-xs t-text-subtle mb-2">
                    {doc.dateAdded}
                  </p>
                )}
              </div>

              <span
                className="inline-block self-start t-chip px-2 py-1 text-xs rounded"
              >
                {doc.type}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>

    {/* Research Section */}
    <div className="rounded-lg overflow-hidden transition-colors duration-300 border t-section">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b transition-colors duration-300 t-section-header">
        <div className="flex items-center gap-2">
          <FaMagnifyingGlass size={20} className="t-icon-muted" />
          <span className="font-medium t-text">
            Research
          </span>
        </div>
      </div>

      {/* Research List */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
        {PORTFOLIO_DATA.research.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.01] flex sm:flex-row lg:flex-col t-list-item"
          >
            {/* Preview */}
            {item.image && (
              <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden lg:w-full lg:h-auto lg:aspect-video t-media-placeholder relative">
                {/* Status Dot - Positioned on Image */}
                <div className="absolute top-2 right-2 z-10">
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      item.current
                        ? 't-status-dot-active animate-pulse'
                        : 't-status-dot'
                    }`}
                    title={item.current ? 'Currently working on this' : 'Completed'}
                  />
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between p-3 sm:p-4">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-sm lg:text-base line-clamp-2 t-text">
                    {item.name}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="t-icon-link flex-shrink-0"
                  />
                </div>

                {item.description && (
                  <p className="text-xs mb-1 line-clamp-2 t-text-muted">
                    {item.description}
                  </p>
                )}

                {item.dateAdded && (
                  <p className="text-xs t-text-subtle mb-2">
                    {item.dateAdded}
                  </p>
                )}
              </div>

              <span
                className="inline-block self-start t-chip px-2 py-1 text-xs rounded"
              >
                {item.type}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>

    <div className="rounded-lg overflow-hidden transition-colors duration-300 border t-section">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b transition-colors duration-300 t-section-header">
        <div className="flex items-center gap-2">
          <Folder size={20} className="t-icon-muted" />
          <span className="font-medium t-text">
            Projects
          </span>
        </div>
      </div>

      {/* File List */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
        {PORTFOLIO_DATA.allProjects.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.01] flex sm:flex-row lg:flex-col t-list-item"
          >
            {/* Image */}
            {project.image && (
              <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden lg:w-full lg:h-auto lg:aspect-video relative">
                {/* Status Dot - Positioned on Image */}
                <div className="absolute top-2 right-2 z-10">
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      project.current
                        ? 't-status-dot-active animate-pulse'
                        : 't-status-dot'
                    }`}
                    title={project.current ? 'Currently working on this' : 'Completed'}
                  />
                </div>
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between p-3 sm:p-4">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-sm lg:text-base line-clamp-2 t-text">
                    {project.name}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="t-icon-link flex-shrink-0"
                  />
                </div>

                <p className="text-xs mb-1 line-clamp-2 t-text-muted">
                  {project.type}
                </p>

                {project.dateAdded && (
                  <p className="text-xs t-text-subtle mb-2">{project.dateAdded}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="t-chip px-2 py-1 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
);

const InterestsPage: React.FC<PageProps> = ({ isDark }) => {
  const allTags = Array.from(
    new Set(interestPins.flatMap((pin) => pin.tags))
  ).sort();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPins = activeTag
    ? interestPins.filter((pin) => pin.tags.includes(activeTag))
    : interestPins;

  const hasInstagramPins = filteredPins.some((pin) => pin.type === 'instagram');
  useInstagramEmbeds(hasInstagramPins, [filteredPins.map((p) => p.id).join(',')]);

  const PinCard = ({ pin }: { pin: InterestPin }) => {
    const isEmbeddable = pin.type === 'spotify' || pin.type === 'instagram';
    const Wrapper = pin.link && !isEmbeddable ? 'a' : 'div';
    const wrapperProps =
      pin.link && !isEmbeddable
        ? { href: pin.link, target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
      <Wrapper
        {...wrapperProps}
        className={`interests-pin group block rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] t-pin-card ${
          pin.type === 'instagram' ? 'interests-pin--instagram' : 'cursor-pointer'
        }`}
      >
        <div className="relative overflow-hidden">
          {pin.type === 'instagram' && pin.instagramUrl ? (
            isInstagramPostUrl(pin.instagramUrl) ? (
              <iframe
                src={instagramEmbedSrc(pin.instagramUrl)}
                title={pin.title}
                className="w-full border-0"
                style={{ minHeight: 480 }}
                scrolling="no"
                allow="encrypted-media"
                loading="lazy"
              />
            ) : (
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={normalizeInstagramPermalink(pin.instagramUrl)}
                data-instgrm-version="14"
                style={{
                  background: 'transparent',
                  border: 0,
                  margin: 0,
                  maxWidth: '100%',
                  minWidth: 0,
                  width: '100%',
                  padding: 0,
                }}
              />
            )
          ) : pin.type === 'spotify' && pin.embedUrl ? (
            <iframe
              src={pin.embedUrl}
              title={pin.title}
              className="w-full"
              height={352}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : pin.type === 'video' ? (
            pin.videoUrl ? (
              <iframe
                src={pin.videoUrl}
                title={pin.title}
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={pin.mediaUrl}
                className="w-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
            )
          ) : (
            <img
              src={pin.mediaUrl}
              alt={pin.title}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                pin.type === 'link' ? 'aspect-square' : ''
              }`}
              loading="lazy"
            />
          )}
          {!isEmbeddable && (
            <div
              className={`absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t pointer-events-none ${
                isDark ? 'from-black/90 via-black/50' : 'from-black/80 via-black/40'
              } to-transparent`}
            >
              <h3 className="text-white font-semibold text-base">{pin.title}</h3>
              {pin.description && (
                <p className="text-white/85 text-sm mt-1 line-clamp-2">{pin.description}</p>
              )}
              {pin.link && (
                <span className="inline-flex items-center gap-1 text-white/70 text-xs mt-2">
                  <ExternalLink size={12} />
                  Open
                </span>
              )}
            </div>
          )}
        </div>
        <div className="px-3 py-2.5 sm:hidden t-card">
          <p className="font-medium text-sm t-text">
            {pin.title}
          </p>
        </div>
      </Wrapper>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn -mx-2 sm:mx-0">
      <div className="px-2 sm:px-0">
        <h1 className="text-4xl font-bold mb-1 transition-colors duration-300 t-text">
          Board
        </h1>
        <p className="text-lg transition-colors duration-300 t-text-subtle">
          Interests, photos, videos, and things I enjoy outside of work.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 px-2 sm:px-0">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTag === null ? 't-tag-active' : 't-tag'
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
              activeTag === tag ? 't-tag-active' : 't-tag'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="interests-masonry columns-2 sm:columns-3 lg:columns-4 px-2 sm:px-0">
        {filteredPins.map((pin) => (
          <PinCard key={pin.id} pin={pin} />
        ))}
      </div>

      {filteredPins.length === 0 && (
        <p className="text-center py-12 t-text-subtle">
          No pins in this category yet.
        </p>
      )}
    </div>
  );
};

const BlogPage: React.FC = () => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const selectedPost = blogPosts.find((p) => p.slug === selectedSlug) ?? null;

  const filteredPosts =
    activeTag === null
      ? blogPosts
      : blogPosts.filter((post) => post.tags.includes(activeTag));

  if (selectedPost) {
    return (
      <BlogPostView
        post={selectedPost}
        onBack={() => setSelectedSlug(null)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-4xl font-bold mb-2 transition-colors duration-300 t-text">
          Blog
        </h1>
        <p className="text-lg transition-colors duration-300 t-text-subtle">
          Notes, write-ups, and longer thoughts
        </p>
      </div>

      {blogTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTag === null ? 't-tag-active' : 't-tag'
            }`}
          >
            All
          </button>
          {blogTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                activeTag === tag ? 't-tag-active' : 't-tag'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {blogPosts.length === 0 ? (
        <p className="text-center py-12 t-text-subtle">
          No posts yet — add markdown files to the <code className="text-sm">blog/</code> directory.
        </p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center py-12 t-text-subtle">
          No posts with this tag yet.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <button
              key={post.slug}
              onClick={() => setSelectedSlug(post.slug)}
              className="w-full text-left rounded-xl border p-5 transition-all duration-200 t-card-muted"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  {post.pinned && (
                    <Pin
                      size={16}
                      className="shrink-0 t-text-subtle"
                      aria-label="Pinned post"
                    />
                  )}
                  <h2 className="text-xl font-semibold t-text">
                    {post.title}
                  </h2>
                </div>
                {post.date && (
                  <time
                    dateTime={post.date}
                    className="text-sm whitespace-nowrap t-text-subtle"
                  >
                    {formatBlogDate(post.date)}
                  </time>
                )}
              </div>
              {post.excerpt && (
                <p className="text-base t-text-muted mb-3">
                  {post.excerpt}
                </p>
              )}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="t-chip px-2.5 py-0.5 text-xs rounded-full capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack }) => (
  <div className="space-y-6 animate-fadeIn">
    <button
      onClick={onBack}
      className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 t-link"
    >
      <ArrowLeft size={16} />
      Back to blog
    </button>

    <header className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {post.pinned && (
          <span className="inline-flex items-center gap-1 t-chip px-2.5 py-0.5 text-xs rounded-full">
            <Pin size={12} aria-hidden />
            Pinned
          </span>
        )}
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="t-chip px-2.5 py-0.5 text-xs rounded-full capitalize"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-4xl font-bold t-text">
        {post.title}
      </h1>
      {post.date && (
        <time
          dateTime={post.date}
          className="text-sm t-text-subtle"
        >
          {formatBlogDate(post.date)}
        </time>
      )}
    </header>

    <article className="blog-prose">
      <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
    </article>
  </div>
);

function formatBlogDate(isoDate: string): string {
  const parsed = new Date(isoDate + 'T00:00:00');
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-9 transition-colors duration-300 t-footer">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <p className="text-sm">
          © {year} <span className="font-medium">{PORTFOLIO_DATA.name}</span>. All rights reserved.
        </p>

        {/* Right: Logos */}
        <div className="flex items-center gap-4">
          <a
            href={PORTFOLIO_DATA.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="t-link transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={PORTFOLIO_DATA.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="t-link transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.social.email}`}
            className="t-link transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default App;