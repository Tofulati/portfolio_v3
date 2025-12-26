import React, { useState } from 'react';
import { Home, Folder, MessageSquare, Moon, Sun, ExternalLink, Mail, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin, FaSpotify } from 'react-icons/fa'
import type { PortfolioData } from './types';
import Giscus from '@giscus/react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

// Portfolio Data - Replace with your actual information
const PORTFOLIO_DATA: PortfolioData = {
  name: "Albert Ho",
  tagline: "student | researcher | developer",
  current: "Currently studying Computer Science @ UC San Diego|",
  social: {
    github: "https://github.com/Tofulati",
    linkedin: "https://linkedin.com/in/albertho",
    spotify: "https://open.spotify.com/user/21cyyxrln6pmyazeu3dc2stfi?si=48ba0237113742d0",
    email: "albmtho@gmail.com"
  },
  experiences: [
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
      title: "GuitarMax",
      description: "Learn guitar in realtime with computer visual assistance",
      image: "/images/guitarmax.png",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/Tofulati/guitarmax",
      current: true
    },
    {
      title: "Stock-em",
      description: "Machine learning powered stock prediction and recommendation",
      image: "/images/stock-em.png",
      tech: ["Python", "TensorFlow", "React"],
      link: "https://github.com/Tofulati/stock-em",
      current: true
    },
    {
      title: "WebDevScan",
      description: "Battle and test your inspect element skills on simulated pages",
      image: "/images/webdevscan.png",
      tech: ["React", "TypeScript", "Storybook"],
      link: "https://github.com/Tofulati/webdevscav",
      current: true
    },
    {
      title: "MewsiCat",
      description: "Cats meet music, meet social media app",
      image: "/images/mewsicat.jpg",
      tech: ["React", "TypeScript", "Storybook"],
      link: "https://github.com/MewsiCat/react-native-app",
      current: false
    },
  ],
  allProjects: [
    {
      name: "GuitarMax",
      type: "Realtime Learning Guitar IOS Application",
      tech: ["Swift"],
      link: "https://github.com/Tofulati/guitarmax",
      dateAdded: "December 2025",
      image: "/images/guitarmax.png",
      current: true
    },
    {
      name: "Stock-em",
      type: "Full Stack Stock Prediction and Recommendation",
      tech: ["pytorch", "huggingface", "HTML/CSS/JS"],
      link: "https://github.com/Tofulati/stock-em",
      dateAdded: "October 2025 - Present",
      image: "/images/stock-em.png",
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
      dateAdded: "December 23, 2025",
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
  ]
};

