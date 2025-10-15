@echo off
chcp 65001 >nul
echo ========================================
echo    GitHub 更新脚本
echo ========================================
echo.

REM 检查是否是Git仓库
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 当前目录不是Git仓库
    echo 请先运行 "部署到GitHub.bat" 进行初始部署
    echo.
    pause
    exit /b 1
)

echo [信息] 检查文件变化...
git status

echo.
echo ========================================
echo 请输入本次更新的描述（例如：修复bug、添加新功能等）：
set /p COMMIT_MSG=

if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=Update game
)

echo.
echo [信息] 添加所有变化的文件...
git add .

echo.
echo [信息] 创建提交: %COMMIT_MSG%
git commit -m "%COMMIT_MSG%"

echo.
echo [信息] 推送到GitHub...
git push

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✓ 更新成功！
    echo ========================================
    echo.
    echo 你的游戏已更新，稍等1-3分钟后生效
    echo GitHub Pages会自动重新部署
    echo.
) else (
    echo.
    echo ========================================
    echo ✗ 更新失败
    echo ========================================
    echo.
    echo 请检查网络连接和GitHub身份验证
)

echo.
pause
