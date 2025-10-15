@echo off
chcp 65001 >nul
echo ========================================
echo    GitHub 部署脚本
echo ========================================
echo.

REM 检查Git是否安装
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到Git，请先安装Git
    echo 下载地址: https://git-scm.com/downloads
    echo.
    pause
    exit /b 1
)

echo [步骤1] 配置Git用户信息
echo.
echo 请输入你的GitHub用户名（例如：zhangsan）：
set /p USERNAME=

echo.
echo 请输入你的邮箱（例如：zhangsan@example.com）：
set /p EMAIL=

echo.
echo [信息] 配置Git用户信息...
git config user.name "%USERNAME%"
git config user.email "%EMAIL%"

echo [信息] 用户信息配置完成
echo.

echo [步骤2] 检查Git仓库状态
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo [信息] 初始化Git仓库...
    git init
)

echo.
echo [步骤3] 添加所有文件到Git
git add .

echo.
echo [步骤4] 创建提交
git commit -m "Initial commit: HTML5 Snake Game"

echo.
echo ========================================
echo [步骤5] 关联GitHub远程仓库
echo ========================================
echo.
echo 现在需要在GitHub上创建一个新仓库：
echo 1. 访问：https://github.com/new
echo 2. 仓库名称：snake-game （可自定义）
echo 3. 选择 Public（公开）
echo 4. 不要勾选 "Initialize with README"
echo 5. 点击 "Create repository"
echo.
echo 创建完成后，请输入你的仓库名称（例如：snake-game）：
set /p REPO_NAME=

echo.
echo [信息] 关联远程仓库...
git remote add origin https://github.com/%USERNAME%/%REPO_NAME%.git

echo.
echo [信息] 重命名分支为main...
git branch -M main

echo.
echo ========================================
echo [步骤6] 推送到GitHub
echo ========================================
echo.
echo [信息] 准备推送到GitHub...
echo [提示] 首次推送时，会弹出登录窗口
echo         请使用你的GitHub账号登录
echo         或使用Personal Access Token
echo.
pause

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✓ 推送成功！
    echo ========================================
    echo.
    echo [步骤7] 启用GitHub Pages
    echo.
    echo 请按以下步骤操作：
    echo 1. 访问你的仓库：https://github.com/%USERNAME%/%REPO_NAME%
    echo 2. 点击 Settings（设置）
    echo 3. 左侧菜单找到 Pages
    echo 4. Source 选择 main 分支
    echo 5. 文件夹选择 / (root)
    echo 6. 点击 Save
    echo.
    echo 等待1-3分钟后，你的游戏将在以下地址可访问：
    echo https://%USERNAME%.github.io/%REPO_NAME%/
    echo.
    echo ========================================
    echo 🎉 部署完成！
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ✗ 推送失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. GitHub身份验证失败
    echo 2. 仓库名称输入错误
    echo 3. 网络连接问题
    echo.
    echo 请检查错误信息，或查看 GitHub部署指南.md
)

echo.
pause
