import React from 'react';

const About = () => {
  return (
    <section className="py-16 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
            About
          </h2>
          
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            <p>
              I'm a recent graduate currently working as an intern at AWS, where I'm diving deep into 
              cloud computing and learning from some of the best minds in the industry. My passion lies 
              at the intersection of technology, artificial intelligence, and business strategy.
            </p>
            
            <p>
              When I'm not coding or exploring AWS services, you'll find me writing about technology 
              trends, AI breakthroughs, cloud computing innovations, business insights, and my fascination 
              with astronomy on my blog. I believe in the power of continuous learning and sharing knowledge 
              with the community.
            </p>
            
            <p>
              I'm always excited to connect with fellow technologists, discuss innovative ideas, 
              or collaborate on projects that push the boundaries of what's possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;