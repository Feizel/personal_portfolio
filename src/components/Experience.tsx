import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: 'Software Developer, SaaS & Cloud Platform',
      company: 'TransLution Software',
      period: 'Current',
      description: (
        <>
          <a href="https://www.translution.co.za/" target="_blank" rel="noopener noreferrer" className="text-orange-500 dark:text-orange-400 font-medium hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300">TransLution</a> builds warehouse and factory automation software for
          manufacturers and distributors, sitting alongside the ERP systems those
          businesses already run. I work in the product development team on the
          cloud deployment platform.
          <ul className="mt-3 ml-4 space-y-1.5">
            <li>Building and maintaining modules on a multi-tenant SaaS platform</li>
            <li>Reviewing, testing and debugging AI-agent-generated code for correctness, security and performance</li>
            <li>Turning user stories into prompts and workflows that agents can execute reliably</li>
            <li>Designing and querying relational data — PostgreSQL primarily, SQL Server alongside it</li>
            <li>Writing the developer documentation and integration guides the platform runs on</li>
          </ul>
          <p className="mt-3 text-gray-500 dark:text-gray-500">
            The interesting part is not that agents write code. It is that
            somebody still has to be answerable for what ships.
          </p>
        </>
      ),
      current: true
    },
    {
      title: 'Cloud Engineer Intern',
      company: 'Amazon Web Services',
      period: 'Jan 2024 – Sep 2024',
      description: (
        <>
          Nine months inside <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer" className="text-orange-500 dark:text-orange-400 font-medium hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300">AWS</a>, working on cloud infrastructure for
          enterprise-scale systems.
          <ul className="mt-3 ml-4 space-y-1.5">
            <li>Built scalable, secure solutions on AWS core services</li>
            <li>Earned three certifications in seven months: Cloud Practitioner, AI Practitioner, Solutions Architect Associate</li>
            <li>Collaborated with distributed teams across time zones on live systems</li>
          </ul>
        </>
      ),
      current: false
    },
    {
      title: 'BSc Information Technology',
      company: 'University of the Free State',
      period: '2021 – 2024',
      description: (
        <>
          <a href="https://www.ufs.ac.za/" target="_blank" rel="noopener noreferrer" className="text-orange-500 dark:text-orange-400 font-medium hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300">University of the Free State</a>, Bloemfontein — majoring in computer science.
          <p className="mt-3">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Coursework worth naming:</span>{' '}
            data structures and algorithms, software engineering, mathematics and
            applied mathematics, computer networks, advanced databases, mobile
            and web development, human-computer interaction.
          </p>
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
            <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 cursor-default">
              Experience
            </h2>
          <p className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 xl:mb-16 2xl:mb-20 font-light">
            Where I've worked and what I was actually doing there.
          </p>

          <div className="space-y-6 sm:space-y-8 xl:space-y-10 2xl:space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-2">
                    <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      exp.current
                        ? 'bg-orange-500'
                        : 'bg-gray-300 dark:bg-gray-700 group-hover:bg-orange-400'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <span className={`text-xs sm:text-sm xl:text-base font-medium px-2 sm:px-3 py-1 rounded-full transition-colors duration-300 ${
                        exp.current
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg xl:text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {exp.company}
                    </p>
                    <div className="text-xs sm:text-sm md:text-base xl:text-lg text-gray-600 dark:text-gray-400 font-light [&_ul]:list-disc [&_ul]:marker:text-orange-500/60">
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
