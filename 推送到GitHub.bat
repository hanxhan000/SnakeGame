@echo off
chcp 65001 >nul
echo ========================================
echo    推送到GitHub
echo ========================================
echo.
echo 仓库信息：
echo - 用户名：hanxhan000
echo - 仓库名：snake-game
echo - 远程地址：https://github.com/hanxhan000/snake-game.git
echo.
echo ========================================
echo 重要提醒
echo ========================================
echo.
echo 在推送之前，请确保：
echo 1. 已在GitHub创建仓库 snake-game
echo 2. 仓库设置为 Public（公开）
echo 3. 没有勾选 "Add a README file"
echo.
echo 如果还没创建，请访问：
echo https://github.com/new
echo.

pause

echo.
echo [信息] 开始推送到GitHub...
echo [提示] 首次推送会弹出登录窗口
echo.
echo 认证方式：
echo - 使用Personal Access Token（推荐）
echo - 或使用GitHub Desktop
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✓ 推送成功！
    echo ========================================
    echo.
    echo 代码已成功推送到GitHub！
    echo.
    echo 仓库地址：
    echo https://github.com/hanxhan000/snake-game
    echo.
    echo ========================================
    echo 下一步：启用GitHub Pages
    echo ========================================
    echo.
    echo 1. 访问仓库：https://github.com/hanxhan000/snake-game
    echo 2. 点击 Settings
    echo 3. 左侧菜单找到 Pages
    echo 4. Source 选择 main 分支
    echo 5. 点击 Save
    echo.
    echo 等待1-3分钟后，游戏将在以下地址可访问：
    echo https://hanxhan000.github.io/snake-game/
    echo.
    echo ========================================
    echo 🎉 部署即将完成！
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ✗ 推送失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. 仓库还未在GitHub创建
    echo 2. GitHub身份验证失败
    echo 3. 网络连接问题
    echo.
    echo 解决方法：
    echo 1. 确认已在GitHub创建仓库
    echo 2. 使用Personal Access Token
    echo    访问：https://github.com/settings/tokens
    echo 3. 或使用GitHub Desktop
    echo.
    echo 详细说明请查看：GitHub部署指南.md
)

echo.
pause
