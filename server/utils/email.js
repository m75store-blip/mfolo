const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'mo7am5dyt@gmail.com',
    pass: process.env.EMAIL_PASS || '' // يجب إضافة كلمة مرور التطبيق من Gmail
  }
});

const sendOrderEmail = async (order) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'mo7am5dyt@gmail.com',
      to: 'mo7am5dyt@gmail.com',
      subject: `طلب جديد - ${order.quantity} متابع`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; background-color: #1a1a1a; color: #fff;">
          <h2 style="color: #00ff88;">طلب جديد</h2>
          <div style="background-color: #2a2a2a; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>رقم الطلب:</strong> ${order._id}</p>
            <p><strong>اسم المستخدم في انستغرام:</strong> ${order.username}</p>
            <p><strong>الكمية:</strong> ${order.quantity} متابع</p>
            <p><strong>السعر:</strong> ${order.price} درهم</p>
            <p><strong>طريقة الدفع:</strong> ${order.paymentMethod}</p>
            <p><strong>حساب الدفع:</strong> ${order.paymentAccount}</p>
            <p><strong>الحالة:</strong> ${order.status}</p>
            <p><strong>التاريخ:</strong> ${new Date(order.createdAt).toLocaleString('ar-SA')}</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ تم إرسال البريد الإلكتروني بنجاح');
  } catch (error) {
    console.error('❌ خطأ في إرسال البريد الإلكتروني:', error);
  }
};

module.exports = { sendOrderEmail };
