export type Category = "computing" | "life";

export interface PostFrontmatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
}

export interface Post {
  slug: string;
  category: Category;
  frontmatter: PostFrontmatter;
  content: string;
}

