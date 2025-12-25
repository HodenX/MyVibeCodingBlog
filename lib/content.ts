import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, Category, PostFrontmatter } from "./types";

const contentDirectory = path.join(process.cwd(), "content");

export function getPostSlugs(category: Category): string[] {
  const categoryPath = path.join(contentDirectory, category);
  if (!fs.existsSync(categoryPath)) {
    return [];
  }
  return fs
    .readdirSync(categoryPath)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/, ""));
}

export function getPostBySlug(
  category: Category,
  slug: string
): Post | null {
  const categoryPath = path.join(contentDirectory, category);
  
  // Decode URL-encoded slug (Next.js may pass encoded or decoded)
  const decodedSlug = decodeURIComponent(slug);
  
  const fullPath = path.join(categoryPath, `${decodedSlug}.md`);
  const fullPathMdx = path.join(categoryPath, `${decodedSlug}.mdx`);

  let filePath: string | null = null;
  if (fs.existsSync(fullPath)) {
    filePath = fullPath;
  } else if (fs.existsSync(fullPathMdx)) {
    filePath = fullPathMdx;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: decodedSlug, // Store the decoded slug (original filename)
    category,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export function getAllPosts(category?: Category): Post[] {
  const categories: Category[] = category
    ? [category]
    : ["computing", "life"];

  const allPosts: Post[] = [];

  for (const cat of categories) {
    const slugs = getPostSlugs(cat);
    for (const slug of slugs) {
      const post = getPostBySlug(cat, slug);
      if (post && !post.frontmatter.draft) {
        allPosts.push(post);
      }
    }
  }

  return allPosts.sort((a, b) => {
    const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    // Handle invalid dates - put them at the end
    if (isNaN(dateA) && isNaN(dateB)) return 0;
    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;
    return dateB - dateA;
  });
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(
    (post) => post.frontmatter.tags?.includes(tag)
  );
}

export interface PaginatedPosts {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}

export function getPaginatedPosts(
  posts: Post[],
  page: number = 1,
  postsPerPage: number = 10
): PaginatedPosts {
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPages,
    currentPage,
    totalPosts,
  };
}

