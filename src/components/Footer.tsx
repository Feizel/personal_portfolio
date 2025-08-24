import React from 'react';
import { Github, Linkedin, Mail, Award, Heart, Code, Rocket } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/20 border-t border-gray-200 dark:border-orange-500/20 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="text-3xl font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300 cursor-pointer font-cursive">
              Feizel
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              AWS Intern passionate about cloud computing, AI, and building innovative solutions. 
              Always exploring the intersection of technology and the cosmos.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/feizel"
                className="p-3 bg-white dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 dark:hover:shadow-orange-500/30 dark:hover:shadow-md dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/feizel-ze-maduna/"
                className="p-3 bg-white dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 dark:hover:shadow-orange-500/30 dark:hover:shadow-md dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.credly.com/users/feizel"
                className="p-3 bg-white dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 dark:hover:shadow-orange-500/30 dark:hover:shadow-md dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Award size={20} />
              </a>
              <a
                href="mailto:feizel.maduna@gmail.com"
                className="p-3 bg-white dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 dark:hover:shadow-orange-500/30 dark:hover:shadow-md dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-display">
              Explore
            </h3>
            <div className="space-y-3">
              <a href="#about" className="block text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-light">
                About Me
              </a>
              <a href="#experience" className="block text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-light">
                Experience
              </a>
              <a href="#projects" className="block text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-light">
                Projects
              </a>
              <button className="block text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-light text-left">
                Blog
              </button>
            </div>
          </div>

          {/* Interests & Tech */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-display">
              Interests
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Code className="w-4 h-4 mr-2 text-orange-500" />
                <span className="font-light">Cloud Computing</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Rocket className="w-4 h-4 mr-2 text-orange-500" />
                <span className="font-light">Artificial Intelligence</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <span className="w-4 h-4 mr-2 text-orange-500 text-sm">🌟</span>
                <span className="font-light">Astronomy</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <span className="w-4 h-4 mr-2 text-orange-500 text-sm">📚</span>
                <span className="font-light">Business Strategy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 dark:text-gray-400 flex items-center font-light">
              Made with <Heart className="w-4 h-4 mx-2 text-orange-500" /> by Feizel Ze Maduna
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;