type TabId = 'home' | 'projects' | 'discussions';

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
    { id: 'discussions', label: 'Discussions', icon: MessageSquare }
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-[#0d1117]' : 'bg-gray-100'
    } p-4 sm:p-8`}>
      <div className={`w-full max-w-6xl mx-auto rounded-xl shadow-2xl transition-all duration-300 border ${
        isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-white border-gray-300'
      }`}>
        {/* Safari Browser Chrome */}
        <div className={`transition-colors duration-300 ${
          isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-gray-200 border-gray-300'
        } border-b px-4 py-3`}>
          {/* Traffic Lights & Controls */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark 
                  ? 'bg-[#21262d] hover:bg-[#30363d] text-yellow-400' 
                  : 'bg-white hover:bg-gray-100 text-gray-700'
              }`}
              title={`Theme: ${theme}`}
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Address Bar */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
            isDark ? 'bg-[#0d1117] text-gray-400' : 'bg-white text-gray-600'
          }`}>
            <span className="text-sm">🔒</span>
            <span className="text-sm font-medium">Albert Ho's Webpage &gt;&gt; {activeTab}</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-3 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all duration-200 text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? isDark
                        ? 'bg-[#0d1117] text-white'
                        : 'bg-white text-gray-900'
                      : isDark
                        ? 'bg-[#0d1117]/50 text-gray-500 hover:bg-[#0d1117]/70'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`transition-colors duration-300 ${
            isDark ? 'bg-[#0d1117]' : 'bg-white'
          }`}
        >
          <div className="p-6 sm:p-10">
            {activeTab === 'home' && <HomePage isDark={isDark} />}
            {activeTab === 'projects' && <ProjectsPage isDark={isDark} />}
            {activeTab === 'discussions' && <DiscussionsPage isDark={isDark} />}
          </div>

          <Footer isDark={isDark} />
        </div>
      </div>
    </div>
  );
};

interface PageProps {
  isDark: boolean;
}

const HomePage: React.FC<PageProps> = ({ isDark }) => (
  <div className="space-y-12 animate-fadeIn">
    {/* Hero Section */}
    <div className={`rounded-xl overflow-hidden border transition-colors duration-300 ${
      isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-white border-gray-200'
    }`}>
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
            <div className={`w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 ${
              isDark ? 'border-[#0d1117]' : 'border-white'
            } shadow-xl`}>
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
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {PORTFOLIO_DATA.name}
              </h1>
              <p className={`text-lg sm:text-xl lg:text-2xl mt-1 font-medium transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-800'
              }`}>
                {PORTFOLIO_DATA.tagline}
              </p>
            </div>

            <div className={`flex items-center gap-2 text-sm lg:text-base transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-700'
            }`}>
              <span>{PORTFOLIO_DATA.current.split('|')[0]}</span>
              <img 
                src="/images/ucsd-logo.png" 
                alt="UCSD" 
                className="w-4 h-4 lg:w-5 lg:h-5"
              />
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a 
                href={PORTFOLIO_DATA.social.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`p-2.5 lg:p-3 rounded-lg transition-all duration-200 ${
                  isDark 
                    ? 'bg-[#21262d] hover:bg-[#30363d] text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]`}
              >
                <FaGithub size={20} className="lg:w-6 lg:h-6" />
              </a>
              <a 
                href={PORTFOLIO_DATA.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`p-2.5 lg:p-3 rounded-lg transition-all duration-200 ${
                  isDark 
                    ? 'bg-[#21262d] hover:bg-[#30363d] text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } hover:shadow-[0_0_20px_rgba(10,102,194,0.5)]`}
              >
                <FaLinkedin size={20} className="lg:w-6 lg:h-6" />
              </a>
              <a 
                href={PORTFOLIO_DATA.social.spotify} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`p-2.5 lg:p-3 rounded-lg transition-all duration-200 ${
                  isDark 
                    ? 'bg-[#21262d] hover:bg-[#30363d] text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } hover:shadow-[0_0_20px_rgba(30,215,96,0.5)]`}
              >
                <FaSpotify size={20} className="lg:w-6 lg:h-6" />
              </a>
              <a 
                href={`mailto:${PORTFOLIO_DATA.social.email}`} 
                className={`p-2.5 lg:p-3 rounded-lg transition-all duration-200 ${
                  isDark 
                    ? 'bg-[#21262d] hover:bg-[#30363d] text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } hover:shadow-[0_0_20px_rgba(234,67,53,0.5)]`}
              >
                <Mail size={20} className="lg:w-6 lg:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Experience Section */}
    <div>
      <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Experiences
      </h2>
      <div className="space-y-4">
        {PORTFOLIO_DATA.experiences.map((exp, idx) => (
          <div key={idx} className={`p-6 rounded-lg transition-all duration-300 border ${
            isDark ? 'bg-[#0d1117] border-[#30363d] hover:border-[#484f58]' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
          }`}>
            <div className="flex gap-4">
              {/* Company Logo Placeholder */}
              <div className={`w-12 h-12 rounded flex-shrink-0 flex items-center justify-center text-lg font-bold transition-colors duration-300 ${
                isDark ? 'bg-[#21262d] text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}>
                <img src={exp.image} alt={exp.title}></img>
              </div>
              
              {/* Experience Details */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {exp.title}
                </h3>
                <p className={`text-base transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  {exp.company}
                </p>
                <p className={`text-sm mt-1 transition-colors duration-300 ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {exp.period}
                </p>
                <p className={`mt-3 transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
                      isDark ? 'bg-[#21262d] text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Featured Projects */}
    <div>
      <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Featured Projects
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.featuredProjects.map((project, idx) => (
          <a key={idx} href={project.link} target="_blank" rel="noopener noreferrer"
             className={`group rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 border ${
               isDark ? 'bg-[#0d1117] border-[#30363d] hover:border-[#484f58]' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
             }`}>
            <div className="aspect-video overflow-hidden">
              <img src={project.image} alt={project.title} 
                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="p-4">
              <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {project.title}
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className={`text-sm mb-3 transition-colors duration-300 ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className={`px-2 py-1 text-xs rounded transition-colors duration-300 ${
                    isDark ? 'bg-[#21262d] text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
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
    <div
      className={`rounded-xl p-8 border transition-all duration-300 text-center relative overflow-hidden ${
        isDark
          ? 'bg-[#0d1117] border-[#30363d] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
          : 'bg-gray-50 border-gray-200 shadow-sm hover:shadow-lg'
      }`}
    >
      {/* Animated Blue Waves Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-full h-full">
          <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 animate-[wave1_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 animate-[wave2_10s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-30 animate-[wave3_12s_ease-in-out_infinite]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2
          className={`text-2xl font-semibold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Get in touch
        </h2>

        <p
          className={`mb-6 max-w-md mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Interested in collaborating, research, or just chatting?
        </p>

        <div className="flex justify-center">
          <a
            href={`mailto:${PORTFOLIO_DATA.social.email}`}
            className={`group relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 overflow-hidden ${
              isDark
                ? 'bg-[#21262d] hover:bg-blue-600 text-white'
                : 'bg-white hover:bg-blue-500 text-gray-800 hover:text-white'
            } hover:scale-[1.04]`}
          >
            <Mail size={18} className="transition-all duration-300 group-hover:translate-x-[200px] group-hover:opacity-0" />
            <Mail size={18} className="absolute left-6 transition-all duration-500 translate-x-[-200px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 z-10" />
            <span className="transition-opacity duration-300 group-hover:opacity-0">Lets connect</span>
            <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
              Send mail
            </span>
            <span className="inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-0">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsPage: React.FC<PageProps> = ({ isDark }) => (
  <div className="space-y-8 animate-fadeIn">
    <h1 className={`text-4xl font-bold transition-colors duration-300 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      Albert's File Explorer
    </h1>
    <div className={`rounded-lg overflow-hidden transition-colors duration-300 border ${
      isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-gray-50 border-gray-200'
    }`}>
      {/* Toolbar */}
      <div className={`px-4 py-3 border-b transition-colors duration-300 ${
        isDark ? 'border-[#30363d]' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <FileText size={20} className={isDark ? 'text-gray-500' : 'text-gray-600'} />
          <span className={`font-medium ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
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
            className={`group rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.01]
              flex sm:flex-row lg:flex-col ${
                isDark
                  ? 'bg-[#0d1117] border-[#30363d] hover:border-[#484f58]'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
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
                  <h3
                    className={`font-medium text-sm lg:text-base line-clamp-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {doc.name}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0"
                  />
                </div>

                {doc.dateAdded && (
                  <p className="text-xs text-gray-500 mb-2">
                    {doc.dateAdded}
                  </p>
                )}
              </div>

              <span
                className={`inline-block self-start px-2 py-1 text-xs rounded ${
                  isDark
                    ? 'bg-[#21262d] text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {doc.type}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>

    {/* Research Section */}
    <div className={`rounded-lg overflow-hidden transition-colors duration-300 border ${
      isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-gray-50 border-gray-200'
    }`}>
      {/* Toolbar */}
      <div className={`px-4 py-3 border-b transition-colors duration-300 ${
        isDark ? 'border-[#30363d]' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <FaMagnifyingGlass size={20} className={isDark ? 'text-gray-500' : 'text-gray-600'} />
          <span className={`font-medium ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
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
            className={`group rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.01]
              flex sm:flex-row lg:flex-col ${
                isDark
                  ? 'bg-[#0d1117] border-[#30363d] hover:border-[#484f58]'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
          >
            {/* Preview */}
            {item.image && (
              <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden lg:w-full lg:h-auto lg:aspect-video bg-gray-100 relative">
                {/* Status Dot - Positioned on Image */}
                <div className="absolute top-2 right-2 z-10">
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      item.current 
                        ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' 
                        : 'bg-gray-400 shadow-lg'
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
                  <h3
                    className={`font-medium text-sm lg:text-base line-clamp-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {item.name}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0"
                  />
                </div>

                {item.description && (
                  <p className={`text-xs mb-1 line-clamp-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                )}

                {item.dateAdded && (
                  <p className="text-xs text-gray-500 mb-2">
                    {item.dateAdded}
                  </p>
                )}
              </div>

              <span
                className={`inline-block self-start px-2 py-1 text-xs rounded ${
                  isDark
                    ? 'bg-[#21262d] text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {item.type}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>

    <div className={`rounded-lg overflow-hidden transition-colors duration-300 border ${
      isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-gray-50 border-gray-200'
    }`}>
      {/* Toolbar */}
      <div className={`px-4 py-3 border-b transition-colors duration-300 ${
        isDark ? 'border-[#30363d]' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <Folder size={20} className={isDark ? 'text-gray-500' : 'text-gray-600'} />
          <span className={`font-medium ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
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
            className={`group rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.01]
              flex sm:flex-row lg:flex-col ${
                isDark
                  ? 'bg-[#0d1117] border-[#30363d] hover:border-[#484f58]'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
          >
            {/* Image */}
            {project.image && (
              <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden lg:w-full lg:h-auto lg:aspect-video relative">
                {/* Status Dot - Positioned on Image */}
                <div className="absolute top-2 right-2 z-10">
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      project.current 
                        ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' 
                        : 'bg-gray-400 shadow-lg'
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
                  <h3 className={`font-medium text-sm lg:text-base line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.name}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0"
                  />
                </div>

                <p className={`text-xs mb-1 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.type}
                </p>

                {project.dateAdded && (
                  <p className="text-xs text-gray-500 mb-2">{project.dateAdded}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 text-xs rounded ${
                      isDark ? 'bg-[#21262d] text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}
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

const DiscussionsPage: React.FC<PageProps> = ({ isDark }) => (
  <div className="space-y-6 animate-fadeIn">
    <div>
      <h1 className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Discussions
      </h1>
      <p className={`text-lg transition-colors duration-300 ${
        isDark ? 'text-gray-500' : 'text-gray-600'
      }`}>
        Leave a comment or start a discussion below
      </p>
    </div>
    <div className="mt-6">
      <Giscus
        repo="Tofulati/portfolio_v3"
        repoId="R_kgDOQul_vw"
        category="General"
        categoryId="DIC_kwDOQul_v84C0OR1"
        mapping="pathname"
        reactionsEnabled='0'
        strict="0"
        emitMetadata="1"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </div>
  </div>
);

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`mt-9 border-t transition-colors duration-300 ${
        isDark
          ? 'border-[#30363d] bg-[#0d1117] text-gray-500'
          : 'border-gray-200 bg-gray-50 text-gray-600'
      }`}
    >
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
            className="hover:text-white transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={PORTFOLIO_DATA.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={PORTFOLIO_DATA.social.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaSpotify size={20} />
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.social.email}`}
            className="hover:text-white transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default App;