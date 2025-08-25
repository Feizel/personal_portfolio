import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Cloud Infrastructure Dashboard',
      description: 'A monitoring dashboard for AWS resources built during my internship.',
      tech: ['React', 'AWS', 'TypeScript'],
      github: '#',
      demo: '#'
    },
    {
      title: 'AI Blog Assistant',
      description: 'Personal project using AI to help with blog content creation and optimization.',
      tech: ['Python', 'OpenAI API', 'Flask'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Astronomy Data Visualizer',
      description: 'Interactive visualization of astronomical data and celestial events.',
      tech: ['D3.js', 'React', 'NASA APIs'],
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section className="pt-24 md:pt-40 pb-4 md:pb-16 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
            📁 Projects
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-12 font-light">
            A showcase of my work - from cloud infrastructure to AI applications and beyond 🎆
          </p>
          
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div key={index} className="group p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500/50 dark:hover:border-orange-400/50 dark:hover:shadow-orange-500/20 dark:hover:shadow-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:scale-[1.02] dark:bg-gray-900/20">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-2 sm:mb-0">
                    {project.title}
                  </h3>
                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.demo}
                      className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 font-light">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400 dark:hover:shadow-orange-500/30 dark:hover:shadow-sm transition-all duration-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;