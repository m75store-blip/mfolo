# دليل نشر المشروع على GitHub

## المتطلبات الأساسية

1. **تثبيت Git** (إذا لم يكن مثبتاً):
   - اذهب إلى: https://git-scm.com/download/win
   - قم بتنزيل وتثبيت Git لـ Windows
   - بعد التثبيت، أعد تشغيل Terminal

## خطوات النشر على GitHub

### 1. تثبيت Git (إذا لم يكن مثبتاً)

```bash
# تحقق من تثبيت Git
git --version
```

إذا ظهرت رسالة خطأ، قم بتثبيت Git من الموقع أعلاه.

### 2. إنشاء حساب GitHub (إذا لم يكن لديك)

- اذهب إلى: https://github.com
- سجل حساب جديد أو سجل الدخول

### 3. إنشاء Repository جديد على GitHub

1. اذهب إلى GitHub.com
2. اضغط على زر **"+"** في الأعلى → **"New repository"**
3. أدخل اسم المستودع: `instagram-followers-store`
4. اختر **Public** أو **Private**
5. **لا** تختر "Initialize this repository with README"
6. اضغط **"Create repository"**

### 4. تهيئة Git في المشروع

افتح Terminal في مجلد المشروع وقم بتنفيذ الأوامر التالية:

```bash
# تهيئة Git repository
git init

# إضافة جميع الملفات
git add .

# عمل أول commit
git commit -m "Initial commit: Instagram Followers Store"

# إضافة remote repository (استبدل YOUR_USERNAME باسمك على GitHub)
git remote add origin https://github.com/YOUR_USERNAME/instagram-followers-store.git

# تغيير اسم الفرع الرئيسي إلى main
git branch -M main

# رفع الملفات إلى GitHub
git push -u origin main
```

### 5. إذا طُلب منك بيانات تسجيل الدخول

- **Username**: اسم المستخدم على GitHub
- **Password**: استخدم **Personal Access Token** (ليس كلمة المرور العادية)

#### كيفية إنشاء Personal Access Token:

1. اذهب إلى: https://github.com/settings/tokens
2. اضغط **"Generate new token"** → **"Generate new token (classic)"**
3. أدخل اسم للتوكن (مثلاً: "My Computer")
4. اختر الصلاحيات:
   - ✅ `repo` (Full control of private repositories)
5. اضغط **"Generate token"**
6. **انسخ التوكن واحفظه** (لن تتمكن من رؤيته مرة أخرى)
7. استخدم هذا التوكن كـ password عند `git push`

## الأوامر الكاملة (نسخ ولصق)

استبدل `YOUR_USERNAME` باسمك على GitHub:

```bash
git init
git add .
git commit -m "Initial commit: Instagram Followers Store - Professional E-commerce for Instagram Followers"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/instagram-followers-store.git
git push -u origin main
```

## تحديث المشروع لاحقاً

عندما تجري تغييرات وتريد رفعها:

```bash
git add .
git commit -m "Description of changes"
git push
```

## ملاحظات مهمة

1. **لا ترفع ملف `.env`** - تأكد من وجوده في `.gitignore`
2. **لا ترفع `node_modules/`** - يجب أن تكون في `.gitignore`
3. **احذف `package-lock.json` إذا أردت** (اختياري) - يمكن إنشاؤه مرة أخرى

## رابط المشروع بعد النشر

بعد النشر بنجاح، سيكون رابط المشروع:
```
https://github.com/YOUR_USERNAME/instagram-followers-store
```

استبدل `YOUR_USERNAME` باسمك الحقيقي على GitHub.
