"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export function Giscus() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const giscusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const giscusTheme = resolvedTheme === "dark" ? "dark" : "light";

    // 清除现有内容
    if (giscusRef.current) {
      giscusRef.current.innerHTML = "";
    }

    // 创建 script 标签
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", process.env.NEXT_PUBLIC_GISCUS_REPO || "YOUR_USERNAME/YOUR_REPO");
    script.setAttribute("data-repo-id", process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "YOUR_REPO_ID");
    script.setAttribute("data-category", process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements");
    script.setAttribute("data-category-id", process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "YOUR_CATEGORY_ID");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", giscusTheme);
    script.setAttribute("data-lang", "zh-CN");
    script.crossOrigin = "anonymous";
    script.async = true;

    if (giscusRef.current) {
      giscusRef.current.appendChild(script);
    }

    return () => {
      // 清理
      if (giscusRef.current) {
        giscusRef.current.innerHTML = "";
      }
    };
  }, [mounted, theme, resolvedTheme]);

  if (!mounted) {
    return <div className="min-h-[200px]" />;
  }

  return <div ref={giscusRef} className="giscus" />;
}

