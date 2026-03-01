import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: '💻 Graduate Software Engineer Intern',
      company: '🏢 TransLution Software',
      period: '⚡ Present',
      description: (
        <>
          <a href="https://www.translution.co.za/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300">TransLution Software</a> Graduate Software Engineer Intern 💻<br />
          <strong>📍 Location:</strong> Rivonia, Johannesburg<br /><br />
          <strong>🎯 Key Areas:</strong>
          <ul className="mt-2 ml-4 space-y-1">
            <li>• Developing expertise in <span className="text-blue-500 dark:text-blue-400 font-medium">SQL Server</span> and <span className="text-green-500 dark:text-green-400 font-medium">ERP systems (Syspro)</span></li>
            <li>• Building <span className="text-purple-500 dark:text-purple-400 font-medium">SSRS reports</span> and complex SQL queries for manufacturing & distribution solutions</li>
            <li>• Learning <span className="text-orange-500 dark:text-orange-400 font-medium">TransLution platform</span> for warehouse and factory automation</li>
            <li>• Gaining hands-on experience in <span className="text-indigo-500 dark:text-indigo-400 font-medium">business analysis</span>, solution configuration, and product support</li>
            <li>• Working across the full software lifecycle from sales to implementation and support 🚀</li>
          </ul>
        </>
      ),
      current: true
    },
    {
      title: '☁️ AWS Cloud Engineer Intern',
      company: '🚀 Amazon Web Services',
      period: '📅 Jan 2024 - Sep 2024',
      description: (
        <>
          <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300">Amazon Web Services (AWS)</a> Cloud Engineer Intern ☁️<br />
          <strong>📍 Location:</strong> Cape Town, Western Cape<br /><br />
          <strong>🎯 Achievements:</strong>
          <ul className="mt-2 ml-4 space-y-1">
            <li>• Worked on <span className="text-blue-500 dark:text-blue-400 font-medium">cloud infrastructure projects</span> supporting enterprise-scale solutions</li>
            <li>• Earned <span className="text-green-500 dark:text-green-400 font-medium">three AWS certifications</span> in seven months (Cloud Practitioner, AI Practitioner, Solutions Architect Associate)</li>
            <li>• Collaborated with <span className="text-purple-500 dark:text-purple-400 font-medium">global teams</span> on mission-critical applications</li>
            <li>• Built scalable, secure cloud solutions using <span className="text-orange-500 dark:text-orange-400 font-medium">AWS core services</span> and <span className="text-indigo-500 dark:text-indigo-400 font-medium">AI technologies</span> ✨</li>
          </ul>
        </>
      ),
      current: false
    },
    {
      title: '🎓 Bachelor of Science in Information Technology Graduate',
      company: '🏛️ University of the Free State',
      period: '📅 2021 - 2024',
      description: (
        <>
          <a href="https://www.ufs.ac.za/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300">University of the Free State</a> Bloemfontein, Free State 🏛️<br />
          Bachelor of Science in <span className="text-green-500 dark:text-green-400 font-medium">Information Technology</span> majoring in <span className="text-blue-500 dark:text-blue-400 font-medium">Computer Science</span>. 💻<br /><br />
          <strong>📚 Relevant Coursework:</strong> <em><span className="text-purple-500 dark:text-purple-400 font-medium">Data Structures & Algorithms</span>, <span className="text-orange-500 dark:text-orange-400 font-medium">Software Engineering</span>, <span className="text-red-500 dark:text-red-400 font-medium">Mathematics & Applied Mathematics</span>,
            <span className="text-teal-500 dark:text-teal-400 font-medium">Computer Networks</span>, <span className="text-indigo-500 dark:text-indigo-400 font-medium">Advanced Databases</span>, <span className="text-pink-500 dark:text-pink-400 font-medium">Mobile Development</span>, <span className="text-cyan-500 dark:text-cyan-400 font-medium">Web Development</span>, <span className="text-yellow-500 dark:text-yellow-400 font-medium">Human-Computer Interaction</span></em> 🚀
        </>
      ),
      current: false
    }
  ];

  return (
    <section className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 2xl:pt-56 pb-4 md:pb-16 xl:pb-20 2xl:pb-24 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12">
        <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div className="pt-8 sm:pt-6 md:pt-0">
            <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
              💼 Experience
            </h2>
          <p className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 xl:mb-16 2xl:mb-20 font-light">
            My professional journey and educational background in technology and cloud computing 🚀
          </p>
          
          <div className="space-y-6 sm:space-y-8 xl:space-y-10 2xl:space-y-12">
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
                      <h3 className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300">
                        {exp.title}
                      </h3>
                      <span className={`text-xs sm:text-sm xl:text-base 2xl:text-lg font-medium px-2 sm:px-3 xl:px-4 2xl:px-5 py-1 xl:py-2 2xl:py-3 rounded-full transition-all duration-300 ${
                        exp.current 
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 dark:shadow-orange-500/30 dark:shadow-sm' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 group-hover:text-orange-600 dark:group-hover:text-orange-400'
                      }`}>
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {exp.company}
                    </p>
                    <div className="text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl text-gray-600 dark:text-gray-400 font-light">
                      {exp.description}
                    </div>
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

export default Experience;