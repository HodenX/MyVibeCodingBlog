export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          关于
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            欢迎来到我的个人博客！
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            这个博客使用 Next.js 和 React 构建，主要用于记录我在技术学习和实践过程中的一些思考和总结。
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">
            技术栈
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Next.js 16 (App Router)</li>
            <li>React 19</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Markdown/MDX</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

