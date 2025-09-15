import React from "react";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const completedProjects = [
    {
      title: "Creative Agency Studio Website",
      description:
        "A website I created for a creative agency company called 626 Creative Studio",
      tech: ["React", "Vercel", "TypeScript"],
      github: "#",
      demo: "https://www.626.co.za",
      image: "/projects/626-creative-agency.png",
    },
    {
      title: "Atomus Dev Website",
      description:
        "A website I created for a software company called Atomus Dev",
      tech: ["React", "Vercel", "TypeScript", "Framer", "Figma"],
      github: "#",
      demo: "https://atomusdev.co.za/",
      image: "/projects/atomusdev.png",
    },
    {
      title: "Cloud Classroom Platform",
      description:
        "An offline e-learning platform built using AWS Services during my AWS internship",
      tech: [
        "DynamoDB",
        "API Gateway",
        "Lambda",
        "AppSync",
        "AWS S3",
        "Cognito",
      ],
      github: "#",
      demo: "#",
      image: "/projects/cloud-classroom.png",
    },
    {
      title: "AI Blog Assistant",
      description:
        "Personal project using AI to help with blog content topics and ideas.",
      tech: ["Python", "OpenAI API", "Flask"],
      github: "https://github.com/Feizel/AI-Blog-Assistant",
      demo: "https://ai-blog-assistant.onrender.com",
      image: "/projects/ai-blog-assistant.png",
    },
    {
      title: "My Personal Portfolio",
      description:
        "This portfolio website showcasing my skills, projects, and experience.",
      tech: ["TypeScript", "React", "AWS Amplify", "Route53"],
      github: "https://github.com/Feizel/personal_portfolio",
      demo: "https://www.feizel.co.za",
      image: "/projects/portfolio.png",
    },
  ];

  const workInProgress = [
    {
      title: "AI Lifepath Planner",
      description:
        "An interactive career navigation app that helps users map possible career paths with AI based on their past experiences, skills, hobbies, and interests",
      tech: ["React", "React Flow", "TypeScript", "Node.js"],
      github: "#",
      demo: "#",
      image: "/projects/lifeline.png",
      status: "In Development",
    },
    {
      title: "Synera Website",
      description:
        "Website built to market Synera Software and showcase the AI-powered talent mobility platform capabilities.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "#",
      demo: "#",
      image: "/projects/synera-website.png",
      status: "In Development",
    },
    {
      title: "Synera AI Engine",
      description:
        "A B2B talent mobility platform built from the AI Lifepath planner concept. AI-powered engine that helps organizations optimize talent allocation and career development strategies.",
      tech: ["React", "Node.js", "AI/ML", "PostgreSQL", "AWS"],
      github: "#",
      demo: "#",
      image: "/projects/synera-ai.png",
      status: "In Development",
    },
    {
      title: "Astronomy Data Visualizer",
      description:
        "Interactive visualization of astronomical data and celestial events.",
      tech: ["D3.js", "React", "NASA APIs"],
      github: "#",
      demo: "#",
      image: "/projects/astronomy-visualizer.png",
      status: "In Development",
    },
  ];

  return (
    <section className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 2xl:pt-56 pb-4 md:pb-16 xl:pb-20 2xl:pb-24 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12">
        <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div className="pt-8 sm:pt-6 md:pt-0">
            <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
              📁 Projects
            </h2>
            <p className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 xl:mb-16 2xl:mb-20 font-light">
              A showcase of my work - from cloud infrastructure to AI
              applications and beyond 🎆
            </p>

            {/* Completed Projects */}
            <div className="space-y-6 sm:space-y-8 xl:space-y-10 2xl:space-y-12">
              {completedProjects.map((project, index) => (
                <a
                  key={index}
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 sm:p-6 xl:p-8 2xl:p-10 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500/50 dark:hover:border-orange-400/50 dark:hover:shadow-orange-500/20 dark:hover:shadow-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:scale-[1.02] dark:bg-gray-900/20 cursor-pointer"
                >
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 xl:gap-8 2xl:gap-10">
                    {/* Project Image */}
                    <div className="lg:w-1/3 xl:w-2/5">
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group-hover:shadow-md transition-all duration-300">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="lg:w-2/3 xl:w-3/5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 xl:mb-6 2xl:mb-8">
                        <h3 className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-2 sm:mb-0">
                          {project.title}
                        </h3>
                        <div className="flex space-x-2 sm:space-x-3 xl:space-x-4 2xl:space-x-5">
                          <a
                            href={project.github}
                            className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110"
                          >
                            <Github
                              size={16}
                              className="sm:w-5 sm:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7"
                            />
                          </a>
                          <a
                            href={project.demo}
                            className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110"
                          >
                            <ExternalLink
                              size={16}
                              className="sm:w-5 sm:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7"
                            />
                          </a>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 xl:mb-6 2xl:mb-8 font-light">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 sm:gap-2 xl:gap-3 2xl:gap-4">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 sm:px-3 xl:px-4 2xl:px-5 py-1 xl:py-2 2xl:py-3 text-xs sm:text-sm xl:text-base 2xl:text-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400 dark:hover:shadow-orange-500/30 dark:hover:shadow-sm transition-all duration-300 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Work in Progress Section */}
            <div className="mt-16 sm:mt-20 xl:mt-24 2xl:mt-28">
              <div className="mb-8 sm:mb-12 xl:mb-16 2xl:mb-20">
                <h3 className="text-lg sm:text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 xl:mb-6 2xl:mb-8 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
                  🚧 Work in Progress
                </h3>
                <p className="text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl text-gray-600 dark:text-gray-400 font-light">
                  Projects currently in development and upcoming ideas
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8 xl:space-y-10 2xl:space-y-12">
                {workInProgress.map((project, index) => (
                  <div
                    key={index}
                    className="group p-4 sm:p-6 xl:p-8 2xl:p-10 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500/50 dark:hover:border-orange-400/50 dark:hover:shadow-orange-500/20 dark:hover:shadow-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:scale-[1.02] dark:bg-gray-900/20 relative"
                  >
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs sm:text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-medium">
                        {project.status}
                      </span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 xl:gap-8 2xl:gap-10">
                      {/* Project Image */}
                      <div className="lg:w-1/3 xl:w-2/5">
                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group-hover:shadow-md transition-all duration-300 relative">
                          <img
                            src={project.image}
                            alt={`${project.title} preview`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-75"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent"></div>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="lg:w-2/3 xl:w-3/5">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 xl:mb-6 2xl:mb-8">
                          <h4 className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-2 sm:mb-0">
                            {project.title}
                          </h4>
                        </div>

                        <p className="text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 xl:mb-6 2xl:mb-8 font-light">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 sm:gap-2 xl:gap-3 2xl:gap-4">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 sm:px-3 xl:px-4 2xl:px-5 py-1 xl:py-2 2xl:py-3 text-xs sm:text-sm xl:text-base 2xl:text-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400 dark:hover:shadow-orange-500/30 dark:hover:shadow-sm transition-all duration-300 font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
