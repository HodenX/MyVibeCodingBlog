import { getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            欢迎来到我的博客
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            记录想法与技术思考
          </p>
        </div>

        <div className="mb-8 flex gap-4 justify-center">
          <Link
            href="/computing"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            技术文章
          </Link>
          <Link
            href="/life"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            生活随笔
          </Link>
        </div>

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
