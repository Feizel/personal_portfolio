import React from "react";

interface AboutProps {
  onContactClick?: () => void;
  onBlogClick?: () => void;
}

const About = ({ onContactClick, onBlogClick }: AboutProps) => {
  return (
    <section className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 2xl:pt-56 pb-4 md:pb-16 xl:pb-20 2xl:pb-24 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12">
        <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div className="pt-8 sm:pt-6 md:pt-0">
          <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] transition-all duration-300 cursor-default">
            About Me 👋
          </h2>
          <p className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 xl:mb-12 2xl:mb-16 font-light">
            Get to know me better; my journey, passions, and what drives me in
            the world of technology 👨‍💻
          </p>

          <div className="space-y-4 sm:space-y-6 xl:space-y-8 2xl:space-y-10 text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            <p>
              🎓 I'm a recent graduate currently interning at{" "}
              <span className="text-orange-500 dark:text-orange-400 font-medium">
                Amazon Web Services
              </span>
              , where I'm sinking myself head-first in cloud computing
              technologies ☁️. My journey into the world of technology began
              with a passion for coding 💻, where I built my skills and learning
              from industry leaders. My passion sits at the crossroads of{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-medium">
                technology
              </span>
              ,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium">
                artificial intelligence
              </span>
              , and{" "}
              <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent font-medium">
                business strategy
              </span>
              , driving me to build solutions that create meaningful impact.
            </p>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-md border-l-2 border-orange-500/50 text-center">
              <blockquote className="text-sm italic text-gray-600 dark:text-gray-400 mb-1 text-center">
                "If I have seen further it is by standing on the shoulders of
                giants"
              </blockquote>
              <cite className="text-xs text-gray-500 dark:text-gray-500">
                — Sir Isaac Newton, <em>Polymath</em>
              </cite>
            </div>

            <p>
              Beyond coding and working with AWS services, I actively write
              about emerging technology trends 📈, AI breakthroughs 🤖, cloud
              innovations ⚡, business insights 💡, and my personal fascination
              with astronomy 🌌 on my blog. I believe in the power of continuous
              learning 📚 and enjoy sharing knowledge to inspire and engage the
              tech community 🚀.
            </p>

            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-md border-l-2 border-orange-500/50 text-center">
              <blockquote className="text-sm italic text-gray-600 dark:text-gray-400 mb-1 text-center">
                "It always seems impossible until it is done."
              </blockquote>
              <cite className="text-xs text-gray-500 dark:text-gray-500">
                — Nelson Rolihlahla Mandela,{" "}
                <em>Former South-African President</em>
              </cite>
            </div>

            <p>
              I am fueled by the energy of connecting with visionary
              technologists 🤝, sparking bold ideas 💡, and teaming up on
              projects that don't just break the mold, but reinvent it, reaching
              for new horizons beyond the imaginable 🌌.
            </p>
          </div>

          <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-md border-l-2 border-orange-500/50 text-center">
            <blockquote className="text-sm italic text-gray-600 dark:text-gray-400 mb-1 text-center">
              "We are made of starstuff. We are a way for the cosmos to know
              itself"
            </blockquote>
            <cite className="text-xs text-gray-500 dark:text-gray-500">
              — Carl Sagan, <em>Astrophysicist</em>
            </cite>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900/30 dark:to-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/20">
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-4 text-orange-600 dark:text-orange-400 flex items-center gap-2">
              <span className="animate-pulse">🎯</span> A Few Fun Facts About Me
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-200">
                <span className="text-orange-500 text-lg group-hover:scale-110 transition-transform duration-200">
                  ☁️
                </span>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I earned{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-semibold">
                    three AWS certifications:
                  </span>{" "}
                  Cloud Practitioner, AI Practitioner, and Solutions Architect
                  Associate, in just{" "}
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    seven months
                  </span>{" "}
                  during my internship! 🚀
                </p>
              </div>
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-200">
                <span className="text-blue-500 text-lg group-hover:scale-110 transition-transform duration-200">
                  🏢
                </span>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I co-founded{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
                    Atomus Dev
                  </span>
                  , where I combined my academic technical material with my
                  entrepreneurial spirit 💼
                </p>
              </div>
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-200">
                <span className="text-green-500 text-lg group-hover:scale-110 transition-transform duration-200">
                  ⭐
                </span>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  My{" "}
                  <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent font-semibold">
                    CloudClassroom
                  </span>{" "}
                  project at AWS received glowing feedback, proving I can
                  deliver enterprise-grade solutions 🎉
                </p>
              </div>
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-200">
                <span className="text-purple-500 text-lg group-hover:scale-110 transition-transform duration-200">
                  🎓
                </span>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Scored{" "}
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
                    96%
                  </span>{" "}
                  on my Event Management System project while maintaining
                  consistently strong academic performance 📚
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900/30 dark:to-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20">
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <span className="animate-bounce">🎭</span> And just for fun
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-200">
                <span className="text-yellow-500 text-lg group-hover:rotate-12 transition-transform duration-200">
                  🔭
                </span>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I bought my first telescope in{" "}
                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                    grade 8
                  </span>
                  , which shocked my mom because she thought it was just an
                  expensive toy! Thus began my obsession with astronomy 🌟
                </p>
              </div>
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-200">
                <span className="text-red-500 text-lg group-hover:scale-110 transition-transform duration-200">
                  💀
                </span>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I once read through the entire{" "}
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-semibold">
                    "1000 Ways to Die" Wikipedia page,
                  </span>{" "}
                  definitely an unusual way to spend a weekend! 😅
                </p>
              </div>
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-200">
                <span className="text-white text-lg group-hover:bounce transition-transform duration-200">
                  ⚽
                </span>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I'm a big{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                    Real Madrid FC
                  </span>{" "}
                  fan, <span className="font-semibold">Hala Madrid!</span> But
                  do not worry, I am not one of those annoying fans LOL! 👑
                </p>
              </div>
              <div className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-200">
                <span className="text-orange-500 text-lg group-hover:scale-110 transition-transform duration-200">
                  📝
                </span>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I keep a laid-back tech journal where I jot down my random
                  thoughts on tech, AI breakthroughs,, and cosmic discoveries,{" "}
                  <a
                    href="/blog"
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors underline font-medium"
                  >
                    check out my notes
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">Plot twist:</span> I'm also
              looking for my next adventure! 🚀
            </p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              If you know of any exciting opportunities where I can combine my
              AWS skills, coding passion, and maybe even discuss Saturn's rings
              during coffee breaks,{" "}
              <button
                onClick={onContactClick}
                className="font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors cursor-pointer underline"
              >
                reach out to me!
              </button>{" "}
              ☕
            </p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
