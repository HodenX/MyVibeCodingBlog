import { getAllPosts, getPaginatedPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import { Pagination } from "@/components/pagination";
import { Suspense } from "react";

interface ComputingPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ComputingPage({ searchParams }: ComputingPageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const allPosts = getAllPosts("computing");
  const { posts, totalPages } = getPaginatedPosts(allPosts, currentPage);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          技术文章
        </h1>
        {posts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            暂无技术文章
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            <Suspense fallback={null}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/computing"
              />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}

