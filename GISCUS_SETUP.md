# Giscus 评论系统配置指南

Giscus 是一个基于 GitHub Discussions 的评论系统，用户可以使用 GitHub 账号登录并发表评论。

## 配置步骤

### 1. 启用 GitHub Discussions

1. 前往你的 GitHub 仓库
2. 进入 **Settings** > **General**
3. 在 **Features** 部分，勾选 **Discussions**
4. 点击 **Set up discussions** 或直接访问 `https://github.com/YOUR_USERNAME/YOUR_REPO/discussions`

### 2. 安装 Giscus App

1. 访问 [Giscus App 安装页面](https://github.com/apps/giscus)
2. 点击 **Install** 按钮
3. 选择你的仓库（可以是所有仓库或特定仓库）
4. 完成安装

### 3. 获取配置信息

1. 访问 [Giscus 配置页面](https://giscus.app/)
2. 填写以下信息：
   - **Repository**: 选择你的仓库（格式：username/repo）
   - **Discussion Category**: 选择或创建一个分类（如 "Announcements"）
   - **Page ↔️ Discussions mapping**: 选择 "URL pathname"
   - **Discussion category for new discussions**: 选择你的分类
   - **Features**: 根据需要启用（建议启用 reactions）
   - **Theme**: 选择 "preferred color scheme"（会自动跟随网站主题）

3. 滚动到页面底部，你会看到配置代码，其中包含：
   - `data-repo`
   - `data-repo-id`
   - `data-category`
   - `data-category-id`

### 4. 配置环境变量

在项目根目录创建 `.env.local` 文件（如果还没有），添加以下内容：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

**注意**：将 `your-username/your-repo` 和相应的 ID 替换为你在 Giscus 配置页面获取的实际值。

### 5. 重启开发服务器

配置完成后，重启开发服务器：

```bash
npm run dev
```

### 6. 测试评论功能

1. 访问任意文章页面
2. 滚动到页面底部，应该能看到评论区域
3. 点击 "Sign in with GitHub" 登录
4. 尝试发表一条评论

## 故障排除

### 评论区域不显示

- 检查环境变量是否正确配置
- 确认 Giscus App 已安装到你的仓库
- 检查浏览器控制台是否有错误信息

### 主题不匹配

- Giscus 组件会自动跟随网站的暗黑模式
- 如果主题不正确，检查 `components/giscus.tsx` 中的主题配置

### 评论不显示

- 确认 Discussions 已在仓库中启用
- 检查选择的分类是否存在
- 确认 Giscus App 有访问 Discussions 的权限

## 更多信息

- [Giscus 官方文档](https://github.com/giscus/giscus)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)

