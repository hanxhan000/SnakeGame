@echo off
echo ========================================
echo    贪吃蛇游戏 - 启动服务器
echo ========================================
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到Python，请直接双击打开index.html文件
    echo.
    pause
    exit /b 1
)

echo [信息] 正在启动本地服务器...
echo [信息] 服务器地址: http://localhost:8080
echo.
echo ========================================
echo  请在浏览器中访问：http://localhost:8080
echo  按 Ctrl+C 可停止服务器
echo ========================================
echo.

cd /d "%~dp0"
python -m http.server 8080
