import { getAllPosts } from "@/lib/content";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>我的博客</title>
    <description>记录想法与技术思考</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => {
          const encodedSlug = encodeURIComponent(post.slug);
          const pubDate = post.frontmatter.date 
            ? new Date(post.frontmatter.date).toUTCString() 
            : new Date().toUTCString();
          return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <description>${escapeXml(
        post.frontmatter.description || ""
      )}</description>
      <link>${siteUrl}/${post.category}/${encodedSlug}</link>
      <guid>${siteUrl}/${post.category}/${encodedSlug}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`;
        }
      )
      .join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

