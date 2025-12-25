import React, { useState, useEffect } from 'react';
import { Home, Folder, MessageSquare, Moon, Sun, ExternalLink, Mail, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin, FaSpotify } from 'react-icons/fa'
import type { PortfolioData } from './types';
import Giscus from '@giscus/react';

// Portfolio Data - Replace with your actual information
const PORTFOLIO_DATA: PortfolioData = {
  name: "Albert Ho",
  tagline: "student | researcher | developer",
  bio: "Always building and innovating new applications.",
  current: "Currently studying BSc & MSc in Computer Science @ UC San Diego|",
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
      skills: ["Bioinformatics", "Python", "Pandas", "R"]
    },
    {
      title: "Data Science Intern",
      company: "Lawrence Livermore National Laboratory",
      image: "/images/llnl-logo.jpg",
      period: "July 2024 - August 2024",
      description: "Developed a production-ready machine learning pipeline for ventricular arrhythmia classification, benchmarking Logistic Regression, Random Forest, and deep learning models",
      skills: ["Python", "Pytorch", "scikit-learn", "Pandas"]
    }
  ],
  featuredProjects: [
    {
      title: "GuitarMax",
      description: "Learn guitar in realtime with computer visual assistance",
      image: "/images/guitarmax.png",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/Tofulati/guitarmax"
    },
    {
      title: "Stock-em",
      description: "Machine learning powered stock prediction and recommendation",
      image: "/images/stock-em.png",
      tech: ["Python", "TensorFlow", "React"],
      link: "https://github.com/Tofulati/stock-em"
    },
    {
      title: "WebDevScan",
      description: "Battle and test your inspect element skills on simulated pages",
      image: "/images/webdevscan.png",
      tech: ["React", "TypeScript", "Storybook"],
      link: "https://github.com/Tofulati/webdevscav"
    },
    {
      title: "MewsiCat",
      description: "Cats meet music, meet social media app",
      image: "/images/mewsicat.jpg",
      tech: ["React", "TypeScript", "Storybook"],
      link: "https://github.com/MewsiCat/react-native-app"
    },
  ],
  allProjects: [
    {
      name: "GuitarMax",
      type: "Realtime Learning Guitar IOS Application",
      tech: ["Swift"],
      link: "https://github.com/Tofulati/guitarmax"
    },
    {
      name: "Stock-em",
      type: "Full Stack Stock Prediction and Recommendation",
      tech: ["pytorch", "huggingface", "HTML/CSS/JS"],
      link: "https://github.com/Tofulati/stock-em"
    },
    {
      name: "WebdevScan",
      type: "Train/Battle using inspect element",
      tech: ["HTML/CSS/JS", "MongoDB"],
      link: "https://github.com/Tofulati/webdevscav"
    },
    {
      name: "Mewsicat",
      type: "Cats + Music + Social Media Mobile App",
      tech: ["React Native", "Expo"],
      link: "https://github.com/MewsiCat/react-native-app"
    },
    {
      name: "Earth Equity",
      type: "NASA Space App, Trend Prediciton Web Application",
      tech: ["React", "Python"],
      link: "https://github.com/hajin-park/Earth-Equity"
    }
  ],

  documents: [
    {
      name: "Albert Ho's Resume.pdf",
      type: "PDF Document",
      link: "/documents/AlbertHo.pdf"
    }, 
    {
      name: "LLNL Final Poster",
      type: "JPG Image",
      link: "/documents/llnl-final.jpg"
    }
  ]
};

type Theme = 'system' | 'light' | 'dark';
type TabId = 'home' | 'projects' | 'discussions';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [theme, setTheme] = useState<Theme>('system');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setActualTheme(prefersDark ? 'dark' : 'light');
      } else {
        setActualTheme(theme);
      }
    };

    updateTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'system') return 'light';
      if (prev === 'light') return 'dark';
      return 'system';
    });
  };

  const tabs: Tab[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects & Files', icon: Folder },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare }
  ];

  const isDark = actualTheme === 'dark';

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
              {theme === 'dark' ? <Moon size={18} /> : theme === 'light' ? <Sun size={18} /> : '◐'}
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
    <div className="text-center space-y-4">
      <h1 className={`text-5xl sm:text-6xl font-bold transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {PORTFOLIO_DATA.name}
      </h1>
      <p className={`text-xl sm:text-2xl transition-colors duration-300 ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {PORTFOLIO_DATA.tagline}
      </p>
      <p className={`text-base sm:text-lg max-w-2xl mx-auto transition-colors duration-300 ${
        isDark ? 'text-gray-500' : 'text-gray-600'
      }`}>
        {PORTFOLIO_DATA.bio}
        <br />
        {PORTFOLIO_DATA.current.split('|')[0]}
        <img 
          src="/ucsd-logo.png" 
          alt="UCSD" 
          className="w-5 h-5 inline-block"
        />
        {PORTFOLIO_DATA.current.split('|')[1]}
      </p>
      
      {/* Social Links */}
      <div className="flex justify-center gap-4 pt-4">
        <a
          href={PORTFOLIO_DATA.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
            isDark
              ? 'bg-[#21262d] hover:bg-[#30363d] text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <FaGithub size={24} />
        </a>

        <a
          href={PORTFOLIO_DATA.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
            isDark
              ? 'bg-[#21262d] hover:bg-[#30363d] text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <FaLinkedin size={24} />
        </a>

        <a
          href={PORTFOLIO_DATA.social.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
            isDark
              ? 'bg-[#21262d] hover:bg-[#30363d] text-green-400'
              : 'bg-gray-100 hover:bg-gray-200 text-green-600'
          }`}
        >
          <FaSpotify size={24} />
        </a>

        <a
          href={`mailto:${PORTFOLIO_DATA.social.email}`}
          className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
            isDark
              ? 'bg-[#21262d] hover:bg-[#30363d] text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Mail size={24} />
        </a>
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
      <div className={`divide-y ${isDark ? 'divide-[#30363d]' : 'divide-gray-200'}`}>
        {PORTFOLIO_DATA.documents.map((doc, idx) => (
          <a
            key={idx}
            href={doc.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-4 transition-all duration-200 ${
              isDark ? 'hover:bg-[#161b22]' : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
              <div>
                <p className={`font-medium ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {doc.name}
                </p>
                <p className={`text-sm ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {doc.type}
                </p>
              </div>
            </div>
            <ExternalLink size={18} className={isDark ? 'text-gray-500' : 'text-gray-600'} />
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
      <div className={`divide-y ${isDark ? 'divide-[#30363d]' : 'divide-gray-200'}`}>
        {PORTFOLIO_DATA.allProjects.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-4 transition-all duration-200 ${
              isDark ? 'hover:bg-[#161b22]' : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Folder size={24} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
              <div>
                <p className={`font-medium ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.name}
                </p>
                <p className={`text-sm ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {project.type} • {project.tech.join(', ')}
                </p>
              </div>
            </div>
            <ExternalLink size={18} className={isDark ? 'text-gray-500' : 'text-gray-600'} />
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