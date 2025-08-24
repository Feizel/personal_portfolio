import React from 'react';

const About = () => {
  return (
    <section className="py-16 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
            About 👋
          </h2>
          
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            <p>
              🎓 I'm a recent graduate currently interning at <span className="text-orange-500 dark:text-orange-400 font-medium">Amazon Web Services</span>, where I'm immersing myself in cloud computing 
              technologies ☁️. My journey into the world of technology began with a passion for coding 💻, where I honed my skills and 
              learning from industry leaders. My passion sits at the crossroads of <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-medium">technology</span>, <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium">artificial intelligence</span>, and 
              <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent font-medium">business strategy</span>, driving me to build solutions that create meaningful impact ✨.
            </p>
            
            <p>
              Beyond coding and working with AWS services, I actively write about emerging technology trends 📈, AI breakthroughs 🤖, 
              cloud innovations ⚡, business insights 💡, and my personal fascination with astronomy 🌌 on my blog. 
              I believe in the power of continuous learning 📚 and enjoy sharing knowledge to inspire and engage the tech community 🚀.
            </p>
            
            <p>
              I am fueled by the energy of connecting with visionary technologists 🤝, sparking bold ideas 💡, 
              and teaming up on projects that don't just break the mold—they reinvent it, reaching for new horizons 
              beyond the imaginable 🌌.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;