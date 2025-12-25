import { getAllPosts, getPostBySlug } from "@/lib/content";
import { MarkdownContent } from "@/components/markdown-content";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Giscus } from "@/components/giscus";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts("life");
  return posts.map((post) => ({
    slug: encodeURIComponent(post.slug), // Encode slug for URL (handles spaces and special chars)
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug("life", slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/life"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          返回生活随笔
        </Link>
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {post.frontmatter.title}
            </h1>
            {post.frontmatter.date && (() => {
              const date = new Date(post.frontmatter.date);
              const isValidDate = !isNaN(date.getTime());
              return isValidDate ? (
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-4">
                  <time dateTime={post.frontmatter.date}>
                    {format(date, "yyyy年MM月dd日", {
                      locale: zhCN,
                    })}
                  </time>
                </div>
              ) : null;
            })()}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {post.frontmatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>
          <div className="prose-wrapper">
            <MarkdownContent content={post.content} />
          </div>
        </article>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Giscus />
        </div>
      </div>
    </div>
  );
}

