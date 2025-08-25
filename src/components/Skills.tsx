import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: '💻 Technology & Programming',
      emoji: '💻',
      skills: [
        { name: 'C# 🟢', level: 85 },
        { name: 'Java ☕', level: 82 },
        { name: 'JavaScript/TypeScript ⚡', level: 83 },
        { name: 'Python 🐍', level: 85 },
        { name: 'SQL/NoSQL 🗄️', level: 80 },
        { name: 'HTML/CSS 🎨', level: 85 },
        { name: 'C/C++ 🔧', level: 60 }
      ]
    },
    {
      title: '☁️ Cloud & Infrastructure',
      emoji: '☁️',
      skills: [
        { name: 'AWS (EC2, Lambda, VPC, S3, RDS, DynamoDB, IAM, Cognito) ☁️', level: 86 },
        { name: 'AWS SageMaker (Machine Learning) 🤖', level: 72 },
        { name: 'AWS Bedrock (Foundational Models) 🤖', level: 75 },
        { name: 'AWS Amplify 📱', level: 85 },
        { name: 'GraphQL 🔗', level: 80 },
        { name: 'REST APIs 🌐', level: 85 }
      ]
    },
    {
      title: '📱 Frameworks & Tools',
      emoji: '🛠️',
      skills: [
        { name: 'React ⚛️', level: 80 },
        { name: '.NET Core / ASP.NET ⚙️', level: 82 },
        { name: 'Entity Framework 📊', level: 80 },
        { name: 'Firebase 🔥', level: 75 },
        { name: 'Material-UI 🎨', level: 75 },
        { name: 'Android SDK 🤖', level: 70 },
        { name: 'Developer Tools (Git, VS Code, IntelliJ, Android Studio) 🛠️', level: 88 }
      ]
    },
    {
      title: '🧠 Concepts & Soft Skills',
      emoji: '🧠',
      skills: [
        { name: 'Data Structures & Algorithms 📚', level: 75 },
        { name: 'Object-Oriented Programming 🔄', level: 80 },
        { name: 'Serverless Architecture 🌩️', level: 84 },
        { name: 'API Design & Development ⚙️', level: 82 },
        { name: 'Problem-solving & Critical Thinking 💡', level: 90 },
        { name: 'Effective Communication 🗣️', level: 92 },
        { name: 'Collaborative Teamwork 🤝', level: 93 },
        { name: 'Rapid Learning & Adaptability 🚀', level: 96 },
        { name: 'Time Management ⏰', level: 90 }
      ]
    }
  ];

  return (
    <section className="pt-24 md:pt-40 pb-4 md:pb-16 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
            🚀 Skills & Expertise
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-12 font-light">
            Get to know my technical abilities, skills, and professional competencies 💪
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="group">
                <div className="bg-white dark:bg-gray-900/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-orange-500/10">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-6 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-all duration-300">
                    {category.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="group/skill">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium group-hover/skill:text-orange-500 dark:group-hover/skill:text-orange-400 transition-all duration-300">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000 ease-out hover:shadow-md hover:shadow-orange-500/50"
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
    </section>
  );
};

export default Skills;