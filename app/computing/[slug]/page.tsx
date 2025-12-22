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
  const posts = getAllPosts("computing");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug("computing", slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/computing"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← 返回技术文章
        </Link>
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {post.frontmatter.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-4">
              <time dateTime={post.frontmatter.date}>
                {format(new Date(post.frontmatter.date), "yyyy年MM月dd日", {
                  locale: zhCN,
                })}
              </time>
            </div>
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

