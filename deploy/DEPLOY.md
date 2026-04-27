# 🚀 Deploy LUMINA Prototype Online

Hướng dẫn deploy prototype lên web để share với stakeholders. Chọn 1 trong 3 options.

---

## ⚡ Option 1: GitHub Pages (Recommended)

**Tốt cho:** Demo lâu dài, miễn phí, custom domain
**URL:** `https://username.github.io/lumina-prototype/`
**Time:** ~5 phút

### A. Tự động (dùng script)

```bash
# macOS / Linux
cd lumina-prototype
chmod +x deploy-github.sh
./deploy-github.sh
```

```powershell
# Windows
cd lumina-prototype
.\deploy-github.ps1
```

Script sẽ hỏi GitHub username + repo name, rồi tự động push.

### B. Thủ công (5 steps)

#### Step 1: Tạo repo mới trên GitHub

1. Vào https://github.com/new
2. Repository name: `lumina-prototype` (hoặc tên khác)
3. **Public** (bắt buộc cho free GitHub Pages)
4. KHÔNG check "Add README" (vì sẽ conflict)
5. Click **Create repository**

#### Step 2: Push code

```bash
cd lumina-prototype

# Init git
git init
git branch -M main

# Add tất cả files
git add .
git commit -m "Initial commit: LUMINA prototype v1.0"

# Connect với GitHub repo (thay USERNAME)
git remote add origin git@github.com:USERNAME/lumina-prototype.git
# Hoặc HTTPS:
# git remote add origin https://github.com/USERNAME/lumina-prototype.git

# Push
git push -u origin main
```

#### Step 3: Enable GitHub Pages

1. Vào repo trên GitHub
2. **Settings** (tab) → **Pages** (sidebar)
3. **Source**: Deploy from a branch
4. **Branch**: `main` / `/ (root)`
5. Click **Save**

#### Step 4: Đợi build

GitHub sẽ build site khoảng 1-2 phút. Refresh trang Settings → Pages để xem URL.

#### Step 5: Mở demo

```
https://USERNAME.github.io/lumina-prototype/
```

### Update sau này

```bash
git add .
git commit -m "Update: <mô tả thay đổi>"
git push
```

GitHub auto-rebuild trong ~1 phút.

---

## ⚡ Option 2: Vercel (Fastest Setup)

**Tốt cho:** Deploy siêu nhanh, preview URLs cho mỗi commit, custom domain
**URL:** `https://lumina-prototype.vercel.app/`
**Time:** ~2 phút

### Cách 1: Drag & Drop (không cần git)

1. Đăng ký free account: https://vercel.com/signup
2. Vào https://vercel.com/new
3. **Drag** folder `lumina-prototype/` vào browser
4. Click **Deploy**
5. Done! URL hiện ra.

### Cách 2: CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Vào folder
cd lumina-prototype

# Deploy
vercel

# Hoặc deploy production
vercel --prod
```

CLI sẽ hỏi:
- Login account
- Project name → enter
- Framework → **Other**
- Build command → bỏ qua (Enter)
- Output directory → bỏ qua

---

## ⚡ Option 3: Netlify (Drag & Drop Simplest)

**Tốt cho:** Demo nhanh không cần account
**URL:** `https://random-name.netlify.app/`
**Time:** ~1 phút

### Cách 1: Drop zone (không cần account)

1. Mở https://app.netlify.com/drop
2. **Drag** folder `lumina-prototype/` vào dropzone
3. URL hiện ra ngay lập tức

⚠ Lưu ý: URL temporary, mất sau vài ngày. Để giữ lâu, đăng ký account free và claim site.

### Cách 2: Với account

1. Đăng ký: https://app.netlify.com/signup
2. **Add new site** → **Deploy manually**
3. Drag folder
4. Custom domain: site name có thể đổi

---

## 🎯 So sánh các options

| Feature | GitHub Pages | Vercel | Netlify |
|:--|:-:|:-:|:-:|
| **Free** | ✅ | ✅ | ✅ |
| **Custom domain free** | ✅ | ✅ | ✅ |
| **HTTPS auto** | ✅ | ✅ | ✅ |
| **CDN global** | ✅ | ✅✅ | ✅✅ |
| **Build time** | 1-2 min | <30s | <30s |
| **No git required** | ❌ | ✅ | ✅ |
| **Preview URLs** | ❌ | ✅ | ✅ |
| **Phù hợp cho prototype này** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Khuyến nghị:** GitHub Pages nếu muốn lưu lâu dài và có git. Vercel/Netlify nếu cần demo nhanh.

