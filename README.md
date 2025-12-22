# 我的博客

使用 Next.js 和 React 构建的个人博客，支持 Markdown 文章、标签分类、暗黑模式和评论功能。

## 功能特性

- ✅ Markdown/MDX 文章支持
- ✅ 代码语法高亮
- ✅ 文章标签系统
- ✅ 两级目录分类（技术/生活）
- ✅ 暗黑模式支持
- ✅ Giscus 评论系统（基于 GitHub Discussions）
- ✅ RSS 订阅
- ✅ SEO 优化（sitemap, robots.txt）

## 技术栈

- **Next.js 16** - App Router
- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **next-themes** - 主题切换
- **unified** - Markdown 处理
- **rehype-pretty-code** - 代码高亮
- **Giscus** - 评论系统

## 开始使用

### 安装依赖

```bash
npm install
```

### 配置 Giscus 评论

1. 在 GitHub 上创建一个仓库（如果还没有）
2. 在仓库设置中启用 Discussions
3. 访问 [Giscus](https://giscus.app/) 配置你的评论系统
4. 获取以下配置信息：
   - `data-repo`: 你的 GitHub 仓库（格式：username/repo）
   - `data-repo-id`: 仓库 ID
   - `data-category`: 分类名称
   - `data-category-id`: 分类 ID

5. 创建 `.env.local` 文件并添加以下环境变量：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

### 开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

### 添加文章

在 `content/computing/` 或 `content/life/` 目录下创建 Markdown 文件：

```markdown
---
title: "文章标题"
date: "2024-01-01"
description: "文章描述"
tags: ["标签1", "标签2"]
---

# 文章内容

这里是文章正文...
```

### 构建

```bash
npm run build
npm start
```

## 项目结构

```
my-blog/
├── app/                    # Next.js App Router 页面
│   ├── computing/         # 技术文章
│   ├── life/              # 生活随笔
│   ├── tags/              # 标签页面
│   └── about/             # 关于页面
├── components/            # React 组件
├── content/               # Markdown 文章
│   ├── computing/         # 技术文章目录
│   └── life/              # 生活文章目录
├── lib/                   # 工具函数
│   ├── content.ts         # 内容管理
│   └── types.ts           # 类型定义
└── public/                # 静态资源
```

## 许可证

MIT
