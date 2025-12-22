import Link from "next/link";
import { Post } from "@/lib/types";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <Link href={`/${post.category}/${post.slug}`}>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {post.frontmatter.title}
        </h2>
      </Link>
      {post.frontmatter.description && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {post.frontmatter.description}
        </p>
      )}
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
        <time dateTime={post.frontmatter.date}>
          {format(new Date(post.frontmatter.date), "yyyy年MM月dd日", {
            locale: zhCN,
          })}
        </time>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="flex gap-2">
            {post.frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

