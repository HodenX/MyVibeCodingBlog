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
  const fullPath = path.join(categoryPath, `${slug}.md`);
  const fullPathMdx = path.join(categoryPath, `${slug}.mdx`);

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
    slug,
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
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
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