---

## 🔧 Troubleshooting

### "Permission denied (publickey)"

Cần setup SSH key cho GitHub:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub
# Copy output → GitHub Settings → SSH Keys → New SSH Key
```

Hoặc dùng HTTPS với Personal Access Token:
1. GitHub Settings → Developer settings → Personal Access Tokens
2. Generate new token với scope `repo`
3. Dùng token làm password khi push HTTPS

### "404 Not Found" sau khi enable Pages

- Đợi 2-5 phút (GitHub Pages cần build)
- Check Branch là `main` (không phải `master` cũ)
- Check folder path là `/ (root)`, không phải `/docs`

### Fonts không load (Google Fonts blank)

Prototype dùng Google Fonts CDN. Nếu deploy ở môi trường offline:
1. Download fonts (Fraunces, Inter Tight, JetBrains Mono)
2. Bỏ vào `assets/fonts/`
3. Update `shared/design-system.css` với @font-face local

### CSS/JS không load

Check đường dẫn relative trong HTML:
- ✅ `href="../shared/design-system.css"` (cho screens)
- ✅ `href="shared/design-system.css"` (cho index)
- ❌ `href="/shared/..."` (absolute path không work với GitHub Pages subdir)

### Hình ảnh không hiển thị

Prototype dùng emoji thay vì images, nên không có vấn đề. Nếu thêm images sau, đặt trong `assets/` và reference relative.

---

## 🌐 Custom Domain (Optional)

### GitHub Pages

1. Mua domain (Namecheap, GoDaddy, ...)
2. DNS records:
   ```
   Type: A     Name: @     Value: 185.199.108.153
   Type: A     Name: @     Value: 185.199.109.153
   Type: A     Name: @     Value: 185.199.110.153
   Type: A     Name: @     Value: 185.199.111.153
   Type: CNAME Name: www   Value: USERNAME.github.io
   ```
3. Repo Settings → Pages → Custom domain: `lumina.yourdomain.com`
4. Tạo file `CNAME` trong repo:
   ```
   echo "lumina.yourdomain.com" > CNAME
   git add CNAME && git commit -m "Add CNAME" && git push
   ```

### Vercel/Netlify

Settings → Domains → Add custom domain → follow DNS instructions.

---

## 📊 Analytics (Optional)

Track xem ai đang xem demo:

### Plausible (privacy-friendly)

Add vào `<head>` của `index.html`:
```html
<script defer data-domain="lumina.yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Google Analytics 4

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔒 Privacy / Access Control

Nếu prototype có thông tin nhạy cảm và chỉ muốn share với team:

### Option 1: Private GitHub Pages

GitHub Pages **public-only** với free plan. Để private cần:
- **GitHub Pro** ($4/month) → Private Pages
- Hoặc **GitHub Enterprise**

### Option 2: Vercel Password Protection

Vercel Pro plan ($20/month) có password protection cho preview deployments.

### Option 3: Cloudflare Access (free tier)

1. Deploy lên Cloudflare Pages (free)
2. Cloudflare Zero Trust → Add policy → Email-based access
3. Chỉ users trong list được vào

### Option 4: Simple basic auth (DIY)

Add file `.htaccess` (Apache) hoặc dùng Netlify built-in password.

---

## ✅ Checklist trước khi share

- [ ] All 20 screens load đúng (không 404)
- [ ] Navigation giữa các màn hoạt động
- [ ] Fonts (Fraunces, Inter Tight) load đúng
- [ ] Animations (breathing buddy, pulse glow) chạy
- [ ] Test trên Chrome + Firefox + Safari
- [ ] Test mobile responsive (Workspace có scroll OK)
- [ ] Demo banner switching scenario hoạt động
- [ ] HTTPS bật (browser không show "Not secure")
- [ ] URL share ngắn gọn, dễ nhớ
- [ ] Custom 404 page (optional)

---

## 🎬 Suggested URLs

Tránh dùng:
- ❌ `lumina-app` (giống production app)
- ❌ `lumina-mvp` (suggest unfinished)
- ❌ `test-prototype` (unprofessional)

Nên dùng:
- ✅ `lumina-prototype`
- ✅ `lumina-demo`
- ✅ `lumina-preview`
- ✅ `lumina-stakeholder-demo`

---

**Cần help? Check README.md hoặc liên hệ Claude để debug.** 🚀
