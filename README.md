# mfolo

# متجر متابعين انستغرام

متجر إلكتروني احترافي لبيع متابعين انستغرام رقميين.

## المميزات

- ✅ تسجيل دخول عبر Google أو البريد الإلكتروني
- ✅ نظام طلبات شامل مع حالات مختلفة
- ✅ لوحة تحكم إدارية لإدارة الطلبات
- ✅ لوحة تحكم المستخدم لمتابعة الطلبات
- ✅ تكامل مع PayPal و Attijariwafa Bank
- ✅ إرسال بريد إلكتروني تلقائي بعد كل طلب
- ✅ تصميم احترافي مستوحى من الألعاب
- ✅ واجهة عربية بالكامل
- ✅ متجاوب مع جميع الأجهزة

## التقنيات المستخدمة

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Passport.js (Google OAuth)
- Nodemailer (إرسال البريد)

### Frontend
- React
- React Router
- Axios
- CSS3 (تنسيقات مخصصة)

## التثبيت

### 1. تثبيت التبعيات

```bash
npm run install-all
```

### 2. إعداد متغيرات البيئة

أنشئ ملف `.env` في المجلد الرئيسي:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instagram_store
JWT_SECRET=your-secret-key-here
EMAIL_USER=mo7am5dyt@gmail.com
EMAIL_PASS=your-app-password-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. إنشاء حساب المشرف

```bash
node server/scripts/createAdmin.js
```

### 4. تشغيل التطبيق

```bash
# تشغيل الخادم والعميل معاً
npm run dev

# أو بشكل منفصل
npm run server  # الخادم على المنفذ 5000
npm run client  # الواجهة على المنفذ 3000
```

## البنية

```
.
├── client/              # تطبيق React
│   ├── src/
│   │   ├── components/  # المكونات المشتركة
│   │   ├── context/     # React Context
│   │   ├── pages/       # الصفحات
│   │   └── App.js
│   └── public/
├── server/              # خادم Express
│   ├── config/          # إعدادات
│   ├── middleware/      # Middleware
│   ├── models/          # نماذج MongoDB
│   ├── routes/          # المسارات
│   ├── scripts/         # سكربتات مساعدة
│   ├── utils/           # وظائف مساعدة
│   └── index.js
└── package.json
```

## الصفحات

- `/` - الصفحة الرئيسية
- `/products` - عرض المنتجات والأسعار
- `/order` - إنشاء طلب جديد (يتطلب تسجيل دخول)
- `/login` - تسجيل الدخول
- `/register` - إنشاء حساب جديد
- `/profile` - حساب المستخدم (طلباتي)
- `/admin` - لوحة التحكم الإدارية (للمشرف فقط)
- `/terms` - شروط الاستخدام

## حساب المشرف الافتراضي

- البريد الإلكتروني: `M75@gmail.com`
- كلمة المرور: `Admin@123` (يُنصح بتغييرها بعد أول تسجيل دخول)

## معلومات الدفع

- **PayPal**: mohamedaitlhaj302@gmail.com
- **Attijariwafa Bank**: 5417554000635989

## حالة الطلبات

1. **In Review** - قيد المراجعة (الافتراضي)
2. **Redeem** - تم الموافقة
3. **Rejected** - تم رفض الطلب

## الترخيص

ISC
