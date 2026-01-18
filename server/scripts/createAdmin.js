const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/instagram_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ تم الاتصال بقاعدة البيانات');
  
  const adminEmail = 'M75@gmail.com';
  let admin = await User.findOne({ email: adminEmail });
  
  if (!admin) {
    admin = new User({
      email: adminEmail,
      password: 'Admin@123', // يجب تغييرها بعد أول تسجيل دخول
      name: 'المشرف',
      isAdmin: true
    });
    await admin.save();
    console.log('✅ تم إنشاء حساب المشرف بنجاح');
  } else {
    admin.isAdmin = true;
    await admin.save();
    console.log('✅ تم تحديث حساب المشرف');
  }
  
  process.exit();
})
.catch(err => {
  console.error('❌ خطأ:', err);
  process.exit(1);
});
