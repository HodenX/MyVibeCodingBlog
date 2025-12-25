import Link from "next/link";
import { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // Encode slug for URL to handle spaces and special characters
  const encodedSlug = encodeURIComponent(post.slug);
  
  return (
    <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <Link href={`/${post.category}/${encodedSlug}`}>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {post.frontmatter.title}
        </h2>
      </Link>
      {post.frontmatter.description && (
        <p className="text-gray-600 dark:text-gray-400">
          {post.frontmatter.description}
        </p>
      )}
    </article>
  );
}

