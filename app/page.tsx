import { getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";

export default function Home() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            最新文章
          </h2>
          {posts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              暂无文章，请添加一些内容到 content 目录
            </p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={`${post.category}-${post.slug}`} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
