import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [quantity, setQuantity] = useState(100);
  const [username, setUsername] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [price, setPrice] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const qty = searchParams.get('quantity');
    const prc = searchParams.get('price');
    if (qty && prc) {
      setQuantity(parseInt(qty));
      setPrice(parseFloat(prc));
    } else {
      calculatePrice(quantity);
    }
  }, []);

  const calculatePrice = (qty) => {
    let calculatedPrice;
    if (qty <= 1000) {
      calculatedPrice = (qty / 100) * 3;
    } else if (qty <= 5000) {
      calculatedPrice = (qty / 100) * 2.5;
    } else if (qty <= 10000) {
      calculatedPrice = (qty / 100) * 2;
    } else {
      calculatedPrice = (qty / 100) * 1.5;
    }
    setPrice(Math.round(calculatedPrice * 100) / 100);
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);
    if (qty >= 100 && qty <= 50000) {
      setQuantity(qty);
      calculatePrice(qty);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username.trim() || !username.startsWith('@')) {
      setError('يرجى إدخال اسم المستخدم بصيغة @username');
      setLoading(false);
      return;
    }

    if (!paymentAccount.trim()) {
      setError('يرجى إدخال حساب الدفع');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/orders', {
        quantity,
        username: username.trim(),
        price,
        paymentMethod,
        paymentAccount: paymentAccount.trim()
      });

      alert('تم إنشاء الطلب بنجاح! سيتم مراجعته قريباً.');
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'حدث خطأ أثناء إنشاء الطلب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">إنشاء طلب جديد</h1>
          <p className="page-subtitle">املأ المعلومات التالية لإنشاء طلبك</p>
        </div>

        <div className="order-form-container">
          <form onSubmit={handleSubmit} className="order-form card">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="quantity">الكمية (100 - 50,000 متابع)</label>
              <input
                type="number"
                id="quantity"
                className="input"
                value={quantity}
                onChange={handleQuantityChange}
                min="100"
                max="50000"
                step="100"
                required
              />
              <div className="quantity-helpers">
                <button type="button" onClick={() => { setQuantity(100); calculatePrice(100); }} className="qty-btn">100</button>
                <button type="button" onClick={() => { setQuantity(1000); calculatePrice(1000); }} className="qty-btn">1,000</button>
                <button type="button" onClick={() => { setQuantity(5000); calculatePrice(5000); }} className="qty-btn">5,000</button>
                <button type="button" onClick={() => { setQuantity(10000); calculatePrice(10000); }} className="qty-btn">10,000</button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">اسم المستخدم في انستغرام</label>
              <input
                type="text"
                id="username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">طريقة الدفع</label>
              <select
                id="paymentMethod"
                className="input"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="PayPal">PayPal (للدول الأخرى)</option>
                <option value="Attijariwafa Bank">Attijariwafa Bank (للمغرب)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="paymentAccount">
                {paymentMethod === 'PayPal' ? 'البريد الإلكتروني المستخدم في PayPal' : 'رقم الحساب المصرفي'}
              </label>
              <input
                type="text"
                id="paymentAccount"
                className="input"
                value={paymentAccount}
                onChange={(e) => setPaymentAccount(e.target.value)}
                placeholder={paymentMethod === 'PayPal' ? 'email@example.com' : '5417554000635989'}
                required
              />
            </div>

            <div className="payment-info">
              <h3>معلومات الدفع:</h3>
              {paymentMethod === 'PayPal' ? (
                <div className="payment-details">
                  <p><strong>PayPal:</strong> mohamedaitlhaj302@gmail.com</p>
                </div>
              ) : (
                <div className="payment-details">
                  <p><strong>Attijariwafa Bank:</strong> 5417554000635989</p>
                </div>
              )}
            </div>

            <div className="order-summary card">
              <h3>ملخص الطلب</h3>
              <div className="summary-row">
                <span>الكمية:</span>
                <strong>{quantity.toLocaleString('ar-SA')} متابع</strong>
              </div>
              <div className="summary-row">
                <span>السعر الإجمالي:</span>
                <strong className="total-price">{price.toLocaleString('ar-SA')} درهم</strong>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
              {loading ? 'جاري إنشاء الطلب...' : 'إنشاء الطلب'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
