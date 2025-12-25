# 部署指南

本指南将帮助你将博客部署到云端。推荐使用 **Vercel**（Next.js 官方推荐平台），也可以选择其他平台。

## 🚀 方案一：Vercel 部署（推荐）

Vercel 是 Next.js 的创建者提供的平台，提供零配置部署、自动 CI/CD 和优秀的性能。

### 前置要求

1. 一个 GitHub 账号
2. 项目已推送到 GitHub 仓库

### 部署步骤

#### 1. 准备 GitHub 仓库

如果还没有将代码推送到 GitHub：

```bash
# 初始化 git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 在 GitHub 上创建新仓库，然后添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送到 GitHub
git push -u origin main
```

#### 2. 在 Vercel 上部署

1. **访问 Vercel**
   - 前往 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择你的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**
   - **Framework Preset**: Next.js（自动检测）
   - **Root Directory**: `./`（默认）
   - **Build Command**: `npm run build`（默认）
   - **Output Directory**: `.next`（默认）
   - **Install Command**: `npm install`（默认）

4. **配置环境变量**
   在 "Environment Variables" 部分添加以下变量：
   
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
   NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
   NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
   ```
   
   **注意**：
   - 将 `NEXT_PUBLIC_SITE_URL` 替换为你的实际域名（部署后 Vercel 会提供一个域名）
   - 其他 Giscus 相关变量需要从 [giscus.app](https://giscus.app/) 获取

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成（通常 1-2 分钟）
   - 部署成功后，你会获得一个类似 `your-project.vercel.app` 的域名

#### 3. 更新环境变量

部署完成后：

1. 在 Vercel 项目设置中，更新 `NEXT_PUBLIC_SITE_URL` 为你的实际域名
2. 重新部署以应用更改

#### 4. 自定义域名（可选）

1. 在 Vercel 项目设置中，进入 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

### 自动部署

Vercel 会自动：
- 监听 GitHub 仓库的推送
- 自动构建和部署新版本
- 为每个 Pull Request 创建预览部署

## 🌐 方案二：Netlify 部署

### 部署步骤

1. **访问 Netlify**
   - 前往 [netlify.com](https://netlify.com)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的 GitHub 仓库

3. **配置构建设置**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

4. **配置环境变量**
   在 "Site settings" → "Environment variables" 中添加环境变量

5. **部署**
   - 点击 "Deploy site"

## ☁️ 方案三：其他云平台

### Docker 部署

如果需要部署到其他支持 Docker 的平台（如 AWS、Azure、GCP 等），可以创建 Dockerfile：

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

然后需要在 `next.config.ts` 中启用 standalone 输出：

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
};
```

## 📝 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] 环境变量已配置
- [ ] `NEXT_PUBLIC_SITE_URL` 设置为实际域名
- [ ] Giscus 评论系统已配置
- [ ] 测试所有页面是否正常显示
- [ ] 测试 RSS 订阅功能
- [ ] 测试 sitemap 和 robots.txt
- [ ] 检查移动端显示效果

## 🔧 常见问题

### 构建失败

- 检查 Node.js 版本（推荐 20.x）
- 确保所有依赖都已安装
- 检查是否有 TypeScript 错误

### 环境变量不生效

- 确保变量名以 `NEXT_PUBLIC_` 开头（客户端变量）
- 重新部署项目
- 清除浏览器缓存

### 图片或资源加载失败

- 确保 `public` 目录中的文件已提交到 Git
- 检查路径是否正确

## 📚 相关资源

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Netlify 文档](https://docs.netlify.com/)

