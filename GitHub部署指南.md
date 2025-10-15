# 🚀 GitHub部署指南

本指南将帮助你将贪吃蛇游戏部署到GitHub Pages，让全世界都能在线访问你的游戏！

---

## 📋 部署前准备

### 1. 确保已安装Git
检查Git是否已安装：
```bash
git --version
```

如果未安装，请访问：https://git-scm.com/downloads

### 2. 拥有GitHub账号
如果还没有GitHub账号，请访问：https://github.com/signup

---

## 🎯 方法一：使用命令行部署（推荐）

### 步骤1：初始化Git仓库
```bash
cd d:\app\Qoder-snake
git init
```

### 步骤2：添加所有文件
```bash
git add .
```

### 步骤3：创建首次提交
```bash
git commit -m "🎮 初始提交：HTML5贪吃蛇游戏"
```

### 步骤4：在GitHub上创建仓库
1. 访问：https://github.com/new
2. 仓库名称：`snake-game` 或 `qoder-snake`
3. 描述：HTML5 Snake Game with Leaderboard and Sound Effects
4. 选择 **Public**（公开仓库才能使用免费的GitHub Pages）
5. **不要**勾选 "Initialize with README"
6. 点击 "Create repository"

### 步骤5：关联远程仓库
将下面命令中的 `YOUR_USERNAME` 替换为你的GitHub用户名：
```bash
git remote add origin https://github.com/YOUR_USERNAME/snake-game.git
```

### 步骤6：重命名分支为main（如果需要）
```bash
git branch -M main
```

### 步骤7：推送到GitHub
```bash
git push -u origin main
```

第一次推送时，会要求输入GitHub用户名和密码（或Personal Access Token）

### 步骤8：启用GitHub Pages
1. 进入你的仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 下拉菜单选择 **main** 分支
5. 文件夹选择 **/ (root)**
6. 点击 **Save**

### 步骤9：等待部署完成
- 通常需要1-3分钟
- 部署成功后，会显示访问链接：
  ```
  https://YOUR_USERNAME.github.io/snake-game/
  ```

---

## 🎯 方法二：使用GitHub Desktop（适合新手）

### 步骤1：下载GitHub Desktop
访问：https://desktop.github.com/

### 步骤2：登录GitHub账号
打开GitHub Desktop，登录你的GitHub账号

### 步骤3：创建新仓库
1. 点击 **File** → **Add Local Repository**
2. 选择项目文件夹：`d:\app\Qoder-snake`
3. 如果提示仓库不存在，点击 **Create Repository**

### 步骤4：发布到GitHub
1. 填写仓库名称：`snake-game`
2. 添加描述（可选）
3. 确保勾选 **Public**
4. 点击 **Publish repository**

### 步骤5：启用GitHub Pages
参考方法一的步骤8

---

## 🎯 方法三：直接上传到GitHub（最简单）

### 步骤1：创建新仓库
1. 访问：https://github.com/new
2. 填写仓库信息（参考方法一步骤4）
3. 点击 "Create repository"

### 步骤2：上传文件
1. 在仓库页面，点击 **Add file** → **Upload files**
2. 将项目文件夹中的所有文件拖拽到页面
3. 填写提交信息：`Initial commit: HTML5 Snake Game`
4. 点击 **Commit changes**

### 步骤3：启用GitHub Pages
参考方法一的步骤8

---

## 🔧 配置Personal Access Token（推荐）

从2021年8月起，GitHub不再支持密码认证，推荐使用Personal Access Token：

### 创建Token
1. 访问：https://github.com/settings/tokens
2. 点击 **Generate new token** → **Generate new token (classic)**
3. 设置名称：`Snake Game Deploy`
4. 勾选权限：**repo**（所有仓库权限）
5. 点击 **Generate token**
6. **复制并保存Token**（只显示一次！）

### 使用Token
当Git推送时要求输入密码，输入Token而不是GitHub密码

---

## ✅ 部署成功后

### 访问你的游戏
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

### 分享链接
你可以将这个链接分享给朋友，或者添加到：
- 简历中
- 作品集网站
- 社交媒体

### 自定义域名（可选）
如果你有自己的域名，可以在GitHub Pages设置中配置

---

## 🔄 更新游戏

每次修改游戏后，使用以下命令推送更新：

```bash
git add .
git commit -m "描述你的修改"
git push
```

GitHub Pages会自动重新部署，通常1-3分钟后生效。

---

## 🎨 优化建议

### 添加Open Graph标签（社交分享优化）
在 `index.html` 的 `<head>` 中添加：
```html
<meta property="og:title" content="HTML5贪吃蛇游戏">
<meta property="og:description" content="简约风格的贪吃蛇游戏，支持音效和排行榜">
<meta property="og:image" content="screenshot.png">
<meta property="og:url" content="https://YOUR_USERNAME.github.io/snake-game/">
```

### 添加Favicon
1. 创建一个 `favicon.ico` 文件
2. 在 `index.html` 的 `<head>` 中添加：
```html
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

### 添加Google Analytics（可选）
跟踪游戏访问数据

---

## 🐛 常见问题

### Q: 推送时提示权限错误
**A**: 检查是否使用了Personal Access Token，确保Token有repo权限

### Q: GitHub Pages显示404
**A**: 
- 确认已在Settings → Pages中启用
- 确认选择了正确的分支（main）
- 等待3-5分钟让部署完成

### Q: 游戏无法正常运行
**A**: 
- 检查浏览器控制台是否有错误
- 确认所有文件都已正确上传
- 检查文件路径是否正确

### Q: 想要更改仓库名称
**A**: 
1. 进入仓库Settings
2. 在Repository name处修改
3. 访问链接也会相应改变

---

## 📊 GitHub仓库优化

### 添加README徽章
在README.md顶部添加：
```markdown
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange)
```

### 添加Topics标签
在仓库页面点击设置图标，添加相关标签：
- `html5-game`
- `snake-game`
- `javascript`
- `canvas`
- `game-development`

---

## 🎉 恭喜！

现在你的贪吃蛇游戏已经在线了！你可以：
- ✅ 在任何设备上访问
- ✅ 分享给朋友
- ✅ 添加到作品集
- ✅ 继续开发和改进

---

## 📚 下一步

1. **添加截图**：拍一张游戏截图，添加到README
2. **写博客**：分享开发经验
3. **收集反馈**：让朋友试玩并提供建议
4. **持续改进**：添加新功能

---

## 🆘 需要帮助？

- GitHub Pages文档：https://pages.github.com/
- Git教程：https://git-scm.com/book/zh/v2
- GitHub文档：https://docs.github.com/cn

---

**祝你部署顺利！🚀**
