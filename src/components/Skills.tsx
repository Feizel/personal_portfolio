import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Technology & Programming',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'JavaScript/TypeScript', level: 90 },
        { name: 'React/Next.js', level: 88 },
        { name: 'Node.js', level: 85 },
        { name: 'SQL/NoSQL Databases', level: 90 }
      ]
    },
    {
      title: 'AI & Machine Learning',
      skills: [
        { name: 'Machine Learning', level: 92 },
        { name: 'Deep Learning', level: 88 },
        { name: 'Natural Language Processing', level: 85 },
        { name: 'Computer Vision', level: 80 },
        { name: 'MLOps', level: 85 }
      ]
    },
    {
      title: 'Cloud & Infrastructure',
      skills: [
        { name: 'AWS', level: 90 },
        { name: 'Azure', level: 85 },
        { name: 'Google Cloud Platform', level: 82 },
        { name: 'Docker/Kubernetes', level: 88 },
        { name: 'CI/CD', level: 87 }
      ]
    },
    {
      title: 'Business & Strategy',
      skills: [
        { name: 'Product Strategy', level: 88 },
        { name: 'Project Management', level: 92 },
        { name: 'Business Analysis', level: 85 },
        { name: 'Team Leadership', level: 90 },
        { name: 'Stakeholder Management', level: 88 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and professional capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;