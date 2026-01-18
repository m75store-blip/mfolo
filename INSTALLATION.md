# دليل التثبيت والتشغيل

## المتطلبات الأساسية

- Node.js (الإصدار 14 أو أحدث)
- MongoDB (الإصدار 4.4 أو أحدث)
- npm أو yarn

## خطوات التثبيت

### 1. تثبيت التبعيات

قم بتشغيل الأمر التالي في المجلد الرئيسي:

```bash
npm install
```

ثم في مجلد العميل:

```bash
cd client
npm install
cd ..
```

أو استخدم الأمر المدمج:

```bash
npm run install-all
```

### 2. إعداد قاعدة البيانات

تأكد من أن MongoDB يعمل على جهازك:

```bash
# على Windows
net start MongoDB

# على macOS/Linux
sudo systemctl start mongod
# أو
brew services start mongodb-community
```

### 3. إعداد متغيرات البيئة

أنشئ ملف `.env` في المجلد الرئيسي مع المحتوى التالي:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instagram_store
JWT_SECRET=change-this-to-a-random-secret-key
EMAIL_USER=mo7am5dyt@gmail.com
EMAIL_PASS=your-gmail-app-password-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=change-this-to-a-random-session-secret
```

**ملاحظات مهمة:**

- **JWT_SECRET**: أنشئ مفتاح سري عشوائي (مثلاً باستخدام `openssl rand -hex 32`)
- **EMAIL_PASS**: هذا ليس كلمة مرور Gmail العادية، بل "كلمة مرور التطبيق" من Google Account Settings
- **GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET**: احصل عليهما من [Google Cloud Console](https://console.cloud.google.com/)

### 4. إعداد Gmail لإرسال البريد

1. اذهب إلى [Google Account Settings](https://myaccount.google.com/)
2. اختر "Security"
3. فعّل "2-Step Verification"
4. أنشئ "App Password" جديدة
5. استخدم هذه الكلمة في `EMAIL_PASS`

### 5. إعداد Google OAuth

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروعاً جديداً أو اختر مشروعاً موجوداً
3. فعّل "Google+ API"
4. اذهب إلى "Credentials" وأنشئ "OAuth 2.0 Client ID"
5. أضف Authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
6. انسخ `Client ID` و `Client Secret` إلى ملف `.env`

### 6. إنشاء حساب المشرف

قم بتشغيل السكربت التالي لإنشاء حساب المشرف:

```bash
node server/scripts/createAdmin.js
```

الحساب الافتراضي:
- البريد الإلكتروني: `M75@gmail.com`
- كلمة المرور: `Admin@123`

**⚠️ مهم:** غيّر كلمة المرور بعد أول تسجيل دخول!

### 7. تشغيل التطبيق

#### للتطوير (تشغيل الخادم والعميل معاً):

```bash
npm run dev
```

#### أو بشكل منفصل:

**في نافذة Terminal الأولى:**
```bash
npm run server
```

**في نافذة Terminal الثانية:**
```bash
npm run client
```

### 8. الوصول للتطبيق

- **الواجهة الأمامية:** http://localhost:3000
- **الخادم:** http://localhost:5000
- **API:** http://localhost:5000/api

## استكشاف الأخطاء

### مشكلة: MongoDB غير متصل

**الحل:**
- تأكد من أن MongoDB يعمل
- تحقق من أن `MONGODB_URI` صحيح في ملف `.env`

### مشكلة: خطأ في إرسال البريد الإلكتروني

**الحل:**
- تأكد من استخدام "App Password" وليس كلمة المرور العادية
- تحقق من تفعيل "2-Step Verification" في حساب Google

### مشكلة: Google OAuth لا يعمل

**الحل:**
- تحقق من `GOOGLE_CLIENT_ID` و `GOOGLE_CLIENT_SECRET` في `.env`
- تأكد من إضافة `http://localhost:5000/api/auth/google/callback` في Google Cloud Console

### مشكلة: الصفحات لا تظهر بشكل صحيح

**الحل:**
- تأكد من تثبيت جميع التبعيات: `npm run install-all`
- احذف مجلد `node_modules` وأعد التثبيت

## الإنتاج

لبناء التطبيق للإنتاج:

```bash
cd client
npm run build
cd ..
```

ثم قم بإعداد `NODE_ENV=production` في `.env` وستخدم الخادم ملفات الـ build تلقائياً.
