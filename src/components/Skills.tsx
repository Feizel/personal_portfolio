import React from "react";

const Skills = () => {
  const skillCategories = [
    {
      title: "💻 Technology & Programming",
      emoji: "💻",
      skills: [
        { name: "C# 🟢", level: 80 },
        { name: "Java ☕", level: 71 },
        { name: "JavaScript/TypeScript ⚡", level: 73 },
        { name: "Python 🐍", level: 78 },
        { name: "SQL/NoSQL 🗄️", level: 72 },
        { name: "HTML/CSS 🎨", level: 85 },
        { name: "C/C++ 🔧", level: 60 },
      ],
    },
    {
      title: "☁️ Cloud & Infrastructure",
      emoji: "☁️",
      skills: [
        {
          name: "AWS (EC2, Lambda, VPC, S3, RDS, DynamoDB, IAM, Cognito) ☁️",
          level: 86,
        },
        { name: "AWS SageMaker (Machine Learning) 🤖", level: 72 },
        { name: "AWS Bedrock (Foundational Models) 🤖", level: 75 },
        { name: "AWS Amplify 📱", level: 85 },
        { name: "GraphQL 🔗", level: 70 },
        { name: "REST APIs 🌐", level: 72 },
      ],
    },
    {
      title: "📱 Frameworks & Tools",
      emoji: "🛠️",
      skills: [
        { name: "React ⚛️", level: 72 },
        { name: ".NET Core / ASP.NET ⚙️", level: 78 },
        { name: "Entity Framework 📊", level: 70 },
        { name: "Firebase 🔥", level: 75 },
        { name: "Material-UI 🎨", level: 75 },
        { name: "Android SDK 🤖", level: 70 },
        {
          name: "Developer Tools (Git, VS Code, IntelliJ, Android Studio) 🛠️",
          level: 88,
        },
      ],
    },
    {
      title: "🧠 Concepts & Soft Skills",
      emoji: "🧠",
      skills: [
        { name: "Data Structures & Algorithms 📚", level: 71 },
        { name: "Object-Oriented Programming 🔄", level: 75 },
        { name: "Serverless Architecture 🌩️", level: 75 },
        { name: "Critical Problem-solving 💡", level: 90 },
        { name: "Effective Communication 🗣️", level: 92 },
        { name: "Collaborative Teamwork 🤝", level: 93 },
        { name: "Rapid Learning & Adaptability 🚀", level: 96 },
        { name: "Time Management ⏰", level: 90 },
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 xl:gap-10 2xl:gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="group">
                <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 sm:p-6 xl:p-7 2xl:p-8 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-orange-500/10">
                  <h3 className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 xl:mb-8 2xl:mb-10 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-all duration-300">
                    {category.title}
                  </h3>

                  <div className="space-y-3 sm:space-y-4 xl:space-y-5 2xl:space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="group/skill">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl text-gray-700 dark:text-gray-300 font-medium group-hover/skill:text-orange-500 dark:group-hover/skill:text-orange-400 transition-all duration-300">
                            {skill.name}
                          </span>
                          <span className="text-xs sm:text-sm xl:text-base 2xl:text-lg text-gray-500 dark:text-gray-400 font-medium">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 xl:h-3 2xl:h-4 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 xl:h-3 2xl:h-4 rounded-full transition-all duration-1000 ease-out hover:shadow-md hover:shadow-orange-500/50"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
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
