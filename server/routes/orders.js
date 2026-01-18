const express = require('express');
const Order = require('../models/Order');
const { sendOrderEmail } = require('../utils/email');
const auth = require('../middleware/auth');
const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { quantity, username, price, paymentMethod, paymentAccount } = req.body;

    if (!quantity || !username || !price || !paymentMethod || !paymentAccount) {
      return res.status(400).json({ message: 'جميع الحقول مطلوبة' });
    }

    const order = new Order({
      userId: req.userId,
      quantity,
      username,
      price,
      paymentMethod,
      paymentAccount
    });

    await order.save();
    await order.populate('userId', 'name email');

    // Send email
    await sendOrderEmail(order);

    res.status(201).json({
      message: 'تم إنشاء الطلب بنجاح',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في السيرفر', error: error.message });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في السيرفر', error: error.message });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.userId })
      .populate('userId', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في السيرفر', error: error.message });
  }
});

module.exports = router;
