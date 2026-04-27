# ============================================
# LUMINA Prototype — Deploy to GitHub Pages
# PowerShell version cho Windows
# ============================================
# Usage: .\deploy-github.ps1
# Yêu cầu: Git for Windows + GitHub account
# ============================================

# Clear screen
Clear-Host

Write-Host "╔══════════════════════════════════════╗" -ForegroundColor Blue
Write-Host "║   LUMINA Prototype Deploy Script    ║" -ForegroundColor Blue
Write-Host "║   Target: GitHub Pages              ║" -ForegroundColor Blue
Write-Host "╚══════════════════════════════════════╝" -ForegroundColor Blue
Write-Host ""

# Check if we're in the right folder
if (-not (Test-Path "index.html")) {
    Write-Host "❌ Error: index.html không tìm thấy" -ForegroundColor Red
    Write-Host "Chạy script này từ trong folder lumina-prototype/" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path "screens")) {
    Write-Host "❌ Error: folder screens/ không tìm thấy" -ForegroundColor Red
    exit 1
}

# Check git
$gitVersion = git --version 2>$null
if (-not $gitVersion) {
    Write-Host "❌ Error: git chưa được cài" -ForegroundColor Red
    Write-Host "Tải về: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Get GitHub username
Write-Host "📝 Nhập GitHub username:" -ForegroundColor Yellow
$GITHUB_USER = Read-Host ">"

if ([string]::IsNullOrWhiteSpace($GITHUB_USER)) {
    Write-Host "❌ Username không được để trống" -ForegroundColor Red
    exit 1
}

# Get repo name
Write-Host "📝 Tên repo (default: lumina-prototype):" -ForegroundColor Yellow
$REPO_NAME = Read-Host ">"
if ([string]::IsNullOrWhiteSpace($REPO_NAME)) {
    $REPO_NAME = "lumina-prototype"
}

$DEPLOY_URL = "https://$GITHUB_USER.github.io/$REPO_NAME/"
Write-Host ""
Write-Host "📦 Sẽ deploy lên: $DEPLOY_URL" -ForegroundColor Blue
Write-Host ""

$confirm = Read-Host "Tiếp tục? (y/n)"
if ($confirm -ne "y") {
    Write-Host "Đã hủy." -ForegroundColor Yellow
    exit 0
}

# Connection type
Write-Host ""
Write-Host "Chọn cách kết nối GitHub:" -ForegroundColor Yellow
Write-Host "  1) HTTPS (cần Personal Access Token)"
Write-Host "  2) SSH (đã setup SSH key) — recommended"
$connType = Read-Host "Chọn 1 hoặc 2"

if ($connType -eq "1") {
    $REMOTE_URL = "https://github.com/$GITHUB_USER/$REPO_NAME.git"
} else {
    $REMOTE_URL = "git@github.com:$GITHUB_USER/$REPO_NAME.git"
}

Write-Host ""
Write-Host "🔧 Bắt đầu deploy..." -ForegroundColor Blue
Write-Host ""

# Init git if needed
if (-not (Test-Path ".git")) {
    Write-Host "→ Init git repo..." -ForegroundColor Green
    git init
    git branch -M main
} else {
    Write-Host "→ Git repo đã tồn tại, skip init" -ForegroundColor Yellow
}

# Create .gitignore
if (-not (Test-Path ".gitignore")) {
    Write-Host "→ Tạo .gitignore..." -ForegroundColor Green
    @"
# OS
.DS_Store
Thumbs.db
desktop.ini

# Editor
.vscode/
.idea/
*.swp

# Logs
*.log

# Temp
tmp/
temp/
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8
}

# Add files
Write-Host "→ Add files..." -ForegroundColor Green
git add .

# Commit
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "Deploy LUMINA prototype v1.0 - $timestamp"
Write-Host "→ Commit: $commitMsg" -ForegroundColor Green
git commit -m $commitMsg 2>&1 | Out-Null

# Set up remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "→ Update remote URL..." -ForegroundColor Yellow
    git remote set-url origin $REMOTE_URL
} else {
    Write-Host "→ Add remote origin: $REMOTE_URL" -ForegroundColor Green
    git remote add origin $REMOTE_URL
}

# Push
Write-Host "→ Push lên GitHub..." -ForegroundColor Green
Write-Host ""
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Push thất bại. Kiểm tra:" -ForegroundColor Red
    Write-Host "  - Repo đã được tạo trên GitHub chưa?" -ForegroundColor Yellow
    Write-Host "  - SSH key/Personal Access Token có hợp lệ không?" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "╔══════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   ✅ DEPLOY THÀNH CÔNG!             ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Bước cuối — Enable GitHub Pages:" -ForegroundColor Blue
Write-Host ""
Write-Host "1. Mở browser, truy cập:"
Write-Host "   https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Trong 'Build and deployment':"
Write-Host "   - Source: Deploy from a branch" -ForegroundColor Green
Write-Host "   - Branch: main / (root)" -ForegroundColor Green
Write-Host "   - Click Save" -ForegroundColor Green
Write-Host ""
Write-Host "3. Đợi 1-2 phút..."
Write-Host ""
Write-Host "🌐 Demo sẽ live tại:" -ForegroundColor Blue
Write-Host "   $DEPLOY_URL" -ForegroundColor Green
Write-Host ""
