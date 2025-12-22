import { getAllTags, getPostsByTag } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/tags"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← 返回所有标签
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          标签: {tag}
        </h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={`${post.category}-${post.slug}`} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

