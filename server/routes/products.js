const express = require('express');
const router = express.Router();

// Get pricing tiers
router.get('/pricing', (req, res) => {
  const pricingTiers = [];
  
  // Generate pricing tiers from 100 to 50,000
  for (let quantity = 100; quantity <= 50000; quantity += 100) {
    if (quantity <= 1000) {
      pricingTiers.push({
        quantity,
        price: Math.round((quantity / 100) * 3 * 100) / 100 // 3 دراهم لكل 100
      });
    } else if (quantity <= 5000) {
      pricingTiers.push({
        quantity,
        price: Math.round((quantity / 100) * 2.5 * 100) / 100 // 2.5 دراهم لكل 100
      });
    } else if (quantity <= 10000) {
      pricingTiers.push({
        quantity,
        price: Math.round((quantity / 100) * 2 * 100) / 100 // 2 دراهم لكل 100
      });
    } else {
      pricingTiers.push({
        quantity,
        price: Math.round((quantity / 100) * 1.5 * 100) / 100 // 1.5 دراهم لكل 100
      });
    }
  }

  res.json(pricingTiers);
});

module.exports = router;
