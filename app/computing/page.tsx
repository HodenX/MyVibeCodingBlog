import { getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";

export default function ComputingPage() {
  const posts = getAllPosts("computing");

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
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

