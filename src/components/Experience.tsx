import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: '☁️ AWS Cloud Engineer Intern',
      company: '🚀 Amazon Web Services',
      period: '⚡ Present',
      description: (
        <>
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-medium">Amazon Web Services (AWS)</span> Cloud Engineer Intern ☁️<br />
          <strong>📍 Location:</strong> Cape Town, Western Cape<br /><br />
          <strong>🎯 Responsibilities:</strong>
          <ul className="mt-2 ml-4 space-y-1">
            <li>• Working on <span className="text-blue-500 dark:text-blue-400 font-medium">cloud infrastructure projects</span> at Amazon Web Services</li>
            <li>• Gaining hands-on experience with <span className="text-green-500 dark:text-green-400 font-medium">enterprise-scale solutions</span></li>
            <li>• Actively troubleshooting, automating, and contributing to cloud architecture</li>
            <li>• Collaborating with <span className="text-purple-500 dark:text-purple-400 font-medium">global teams</span> to support mission-critical applications</li>
            <li>• Improving expertise in <span className="text-orange-500 dark:text-orange-400 font-medium">AWS core services</span> and cutting-edge <span className="text-indigo-500 dark:text-indigo-400 font-medium">AI technologies</span></li>
            <li>• Building scalable, secure, and innovative cloud solutions ✨</li>
          </ul>
        </>
      ),
      current: true
    },
    {
      title: '🎓 Bachelor of Science in Information Technology Graduate',
      company: '🏛️ University of the Free State',
      period: '📅 2021 - 2024',
      description: (
        <>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium">University of the Free State</span> Bloemfontein, Free State 🏛️<br />
          Bachelor of Science in <span className="text-green-500 dark:text-green-400 font-medium">Information Technology</span> majoring in <span className="text-blue-500 dark:text-blue-400 font-medium">Computer Science</span>. 💻<br /><br />
          <strong>📚 Relevant Coursework:</strong> <em><span className="text-purple-500 dark:text-purple-400 font-medium">Data Structures & Algorithms</span>, <span className="text-orange-500 dark:text-orange-400 font-medium">Software Engineering</span>, <span className="text-red-500 dark:text-red-400 font-medium">Mathematics & Applied Mathematics</span>,
            <span className="text-teal-500 dark:text-teal-400 font-medium">Computer Networks</span>, <span className="text-indigo-500 dark:text-indigo-400 font-medium">Advanced Databases</span>, <span className="text-pink-500 dark:text-pink-400 font-medium">Mobile Development</span>, <span className="text-cyan-500 dark:text-cyan-400 font-medium">Web Development</span>, <span className="text-yellow-500 dark:text-yellow-400 font-medium">Human-Computer Interaction</span></em> 🚀
        </>
      ),
      current: false
    }
  ];

  return (
    <section className="pt-24 md:pt-40 pb-16 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
            💼 Experience
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-12 font-light">
            My professional journey and educational background in technology and cloud computing 🚀
          </p>
          
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
                    <div className="text-gray-600 dark:text-gray-400 font-light">
                      {exp.description}
                    </div>
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