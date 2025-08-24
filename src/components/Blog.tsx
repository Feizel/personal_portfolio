import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

interface BlogProps {
  onBackToHome: () => void;
}

const Blog = ({ onBackToHome }: BlogProps) => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Cloud Computing",
      excerpt: "Exploring how artificial intelligence is revolutionizing cloud infrastructure and what it means for developers and businesses.",
      content: `
        Artificial Intelligence is fundamentally transforming how we approach cloud computing. As someone working at AWS, I've witnessed firsthand the incredible innovations happening at the intersection of AI and cloud infrastructure.

        ## The Current Landscape

        Cloud providers are increasingly integrating AI capabilities directly into their platforms. From automated resource optimization to intelligent monitoring and predictive scaling, AI is making cloud infrastructure smarter and more efficient.

        ## Key Developments

        **1. Automated Infrastructure Management**
        AI-powered systems can now predict resource needs, automatically scale applications, and optimize costs without human intervention.

        **2. Enhanced Security**
        Machine learning algorithms are detecting and responding to security threats faster than ever before, providing real-time protection for cloud workloads.

        **3. Intelligent Data Processing**
        AI services are making it easier to extract insights from massive datasets, enabling businesses to make data-driven decisions at scale.

        ## Looking Ahead

        The future promises even more exciting developments. We're moving towards a world where cloud infrastructure will be self-healing, self-optimizing, and incredibly intuitive to use.

        As we continue to push the boundaries of what's possible, I'm excited to be part of this transformation and to share these insights with the community.
      `,
      date: "2025-03-15",
      readTime: "5 min read",
      tags: ["AI", "Cloud Computing", "AWS", "Technology"]
    },
    {
      id: 2,
      title: "Building Scalable Solutions: Lessons from My AWS Internship",
      excerpt: "Key insights and practical lessons learned while working on enterprise-scale cloud solutions at Amazon Web Services.",
      content: `
        My journey as an AWS intern has been incredibly enlightening. Working on enterprise-scale solutions has taught me valuable lessons about building systems that can handle massive scale while maintaining reliability and performance.

        ## The Scale Challenge

        When you're dealing with systems that serve millions of users, every decision matters. From choosing the right database architecture to implementing efficient caching strategies, scalability considerations permeate every aspect of the design process.

        ## Key Lessons Learned

        **1. Design for Failure**
        In distributed systems, failure is not a possibility—it's a certainty. Building resilient systems means planning for component failures and designing graceful degradation paths.

        **2. Monitor Everything**
        You can't improve what you don't measure. Comprehensive monitoring and observability are crucial for understanding system behavior and identifying bottlenecks.

        **3. Automate Relentlessly**
        Manual processes don't scale. Automation is essential for managing complex systems efficiently and reducing human error.

        ## Practical Applications

        These principles have guided my work on various projects, from designing monitoring dashboards to implementing automated deployment pipelines. Each project has reinforced the importance of thinking at scale from day one.

        ## Moving Forward

        As I continue my journey in cloud computing, these foundational lessons will undoubtedly shape how I approach future challenges and opportunities.
      `,
      date: "2025-07-08",
      readTime: "4 min read",
      tags: ["AWS", "Scalability", "Internship", "Cloud Architecture"]
    },
    {
      id: 3,
      title: "The Business Impact of Cloud Migration",
      excerpt: "Understanding how cloud adoption transforms business operations, reduces costs, and enables innovation across industries.",
      content: `
        Cloud migration is more than just a technical transformation—it's a business revolution. Having worked on several migration projects, I've seen how moving to the cloud can fundamentally change how organizations operate and compete.

        ## Beyond Cost Savings

        While cost reduction is often the primary driver for cloud adoption, the real value lies in the strategic advantages that cloud computing enables.

        ## Key Business Benefits

        **1. Agility and Speed**
        Cloud platforms enable rapid experimentation and deployment, allowing businesses to respond quickly to market changes and customer needs.

        **2. Global Reach**
        With cloud infrastructure, companies can instantly deploy applications worldwide, reaching new markets without significant upfront investment.

        **3. Innovation Enablement**
        Access to cutting-edge services like AI, machine learning, and IoT platforms allows businesses to innovate without building these capabilities from scratch.

        ## Strategic Considerations

        Successful cloud migration requires careful planning and a clear understanding of business objectives. It's not just about lifting and shifting existing applications—it's about reimagining how technology can drive business value.

        ## The Human Element

        Perhaps most importantly, cloud migration is as much about people and processes as it is about technology. Organizations must invest in training and cultural change to fully realize the benefits of cloud computing.

        ## Conclusion

        As businesses continue to digitize, cloud computing will remain a critical enabler of transformation and growth. The organizations that approach cloud migration strategically will be best positioned for future success.
      `,
      date: "2025-05-22",
      readTime: "6 min read",
      tags: ["Business Strategy", "Cloud Migration", "Digital Transformation"]
    },
    {
      id: 4,
      title: "Stargazing and Software: Finding Patterns in the Cosmos",
      excerpt: "How my passion for astronomy influences my approach to software development and problem-solving in technology.",
      content: `
        There's something magical about looking up at the night sky and contemplating the vast cosmos above us. As both a software developer and an astronomy enthusiast, I've found fascinating parallels between understanding the universe and building software systems.

        ## Patterns Everywhere

        Just as astronomers look for patterns in celestial movements and cosmic phenomena, software developers seek patterns in code, user behavior, and system performance. Both disciplines require patience, observation, and the ability to see the bigger picture.

        ## Scale and Perspective

        Astronomy teaches us about scale in ways that few other fields can. When you're thinking about distances measured in light-years and timeframes spanning billions of years, it puts the challenges of software development into perspective.

        ## Lessons from the Cosmos

        **1. Embrace the Unknown**
        The universe is full of mysteries we don't yet understand. Similarly, in software development, we must be comfortable with uncertainty and unknown requirements.

        **2. Think in Systems**
        Celestial bodies don't exist in isolation—they're part of complex gravitational systems. Software components must also work together harmoniously.

        **3. Plan for the Long Term**
        Astronomical events unfold over vast timescales. Good software architecture considers long-term maintainability and evolution.

        ## Finding Wonder in Code

        Just as I find wonder in discovering a new nebula or tracking the path of a comet, I find similar joy in elegant code solutions and breakthrough moments in debugging.

        ## Conclusion

        Whether I'm debugging a complex system or observing Saturn's rings through a telescope, both activities remind me of the beauty of discovery and the importance of curiosity in driving innovation.
      `,
      date: "2025-08-21",
      readTime: "4 min read",
      tags: ["Astronomy", "Philosophy", "Software Development", "Personal"]
    }
  ];

  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  if (selectedPost) {
    return (
      <div className="min-h-screen">
        <header className="bg-white dark:bg-true-black border-b border-gray-200 dark:border-orange-500/20">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-retro">
              {selectedPost.title}
            </h1>
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(selectedPost.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {selectedPost.readTime}
              </div>
            </div>
          </div>
        </header>

        <article className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {selectedPost.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 font-retro">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2 font-retro">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {selectedPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-medium dark:shadow-orange-500/20 dark:shadow-sm font-retro"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white dark:bg-true-black border-b border-gray-200 dark:border-orange-500/20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <button
            onClick={onBackToHome}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-retro">
            My Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            Thoughts on technology, AI, cloud computing, business strategy, and astronomy
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-900/20 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500/50 dark:hover:border-orange-400/50 dark:hover:shadow-orange-500/20 dark:hover:shadow-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-retro">
                  {post.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-4 font-light leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full font-medium font-retro"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full font-medium font-retro">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;