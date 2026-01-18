# 🚀 بدء سريع - نشر المشروع على GitHub

## الطريقة السريعة

### 1️⃣ تثبيت Git

إذا لم يكن Git مثبتاً على جهازك:
- اذهب إلى: **https://git-scm.com/download/win**
- قم بتنزيل وتثبيت Git
- أعد تشغيل Terminal بعد التثبيت

### 2️⃣ إنشاء Repository على GitHub

1. اذهب إلى **https://github.com**
2. اضغط على **"+"** → **"New repository"**
3. اسم المشروع: `instagram-followers-store`
4. اختر **Public** أو **Private**
5. **⚠️ لا تختر "Initialize with README"**
6. اضغط **"Create repository"**

### 3️⃣ تنفيذ الأوامر

افتح **PowerShell** أو **Command Prompt** في مجلد المشروع، ثم انسخ والصق الأوامر التالية:

```powershell
# الخطوة 1: تهيئة Git
git init

# الخطوة 2: إضافة جميع الملفات
git add .

# الخطوة 3: عمل commit
git commit -m "Initial commit: Instagram Followers Store"

# الخطوة 4: إضافة remote (استبدل YOUR_USERNAME باسمك على GitHub)
git remote add origin https://github.com/YOUR_USERNAME/instagram-followers-store.git

# الخطوة 5: تغيير اسم الفرع
git branch -M main

# الخطوة 6: رفع المشروع
git push -u origin main
```

### 4️⃣ بيانات تسجيل الدخول

عند `git push`، سيطلب منك:

- **Username**: اسم المستخدم على GitHub
- **Password**: استخدم **Personal Access Token** (ليس كلمة المرور العادية)

#### كيفية إنشاء Token:

1. اذهب إلى: **https://github.com/settings/tokens**
2. اضغط **"Generate new token"** → **"Generate new token (classic)"**
3. اسم للتوكن: `My Computer`
4. الصلاحيات: ✅ **`repo`** (Full control of private repositories)
5. اضغط **"Generate token"**
6. **انسخ التوكن واحفظه** (لن تراه مرة أخرى!)
7. استخدمه كـ password عند `git push`

---

## ✅ بعد النشر بنجاح

رابط المشروع سيكون:
```
https://github.com/YOUR_USERNAME/instagram-followers-store
```

استبدل `YOUR_USERNAME` باسمك الحقيقي.

---

## 📝 تحديث المشروع لاحقاً

عندما تجري تغييرات:

```powershell
git add .
git commit -m "وصف التغييرات"
git push
```

---

## ⚠️ تحذير

- ملف `.env` لن يُرفع (آمن - محمي في .gitignore)
- مجلد `node_modules` لن يُرفع (لا حاجة له)
- لا ترفع معلومات حساسة!

---

## 🆘 مشاكل شائعة

### Git غير موجود
```powershell
# تحقق من التثبيت
git --version

# إذا لم يكن مثبتاً، قم بتثبيته من:
# https://git-scm.com/download/win
```

### خطأ في الاسم
```powershell
# إزالة remote خاطئ
git remote remove origin

# إضافة remote جديد (باسم صحيح)
git remote add origin https://github.com/YOUR_USERNAME/instagram-followers-store.git
```

### رفض الدفع (Authentication failed)
- استخدم **Personal Access Token** وليس كلمة المرور
- تأكد من صلاحية `repo` في التوكن
