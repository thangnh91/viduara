#!/bin/bash

# ============================================
# LUMINA Prototype — Deploy to GitHub Pages
# ============================================
# Usage: ./deploy-github.sh
# Chạy script này từ TRONG folder lumina-prototype/
#
# Yêu cầu:
# - Git đã cài đặt (git --version)
# - GitHub account với SSH key đã setup
# - Có repo trống trên GitHub
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   LUMINA Prototype Deploy Script    ║${NC}"
echo -e "${BLUE}║   Target: GitHub Pages              ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════╝${NC}"
echo ""

# Check if we're in the right folder
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: index.html không tìm thấy${NC}"
    echo -e "${YELLOW}Chạy script này từ trong folder lumina-prototype/${NC}"
    exit 1
fi

if [ ! -d "screens" ]; then
    echo -e "${RED}❌ Error: folder screens/ không tìm thấy${NC}"
    exit 1
fi

# Check git installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Error: git chưa được cài${NC}"
    echo -e "${YELLOW}Tải về tại: https://git-scm.com/downloads${NC}"
    exit 1
fi

# Get GitHub username
echo -e "${YELLOW}📝 Nhập GitHub username của bạn:${NC}"
read -p "> " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo -e "${RED}❌ Username không được để trống${NC}"
    exit 1
fi

# Get repo name
echo -e "${YELLOW}📝 Tên repo trên GitHub (default: lumina-prototype):${NC}"
read -p "> " REPO_NAME
REPO_NAME=${REPO_NAME:-lumina-prototype}

# Confirm URL
DEPLOY_URL="https://${GITHUB_USER}.github.io/${REPO_NAME}/"
echo ""
echo -e "${BLUE}📦 Sẽ deploy lên:${NC} ${DEPLOY_URL}"
echo ""
read -p "Tiếp tục? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Đã hủy.${NC}"
    exit 0
fi

# Choose remote URL type
echo ""
echo -e "${YELLOW}Chọn cách kết nối GitHub:${NC}"
echo "  1) HTTPS (cần Personal Access Token khi push)"
echo "  2) SSH (đã setup SSH key) — recommended"
read -p "Chọn 1 hoặc 2: " CONN_TYPE

if [ "$CONN_TYPE" = "1" ]; then
    REMOTE_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
else
    REMOTE_URL="git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
fi

echo ""
echo -e "${BLUE}🔧 Bắt đầu deploy...${NC}"
echo ""

# Initialize git if not already
if [ ! -d ".git" ]; then
    echo -e "${GREEN}→ Init git repo...${NC}"
    git init
    git branch -M main
else
    echo -e "${YELLOW}→ Git repo đã tồn tại, skip init${NC}"
fi

# Create .gitignore
if [ ! -f ".gitignore" ]; then
    echo -e "${GREEN}→ Tạo .gitignore...${NC}"
    cat > .gitignore << 'EOF'
# OS
.DS_Store
Thumbs.db
desktop.ini

# Editor
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log

# Temp
tmp/
temp/
EOF
fi

# Create README badge for GitHub repo (optional pretty README)
if [ ! -f "README.md" ]; then
    echo -e "${YELLOW}→ README.md không có, tạo bản tối thiểu...${NC}"
    cat > README.md << EOF
# LUMINA Prototype

🚀 **Live Demo:** ${DEPLOY_URL}

The Career Pre-Experience — EdTech platform cho học sinh THPT trải nghiệm "sống thử" 1 nghề trong 7 ngày.

## Tech
- 20 screens HTML interactive
- 3 domains: Software Engineering, Medical, Marketing
- Static prototype, no backend
EOF
fi

# Add all files
echo -e "${GREEN}→ Add files vào git...${NC}"
git add .

# Commit
COMMIT_MSG="Deploy LUMINA prototype v1.0 - $(date '+%Y-%m-%d %H:%M')"
echo -e "${GREEN}→ Commit: ${COMMIT_MSG}${NC}"
git commit -m "$COMMIT_MSG" || echo -e "${YELLOW}  (Nothing to commit, skipping)${NC}"

# Set up remote
if git remote get-url origin &> /dev/null; then
    echo -e "${YELLOW}→ Remote 'origin' đã tồn tại, update URL...${NC}"
    git remote set-url origin "$REMOTE_URL"
else
    echo -e "${GREEN}→ Add remote origin: ${REMOTE_URL}${NC}"
    git remote add origin "$REMOTE_URL"
fi

# Push
echo -e "${GREEN}→ Push lên GitHub...${NC}"
echo ""
git push -u origin main

echo ""
echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ DEPLOY THÀNH CÔNG!             ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📝 Bước cuối — Enable GitHub Pages:${NC}"
echo ""
echo "1. Mở browser, truy cập:"
echo -e "   ${YELLOW}https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages${NC}"
echo ""
echo "2. Trong section 'Build and deployment':"
echo "   - Source: ${GREEN}Deploy from a branch${NC}"
echo "   - Branch: ${GREEN}main${NC} / ${GREEN}/ (root)${NC}"
echo "   - Click ${GREEN}Save${NC}"
echo ""
echo "3. Đợi 1-2 phút để GitHub build site..."
echo ""
echo -e "${BLUE}🌐 Sau khi GitHub Pages enable, demo sẽ live tại:${NC}"
echo -e "   ${GREEN}${DEPLOY_URL}${NC}"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "   - Mỗi lần update prototype, chạy:"
echo -e "     ${BLUE}git add . && git commit -m \"update\" && git push${NC}"
echo "   - GitHub Pages tự động rebuild trong ~1 phút"
echo ""
