const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'غير مصرح لك بالوصول لهذه الصفحة' });
    }
    
    next();
  } catch (error) {
    res.status(403).json({ message: 'غير مصرح لك بالوصول' });
  }
};
