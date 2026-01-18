const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

// Get all orders (Admin only)
router.get('/orders', auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في السيرفر', error: error.message });
  }
});

// Update order status (Admin only)
router.put('/orders/:id', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['In Review', 'Redeem', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'حالة غير صحيحة' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    ).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    res.json({
      message: 'تم تحديث حالة الطلب بنجاح',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في السيرفر', error: error.message });
  }
});

module.exports = router;
