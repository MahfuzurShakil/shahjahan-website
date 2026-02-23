# 🚀 সম্পূর্ণ ডিপ্লয় ও কন্টেন্ট আপডেট গাইড

---

## ধাপ ১: GitHub-এ কোড আপলোড করুন

### GitHub অ্যাকাউন্ট তৈরি
1. https://github.com এ যান → Sign up (বিনামূল্যে)

### Repository তৈরি
1. GitHub-এ লগইন করুন
2. উপরে **"+"** বাটন → **"New repository"**
3. Repository name: `shahjahan-website`
4. **Private** রাখুন (বা Public)
5. **"Create repository"** ক্লিক করুন

### VS Code থেকে কোড আপলোড
VS Code Terminal-এ একে একে চালান:

```bash
git init
git add .
git commit -m "Initial website upload"
git branch -M main
git remote add origin https://github.com/আপনার-username/shahjahan-website.git
git push -u origin main
```

---

## ধাপ ২: Netlify-তে Deploy করুন

1. https://netlify.com → **Sign up free** (GitHub দিয়েই লগইন করুন)
2. Dashboard-এ → **"Add new site"** → **"Import an existing project"**
3. **"Deploy with GitHub"** → আপনার repository সিলেক্ট করুন
4. Build settings (auto detect হবে):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **"Deploy site"** ক্লিক করুন

### ✅ 2 মিনিটে সাইট লাইভ!
Netlify একটি URL দেবে যেমন: `https://random-name-123.netlify.app`

### Custom Domain যোগ করুন
1. Netlify Dashboard → Site settings → Domain management
2. **"Add custom domain"** → আপনার domain লিখুন (যেমন: `shahjahanmp.com`)
3. Namecheap/GoDaddy-তে DNS settings:
   ```
   Type: CNAME
   Name: www
   Value: random-name-123.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5  (Netlify's IP)
   ```

---

## ধাপ ৩: Formspree Setup (Contact Form → Email)

1. https://formspree.io → **Sign up free** (Gmail দিয়ে)
2. **"New form"** → Form name: "Shahjahan MP Contact"
3. আপনার Gmail address দিন যেখানে email পাবেন
4. Form তৈরি হলে **Form ID** copy করুন (যেমন: `xpzvwkrg`)
5. `src/config.js` ফাইলে এই লাইনটি আপডেট করুন:
   ```js
   id: 'xpzvwkrg',  // ← আপনার real ID
   ```
6. GitHub-এ push করুন → Netlify auto deploy হবে

**Test করুন:** ওয়েবসাইটের Contact পেজ থেকে একটি test message পাঠান।

---

## ধাপ ৪: WhatsApp Number Setup

`src/config.js` এ:
```js
whatsapp: {
  number: '8801711234567',  // ← আপনার WhatsApp number
  // Format: 880 (Bangladesh code) + number without 0
  // Example: 01711234567 → 8801711234567
}
```

---

## ধাপ ৫: Google Sheets CMS Setup

এটা করলে **ওয়েবসাইটের News, Gallery ও Videos Google Sheet থেকে auto update হবে।**

### Google Sheet তৈরি করুন

1. https://sheets.google.com → **"+" নতুন sheet**
2. Sheet-এর নাম দিন: `Shahjahan MP Website CMS`

### Sheet Tabs তৈরি করুন

নিচের ৩টি tab তৈরি করুন (Sheet1, Sheet2... rename করুন):

---

#### 📋 Tab: `news`

| id | title | excerpt | date | category | image | featured |
|----|-------|---------|------|----------|-------|----------|
| 1 | উখিয়ায় নতুন হাসপাতাল | সংক্ষিপ্ত বিবরণ... | ১৫ ফেব্রুয়ারি ২০২৫ | উন্নয়ন | https://... | TRUE |
| 2 | টেকনাফে সহায়তা | সংক্ষিপ্ত... | ০৮ ফেব্রুয়ারি ২০২৫ | সামাজিক | https://... | FALSE |

**category options:** উন্নয়ন, সামাজিক, সংসদ, শিক্ষা, স্বাস্থ্য

---

#### 🖼️ Tab: `gallery`

