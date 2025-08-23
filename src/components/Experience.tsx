import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: 'AWS Intern',
      company: 'Amazon Web Services',
      period: 'Present',
      description: 'Working on cloud infrastructure projects and learning enterprise-scale solutions.',
      current: true
    },
    {
      title: 'Recent Graduate',
      company: 'University',
      period: '2024',
      description: 'Completed degree with focus on computer science and technology.',
      current: false
    }
  ];

  return (
    <section className="py-16 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
            Experience
          </h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-2">
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125 ${
                      exp.current 
                        ? 'bg-orange-500 shadow-lg shadow-orange-500/50 dark:shadow-orange-500/80 dark:animate-pulse-glow' 
                        : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-orange-400 dark:group-hover:bg-orange-400 dark:group-hover:shadow-orange-400/50 dark:group-hover:shadow-md'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300">
                        {exp.title}
                      </h3>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 ${
                        exp.current 
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 dark:shadow-orange-500/30 dark:shadow-sm' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 group-hover:text-orange-600 dark:group-hover:text-orange-400'
                      }`}>
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {exp.company}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 font-light">
                      {exp.description}
                    </p>
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

export default Experience;