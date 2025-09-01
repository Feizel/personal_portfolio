import React from "react";

const Skills = () => {
  const skillCategories = [
    {
      title: "💻 Programming Languages",
      description:
        "Languages I've worked with during my studies, personal projects, and AWS internship",
      skills: [
        "C#",
        "Java",
        "JavaScript",
        "TypeScript",
        "Python",
        "SQL",
        "HTML/CSS",
        "C/C++",
      ],
    },
    {
      title: "☁️ Cloud & AWS",
      description:
        "AWS services and cloud technologies from my internship experience",
      skills: [
        "AWS EC2",
        "AWS Lambda",
        "AWS S3",
        "AWS RDS",
        "AWS DynamoDB",
        "AWS IAM",
        "AWS Cognito",
        "AWS SageMaker",
        "AWS Bedrock",
        "AWS Amplify",
        "VPC",
        "CloudFormation",
      ],
    },
    {
      title: "🛠️ Frameworks & Tools",
      description:
        "Development frameworks and tools I use for building applications",
      skills: [
        "React",
        ".NET Core",
        "ASP.NET",
        "Entity Framework",
        "Firebase",
        "Material-UI",
        "Android SDK",
        "Git",
        "VS Code",
        "IntelliJ IDEA",
        "Android Studio",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      title: "🎯 Core Competencies",
      description:
        "Technical concepts and soft skills developed through education and experience",
      skills: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Serverless Architecture",
        "Problem Solving",
        "Team Collaboration",
        "Communication",
        "Continuous Learning",
        "Time Management",
      ],
    },
  ];

  return (
    <section className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 2xl:pt-56 pb-4 md:pb-16 xl:pb-20 2xl:pb-24 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12">
        <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div className="pt-8 sm:pt-6 md:pt-0">
            <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
              🚀 Skills & Expertise
            </h2>
            <p className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 xl:mb-16 2xl:mb-20 font-light">
              Get to know my technical abilities, skills, and professional
              competencies 💪
            </p>

            <div className="space-y-8 sm:space-y-12 xl:space-y-16 2xl:space-y-20">
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="group">
                  <div className="mb-6 sm:mb-8 xl:mb-10 2xl:mb-12">
                    <h3 className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 xl:mb-4 2xl:mb-5 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-all duration-300">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl text-gray-600 dark:text-gray-400 font-light">
                      {category.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3 xl:gap-4 2xl:gap-5">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="group/skill px-3 sm:px-4 xl:px-5 2xl:px-6 py-2 sm:py-3 xl:py-4 2xl:py-5 text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500/50 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 font-medium hover:scale-105 hover:shadow-md dark:hover:shadow-orange-500/20 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
