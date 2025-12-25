import { getAllTags, getPostsByTag, getPaginatedPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import { Pagination } from "@/components/pagination";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface TagPageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const allPosts = getPostsByTag(tag);

  if (allPosts.length === 0) {
    notFound();
  }

  const { posts, totalPages } = getPaginatedPosts(allPosts, currentPage);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/tags"
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
          返回所有标签
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          标签: {tag}
        </h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={`${post.category}-${post.slug}`} post={post} />
          ))}
        </div>
        <Suspense fallback={null}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/tags/${encodeURIComponent(tag)}`}
          />
        </Suspense>
      </div>
    </div>
  );
}