| id | url | caption | category | featured |
|----|-----|---------|----------|----------|
| 1 | https://res.cloudinary.com/... | সংসদ অধিবেশন | সংসদ | FALSE |
| 2 | https://res.cloudinary.com/... | রাস্তা উদ্বোধন | উন্নয়ন | FALSE |

**ছবির URL:** Cloudinary থেকে নিন (নিচে দেখুন)

---

#### ▶️ Tab: `videos`

| id | title | youtubeId | date | description | category |
|----|-------|-----------|------|-------------|----------|
| 1 | সংসদে বক্তৃতা | dQw4w9WgXcQ | ১৫ জানুয়ারি ২০২৫ | বিবরণ... | সংসদ |

**youtubeId:** YouTube URL থেকে `?v=` এর পরের অংশ
- URL: `https://youtube.com/watch?v=ABC123xyz`
- youtubeId: `ABC123xyz`

---

### Sheet Publish করুন

**প্রতিটি tab-এর জন্য আলাদাভাবে করতে হবে:**

1. `news` tab select করুন
2. **File → Share → Publish to web**
3. "Link" dropdown থেকে **"news"** tab select করুন
4. Format: **"Comma-separated values (.csv)"**
5. **"Publish"** ক্লিক করুন
6. URL copy করুন (কাজে লাগবে না, শুধু publish করলেই হবে)
7. `gallery` ও `videos` tab-এর জন্যও একইভাবে করুন

### Config-এ Enable করুন

`src/config.js` ফাইলে Sheet ID paste করুন:

```js
const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms';
// ↑ আপনার Sheet URL থেকে এই অংশটি copy করুন:
// https://docs.google.com/spreadsheets/d/[ এই অংশ ]/edit
```

তারপর enable করুন:
```js
news:    { enabled: true,  url: ... },
gallery: { enabled: true,  url: ... },
videos:  { enabled: true,  url: ... },
```

GitHub-এ push করুন → 2 মিনিটে live!

---

## ধাপ ৬: Cloudinary (Image Hosting)

1. https://cloudinary.com → **Free signup**
2. Dashboard → **Media Library → Upload**
3. ছবি upload করুন
4. ছবিতে right-click → **"Copy URL"**
5. Google Sheet-এর `gallery` tab-এ `url` column-এ paste করুন

**Free tier:** 25GB storage, 25GB bandwidth/month — যথেষ্ট!

---

## 📱 Content Update Workflow (Daily Use)

### নতুন সংবাদ যোগ করতে:
```
Google Sheet খুলুন
→ "news" tab
→ নতুন row-এ তথ্য লিখুন
→ Save (auto)
→ ওয়েবসাইটে 5 মিনিটের মধ্যে update ✅
```

### নতুন ছবি যোগ করতে:
```
Cloudinary-তে ছবি upload
→ URL copy
→ Google Sheet "gallery" tab-এ new row
→ 5 মিনিটে live ✅
```

### নতুন ভিডিও যোগ করতে:
```
YouTube-এ video upload (বা existing video)
→ URL থেকে ID copy করুন
→ Google Sheet "videos" tab-এ new row
→ 5 মিনিটে live ✅
```

---

## 💰 মোট খরচ (প্রতি বছর)

| সার্ভিস | খরচ |
|--------|------|
| Domain (.com) | ~$12/year |
| Netlify Hosting | **FREE** |
| Formspree | **FREE** (50 messages/month) |
| Cloudinary | **FREE** (25GB) |
| Google Sheets | **FREE** |
| **মোট** | **~$12/year** |

---

## 🆘 সমস্যা হলে

**Website দেখা যাচ্ছে না:**
- Netlify dashboard → Deploys → দেখুন error আছে কিনা

**Form submit হচ্ছে না:**
- config.js-এ Formspree ID সঠিক কিনা চেক করুন
- Formspree dashboard-এ form verified কিনা দেখুন

**Google Sheet update হচ্ছে না:**
- Sheet সঠিকভাবে publish হয়েছে কিনা দেখুন
- config.js-এ `enabled: true` আছে কিনা দেখুন
- Browser cache clear করুন (Ctrl+Shift+R)
