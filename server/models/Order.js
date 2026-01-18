const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productType: {
    type: String,
    default: 'instagram_followers'
  },
  quantity: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['In Review', 'Redeem', 'Rejected'],
    default: 'In Review'
  },
  paymentMethod: {
    type: String,
    enum: ['PayPal', 'Attijariwafa Bank'],
    required: true
  },
  paymentAccount: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
