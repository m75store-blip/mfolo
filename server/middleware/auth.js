const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'غير مصرح لك بالوصول' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'المستخدم غير موجود' });
    }

    req.userId = user._id;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'رمز الوصول غير صحيح' });
  }
};
