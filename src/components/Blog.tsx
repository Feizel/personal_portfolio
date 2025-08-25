import React, { useState } from "react";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";

interface BlogProps {
  onBackToHome: () => void;
}

const Blog = ({ onBackToHome }: BlogProps) => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Cloud Computing",
      excerpt:
        "Exploring how artificial intelligence is revolutionizing cloud infrastructure and what it means for developers and businesses.",
      content: `
        Artificial Intelligence is fundamentally transforming how we approach cloud computing. As someone working at AWS, I've witnessed firsthand the incredible innovations happening at the intersection of AI and cloud infrastructure.

        ## The Current Landscape

        Cloud providers are increasingly integrating AI capabilities directly into their platforms. From automated resource optimization and support case handling to intelligent monitoring and predictive scaling, AI is making cloud infrastructure smarter and more efficient.

        ## Key Developments

        **1. Automated Infrastructure Management**
        AI-powered systems can now predict resource needs, automatically scale applications, and optimize costs without human intervention.

        **2. Enhanced Security**
        Machine learning algorithms are detecting and responding to security threats faster than ever before, providing real-time protection for cloud environments.

        **3. Intelligent Data Processing**
        AI services are making it easier to extract insights from massive datasets, enabling businesses to notice trends & make data-driven decisions at a larger scale.

        ## Looking Ahead

        The future promises even more exciting developments. We're moving towards a world where cloud infrastructure will be self-healing, self-optimizing, and incredibly easy to use.

        As we continue to push the boundaries of what's possible, I'm excited to be part of this transformation and to share these insights with the community, in a safe way.
      `,
      date: "2025-05-15",
      readTime: "5 min read",
      tags: ["AI", "Cloud Computing", "AWS", "Technology"],
    },
    {
      id: 2,
      title: "The Business Impact of Cloud Migration",
      excerpt:
        "Cloud migration goes beyond IT modernization, it's a need for agility, global expansion, and innovation that reshapes how businesses operate and compete.",
      content: `
    Cloud migration is more than just a technical transformation; it's a business revolution. Having worked on a few migration projects (labs), I've seen first-hand how moving to the cloud impacts organizations across industries. The real story isn't just about cost savings; it's about how cloud adoption unlocks new opportunities for growth, agility, and innovation.

    ## Beyond Cost Savings

    Many companies begin their cloud journey with the promise of reduced IT spend, moving from capital expense infrastructure to flexible, pay-as-you-go models. But while cost reduction is often the primary driver, the true business value lies in the strategic advantages the cloud unlocks.

    ## Key Business Benefits

    **1. Agility and Speed**  
    Cloud platforms empower teams to experiment, deploy, and grow quickly. This agility allows businesses to pivot in response to market trends, test new products faster, and deliver value to customers without being slowed down by traditional infrastructure restrictions.

    **2. Global Reach**  
    With cloud infrastructure, companies can launch applications across regions almost immediately. Spreading into new markets no longer needs massive upfront investment in data centers or infrastructure, making global growth a realistic goal even for smaller businesses.

    **3. Innovation Enablement**  
    Cloud providers offer access to advanced technologies such as AI, machine learning, IoT, and data analytics. Instead of building these facilities from scratch, businesses can make use of these cloud offerings immediately, often with guidance, accelerating innovation and staying ahead of competitors.

    **4. Resilience and Reliability**  
    Cloud-native architectures bring built-in redundancy, automated backups, and disaster recovery strategies. This reduces the risk of downtime and ensures that critical applications remain available even during unexpected disruptions.

    ## Strategic Considerations

    Successful cloud migration isn't just about *"lifting and shifting"* existing applications. The real opportunity comes from reimagining business processes, optimizing applications for the cloud, and aligning technology with organizational goals. This requires careful planning, governance, and a long-term roadmap that balances quick wins with sustainable transformation.

    ## The Human Element

    Technology alone doesn't guarantee success. Cloud migration is as much about people and processes as it is about servers and services. Organizations must invest in reskilling employees, promoting a culture of continuous learning, and encouraging cross-functional collaboration. Without cultural alignment, even the best cloud strategy risks falling short.

    ## Conclusion

    Cloud computing is not a trend; it's a fundamental shift in how businesses operate. As industries continue to go digital, the cloud will remain a critical enabler of transformation and growth. The organizations that embrace migration strategically, with equal attention to people and processes, will be the ones that lead in the digital economy of AI.

    ---
    *Interested in learning more about cloud strategies? Stay tuned for upcoming posts where I'll share case studies and lessons from real-world migration projects.*
  `,
      date: "2025-06-09",
      readTime: "7 min read",
      tags: [
        "Business Strategy",
        "Cloud Migration",
        "Digital Transformation",
        "Innovation",
      ],
    },
    {
      id: 3,
      title: "Stargazing and Software: Finding Patterns in the Cosmos",
      excerpt:
        "How my passion for astronomy influences my approach to software development and problem-solving in technology.",
      content: `
        There's something pretty magical about looking up at the night sky and thinking about how BIG and mysterious the universe is. As someone who loves both software development and astronomy, I've noticed some cool similarities between exploring the stars and solving problems in tech.

        ## Patterns Everywhere

        Astronomers watch how stars and planets move, looking for patterns that tell a story. And as a developer, I'm doing the same thing, but with code, how users act, and how systems behave. Both jobs need patience, paying attention to details, and stepping back to see the whole picture.

        ## Scale and Perspective

        Astronomy really puts things into perspective. When you think about light-years and billions of years, software bugs and crashes suddenly seem a bit less scary.

        ## What the Cosmos Teaches Me

        **1. Get Comfortable with Not Knowing**
        The universe is full of stuff we haven't figured out yet. And in development, there are always unknowns and surprises. That's just part of the game.

        **2. See the Big Picture; Think in Systems**
        Stars and planets don't exist on their own, they are part of bigger systems working together. The same goes for software parts. They have to work well with each other.

        **3. Plan for the Long Term**
        Space events happen over millions or billions of years. In software, thinking about how your code will grow and change over time is super important, too.

        **4. Stay Curious and Keep Exploring**
        Astronomy never stops revealing new things. Similarly, in tech, there's always something new to learn or a better way to solve problems. Staying curious keeps things exciting.

        **5. Expect Things to Change**
        Planets and stars follow orbits but sometimes things change; a comet's path can shift or new discoveries can change our understanding of the cosmos. Software projects evolve too, so being flexible helps tackle unexpected twists.

        ## Finding Joy in Both Worlds
        There's a unique excitement to watching the stars (looking at you Pleiades), seeing a satellite pass overhead, or catching a comet in the sky, similar to the rush of writing pristine code or finally cracking a tough bug. Both moments remind me why I love learning and creating: the joy of discovery and the satisfaction of making things work.

        ## Conclusion
        Whether I'm debugging software or trying to find Saturn's rings 🪐, my favorite planet (I know, we all love Saturn), it all comes down to the same thing: a love of discovery and staying curious.
      `,
      date: "2025-07-13",
      readTime: "4 min read",
      tags: ["Astronomy", "Philosophy", "Software Development", "Personal"],
    },
    {
      id: 4,
      title: "Building Scalable Solutions: Lessons from My AWS Internship",
      excerpt:
        "Key insights and practical lessons learned while working on cloud solutions at Amazon Web Services (AWS).",
      content: `
        My journey as an AWS intern has been incredibly rewarding. Working on enterprise-scale solutions has taught me valuable lessons about building systems 
        that can handle massive workloads while maintaining reliability and performance.

        ## The Scale Challenge

        When you're dealing with systems that serve millions of users, every decision matters. From choosing the right database architecture to implementing 
        efficient caching strategies, scalability considerations shape every aspect of the design process. What looks like a small decision on paper, like how you 
        design your architecture or where you store your logging data, can become the difference between smooth sailing and painful bottlenecks when traffic grows.

        ## Key Lessons Learned

        **1. Design for Failure**
        In traditional on-premises networks, failure isn't just a possibility, it's inevitable. Building truly resilient systems requires planning for those 
        failures, designing networks that can take the hit and keep going. AWS takes this philosophy to the next level. 
        Its cloud infrastructure is built to absorb unexpected spikes in workloads, recover from outages, and defend against attacks. 
        The takeaway? Don't just ask *"What if this fails?"* Assume it will and design accordingly.

        **2. Shared Responsibility Model**
        With AWS, security is a shared responsibility. AWS secures the cloud itself, the physical infrastructure, hardware, and foundational services. 
        But customers are responsible for security in the cloud. This means ensuring proper configurations, protecting data, managing access, and applying best 
        practices. Put simply: AWS delivers a secure platform, but it's up to you to use it securely.

        **3. Monitor Everything**
        You can't improve what you don't measure. Complete monitoring and observability are crucial for understanding system behavior and spotting issues 
        before they spiral out of control. AWS services like CloudWatch, X-Ray, and CloudTrail give you visibility into what's happening under the hood, 
        letting you act proactively instead of reactively.

        **4. Automate Relentlessly**
        Manual processes don't scale well. Automation isn't just nice to have, it's essential. From Infrastructure-as-Code (IaC) with CloudFormation or CDK to 
        CI/CD pipelines, automation reduces human error and makes complex systems manageable.

        **5. Cost Awareness is Part of Design**
        One thing that surprised me is how closely scalability, performance, and cost are connected. Scaling up a system is one challenge; keeping it cost-efficient 
        is another. Building systems that can scale smartly and cost-effectively is a balance of performance and cost. AWS gives you tools like Trusted Advisor, 
        Compute Optimizer, and cost alerts, but ultimately, building cost-aware architectures means choosing the right services, using auto-scaling smartly, and 
        never over-provisioning just to "be safe." Basically Pay-as-you-go. 

        **6. Embrace Simplicity**
        When you're surrounded by powerful services and endless options, it's tempting to over-engineer. But the best solutions are often the simplest ones that 
        just work. AWS services like Step Functions, Lambda, and ECS are designed to resolve the problem directly without unnecessary complexity. Complexity stacks up
        when you need to scale, so every "extra" decision today can become tomorrow's maintenance headache.

        **7. Think Globally**
        A global platform means thinking beyond just one region or availability zone. Concepts like multi-region deployments, latency-based routing, and data 
        replication are essential for building systems that can handle global traffic. These concepts are not just for AWS but for any cloud infrastructure.

        ## Practical Applications

        These principles guided my work on various projects, from designing monitoring dashboards that gave real-time insights into system health to implementing 
        automated deployment pipelines that cut release times from hours to minutes. I even saw firsthand how small improvements, like optimizing log storage or 
        right-sizing EC2 instances, could result in significant performance and cost gains at scale. The common thread across all these projects? Thinking at scale 
        from day one. Whether it was security, monitoring, or cost optimization, every decision had ripple effects across performance, reliability, and user experience.

        ## Moving Forward

        As I continue my journey in cloud computing, these foundational lessons will shape how I approach future challenges and opportunities. Building scalable 
        solutions isn't about flashy architectures, but it's about resilience, simplicity, and constant improvement. 
        
        ## Conclusion
        My AWS internship has taught me that scalability isn't just about adding more machines; it's about building systems that can handle growth and adapt to 
        changing needs. As a developer, I'm excited to see how AWS is making cloud computing accessible and scalable for everyone.
      `,
      date: "2025-08-21",
      readTime: "9 min read",
      tags: ["AWS", "Scalability", "Internship", "Cloud Architecture"],
    },
  ];

  const [selectedPost, setSelectedPost] = useState<
    (typeof blogPosts)[0] | null
  >(null);

  if (selectedPost) {
    return (
      <div className="min-h-screen">
        <header className="bg-white dark:bg-true-black border-b border-gray-200 dark:border-orange-500/20 pt-16 md:pt-20">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </button>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-retro">
              {selectedPost.title}
            </h1>
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(selectedPost.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {selectedPost.readTime}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                Written by:{" "}
                <a
                  href="https://www.linkedin.com/in/feizel-ze-maduna/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 font-medium transition-colors duration-300 hover:underline"
                >
                  Feizel
                </a>
              </div>
            </div>
          </div>
        </header>

        <article className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {selectedPost.content
              .trim()
              .split("\n")
              .map((line, index) => {
                const trimmedLine = line.trim();

                // Skip empty lines
                if (!trimmedLine) {
                  return <div key={index} className="h-4"></div>;
                }

                // Handle headings
                if (trimmedLine.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 font-retro"
                    >
                      {trimmedLine.replace("## ", "")}
                    </h2>
                  );
                }

                // Handle numbered list items that start with **
                if (trimmedLine.match(/^\*\*\d+\./)) {
                  const match = trimmedLine.match(/^\*\*(\d+\..*)\*\*(.*)$/);
                  if (match) {
                    return (
                      <div key={index} className="mt-4 mb-2">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white font-retro">
                          {match[1]}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed mt-1">
                          {match[2]}
                        </p>
                      </div>
                    );
                  }
                }

                // Handle conclusion or other bold standalone text
                if (
                  trimmedLine.startsWith("**") &&
                  trimmedLine.endsWith("**") &&
                  !trimmedLine.includes(":")
                ) {
                  return (
                    <h3
                      key={index}
                      className="text-base md:text-lg font-semibold text-gray-900 dark:text-white font-retro mt-6 mb-2"
                    >
                      {trimmedLine.replace(/\*\*/g, "")}
                    </h3>
                  );
                }

                // Handle regular paragraphs with inline formatting
                const renderFormattedText = (text: string) => {
                  // Handle bold text
                  const parts = text.split(/\*\*(.*?)\*\*/g);
                  return parts.map((part, i) => {
                    if (i % 2 === 1) {
                      return (
                        <strong
                          key={i}
                          className="font-semibold text-gray-900 dark:text-white"
                        >
                          {part}
                        </strong>
                      );
                    }
                    // Handle italic text within non-bold parts
                    const italicParts = part.split(/\*(.*?)\*/g);
                    return italicParts.map((italicPart, j) =>
                      j % 2 === 1 ? (
                        <em key={`${i}-${j}`} className="italic">
                          {italicPart}
                        </em>
                      ) : (
                        italicPart
                      )
                    );
                  });
                };

                return (
                  <p
                    key={index}
                    className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
                  >
                    {renderFormattedText(trimmedLine)}
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
      <header className="bg-white dark:bg-true-black border-b border-gray-200 dark:border-orange-500/20 pt-16 md:pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <button
            onClick={onBackToHome}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </button>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-retro">
            My Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light">
            Thoughts on technology, AI, cloud computing, business strategy, and
            astronomy
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
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-retro">
                  {post.title}
                </h2>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 font-light leading-relaxed">
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
