# 📤 تعليمات النشر على GitHub

## ⚠️ خطأ: Git غير مثبت

يبدو أن Git غير مثبت على جهازك. يجب تثبيت Git أولاً قبل النشر.

## 🔧 خطوات التثبيت:

### 1. تثبيت Git

1. اذهب إلى: **https://git-scm.com/download/win**
2. قم بتنزيل Git لـ Windows
3. قم بتثبيته (استخدم الإعدادات الافتراضية)
4. **أعد تشغيل PowerShell/Terminal** بعد التثبيت

### 2. التحقق من التثبيت

افتح PowerShell جديد واكتب:
```powershell
git --version
```

إذا ظهر رقم الإصدار، فالتثبيت نجح ✅

### 3. تشغيل السكريبت

بعد تثبيت Git، شغّل السكريبت التلقائي:

```powershell
.\deploy.ps1
```

أو نفّذ الأوامر يدوياً:

```powershell
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/m75store-blip/mfolo.git
git push -u origin main
```

## 🔐 بيانات تسجيل الدخول

عند `git push`، سيطلب منك:

- **Username**: `m75store-blip`
- **Password**: استخدم **Personal Access Token** (ليس كلمة المرور العادية)

### كيفية إنشاء Personal Access Token:

1. اذهب إلى: **https://github.com/settings/tokens**
2. اضغط **"Generate new token"** → **"Generate new token (classic)"**
3. اسم للتوكن: `My Computer`
4. الصلاحيات: ✅ **`repo`** (Full control of private repositories)
5. اضغط **"Generate token"**
6. **انسخ التوكن واحفظه** (لن تراه مرة أخرى!)
7. استخدمه كـ password عند `git push`

## ✅ بعد النشر

رابط المشروع:
```
https://github.com/m75store-blip/mfolo
```

---

## 📝 ملاحظة

تم تحديث `README.md` وإضافة `# mfolo` في الأعلى ✅
