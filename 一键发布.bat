@echo off
chcp 65001 >nul
title GitHub一键发布 - Snake Game
color 0A

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║         🚀 GitHub 一键发布脚本                     ║
echo ║         Snake Game by hanxhan000                   ║
echo ╚════════════════════════════════════════════════════╝
echo.

echo [步骤1/4] 检查Git状态...
git status
echo.

echo [步骤2/4] 打开GitHub创建仓库页面...
start https://github.com/new
echo.
echo ┌────────────────────────────────────────────────────┐
echo │ 📋 请在浏览器中创建仓库：                          │
echo │                                                    │
echo │ Repository name: snake-game                        │
echo │ Description: HTML5 Snake Game with Leaderboard     │
echo │ Visibility: ✓ Public (公开)                       │
echo │ ⚠️ 不要勾选任何初始化选项                          │
echo │                                                    │
echo │ 创建完成后，按任意键继续...                       │
echo └────────────────────────────────────────────────────┘
pause > nul
echo.

echo [步骤3/4] 推送代码到GitHub...
echo.
echo ┌────────────────────────────────────────────────────┐
echo │ 🔐 准备推送到：                                    │
echo │ https://github.com/hanxhan000/snake-game.git       │
echo │                                                    │
echo │ 💡 认证提示：                                      │
echo │ - 首次推送需要登录GitHub                          │
echo │ - 推荐使用Personal Access Token                   │
echo │ - Token获取：https://github.com/settings/tokens   │
echo └────────────────────────────────────────────────────┘
echo.
pause

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ╔════════════════════════════════════════════════════╗
    echo ║         ✅ 代码推送成功！                          ║
    echo ╚════════════════════════════════════════════════════╝
    echo.
    
    echo [步骤4/4] 启用GitHub Pages...
    echo.
    echo ┌────────────────────────────────────────────────────┐
    echo │ 📝 请按以下步骤操作：                              │
    echo │                                                    │
    echo │ 1. 访问仓库页面（按任意键自动打开）               │
    echo │    https://github.com/hanxhan000/snake-game        │
    echo │                                                    │
    echo │ 2. 点击仓库顶部的 Settings（设置）                │
    echo │                                                    │
    echo │ 3. 左侧菜单找到 Pages                              │
    echo │                                                    │
    echo │ 4. Source 配置：                                   │
    echo │    - Branch: main                                  │
    echo │    - Folder: / (root)                              │
    echo │                                                    │
    echo │ 5. 点击 Save 按钮                                  │
    echo │                                                    │
    echo │ 6. 等待1-3分钟，部署完成                          │
    echo └────────────────────────────────────────────────────┘
    echo.
    pause
    
    echo.
    echo 正在打开仓库页面...
    start https://github.com/hanxhan000/snake-game
    timeout /t 2 /nobreak > nul
    
    echo.
    echo ╔════════════════════════════════════════════════════╗
    echo ║         🎉 部署流程完成！                          ║
    echo ╚════════════════════════════════════════════════════╝
    echo.
    echo 📌 重要信息：
    echo.
    echo ┌────────────────────────────────────────────────────┐
    echo │ 🌐 在线游戏地址（部署完成后访问）：                │
    echo │ https://hanxhan000.github.io/snake-game/           │
    echo │                                                    │
    echo │ 📦 GitHub仓库地址：                                │
    echo │ https://github.com/hanxhan000/snake-game           │
    echo │                                                    │
    echo │ 🔄 后续更新：运行 "更新到GitHub.bat"               │
    echo └────────────────────────────────────────────────────┘
    echo.
    
) else (
    echo.
    echo ╔════════════════════════════════════════════════════╗
    echo ║         ❌ 推送失败                                ║
    echo ╚════════════════════════════════════════════════════╝
    echo.
    echo 可能原因：
    echo 1. ⚠️ GitHub仓库还未创建
    echo 2. 🔐 身份验证失败
    echo 3. 🌐 网络连接问题
    echo.
    echo 解决方法：
    echo.
    echo 方案1：使用Personal Access Token
    echo   → 访问：https://github.com/settings/tokens
    echo   → 创建Token（勾选repo权限）
    echo   → 推送时用Token代替密码
    echo.
    echo 方案2：使用GitHub Desktop
    echo   → 下载：https://desktop.github.com/
    echo   → 登录后发布仓库
    echo.
    echo 详细说明：查看 "GitHub部署指南.md"
    echo.
)

echo.
echo 按任意键退出...
pause > nul
