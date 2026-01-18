import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [pricingTiers, setPricingTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const response = await axios.get('/api/products/pricing');
      // Take sample pricing tiers (not all 500)
      const samples = [
        ...response.data.filter((tier, index) => index % 10 === 0), // Every 10th item
        response.data[response.data.length - 1] // Last item
      ];
      setPricingTiers(samples);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">أسعار متابعين انستغرام</h1>
          <p className="page-subtitle">اختر الكمية التي تناسبك</p>
        </div>

        <div className="pricing-table">
          <div className="table-header">
            <div className="table-cell">الكمية</div>
            <div className="table-cell">السعر</div>
            <div className="table-cell">السعر لكل 100</div>
            <div className="table-cell">العمليات</div>
          </div>

          {pricingTiers.map((tier, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">
                <strong>{tier.quantity.toLocaleString('ar-SA')}</strong> متابع
              </div>
              <div className="table-cell price-cell">
                <span className="price-value">{tier.price.toLocaleString('ar-SA')}</span> درهم
              </div>
              <div className="table-cell">
                {(tier.price / (tier.quantity / 100)).toFixed(2)} درهم
              </div>
              <div className="table-cell">
                {user ? (
                  <Link
                    to={`/order?quantity=${tier.quantity}&price=${tier.price}`}
                    className="btn btn-primary btn-small"
                  >
                    اطلب الآن
                  </Link>
                ) : (
                  <Link to="/login" className="btn btn-secondary btn-small">
                    تسجيل الدخول
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="custom-order">
          <h2>كمية مخصصة؟</h2>
          <p>يمكنك اختيار أي كمية من 100 إلى 50,000 متابع</p>
          {user ? (
            <Link to="/order" className="btn btn-primary">
              إنشاء طلب مخصص
            </Link>
          ) : (
            <Link to="/login" className="btn btn-secondary">
              تسجيل الدخول للطلب
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
