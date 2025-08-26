import { marked } from 'marked';

// Import markdown files as text
import aiCloudPost from '../blogposts/ai-cloud-computing.md?raw';
import cloudMigrationPost from '../blogposts/cloud-migration-business-impact.md?raw';
import stargazingPost from '../blogposts/stargazing-software-patterns.md?raw';
import awsInternshipPost from '../blogposts/aws-internship-scalable-solutions.md?raw';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
}

// Simple frontmatter parser
const parseFrontmatter = (content: string) => {
  const lines = content.split('\n');
  if (lines[0].trim() !== '---') return { data: {}, content };
  
  const endIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (endIndex === -1) return { data: {}, content };
  
  const frontmatterLines = lines.slice(1, endIndex);
  const data: Record<string, string | string[]> = {};
  
  frontmatterLines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      if (key === 'tags') {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = [];
        }
      } else {
        data[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  });
  
  const markdownContent = lines.slice(endIndex + 1).join('\n').trim();
  
  return {
    data,
    content: markdownContent
  };
};

const markdownFiles = [
  aiCloudPost,
  cloudMigrationPost,
  stargazingPost,
  awsInternshipPost
];

let cachedPosts: BlogPost[] | null = null;

export const loadBlogPosts = (): BlogPost[] => {
  if (cachedPosts) return cachedPosts;
  
  const posts: BlogPost[] = [];
  
  markdownFiles.forEach(fileContent => {
    const { data, content } = parseFrontmatter(fileContent);
    
    posts.push({
      id: Number(data.id),
      slug: data.slug as string,
      title: data.title as string,
      excerpt: data.excerpt as string,
      content: content,
      date: data.date as string,
      readTime: data.readTime as string,
      tags: (data.tags as string[]) || []
    });
  });
  
  cachedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return cachedPosts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  const posts = loadBlogPosts();
  return posts.find(post => post.slug === slug) || null;
};

export const renderMarkdown = (content: string): string => {
  return marked(content) as string;
};

// To add a new blog post:
// 1. Create a new .md file in /src/blogposts/ with proper frontmatter
// 2. Add the import statement above (e.g., import newPost from '../blogposts/new-post.md?raw';)
// 3. Add the imported content to the markdownFiles array