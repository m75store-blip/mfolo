import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              احصل على <span className="gradient-text">متابعين حقيقيين</span> لانستغرام
            </h1>
            <p className="hero-subtitle">
              خدمة احترافية لزيادة متابعين حسابك على انستغرام بأسعار تنافسية وجودة عالية
            </p>
            <div className="hero-buttons">
              {user ? (
                <Link to="/order" className="btn btn-primary btn-large">
                  إنشاء طلب الآن
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-large">
                    ابدأ الآن
                  </Link>
                  <Link to="/products" className="btn btn-secondary btn-large">
                    عرض الأسعار
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">لماذا نحن؟</h2>
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">🚀</div>
              <h3>تسليم سريع</h3>
              <p>نوفر متابعين في وقت قصير بعد الموافقة على طلبك</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">✅</div>
              <h3>متابعين حقيقيين</h3>
              <p>جميع المتابعين من حسابات حقيقية ونشطة</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">💎</div>
              <h3>أسعار تنافسية</h3>
              <p>أفضل الأسعار في السوق تبدأ من 3 دراهم</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🔒</div>
              <h3>أمان تام</h3>
              <p>معاملات آمنة ومشفرة وحماية كاملة لبياناتك</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">📱</div>
              <h3>دعم فني 24/7</h3>
              <p>فريق دعم متاح على مدار الساعة لمساعدتك</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">⚡</div>
              <h3>سهولة الاستخدام</h3>
              <p>واجهة بسيطة وسهلة للطلب في دقائق</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-preview">
        <div className="container">
          <h2 className="section-title">أسعارنا</h2>
          <div className="pricing-examples">
            <div className="price-example card">
              <div className="price-amount">3 درهم</div>
              <div className="price-quantity">100 متابع</div>
            </div>
            <div className="price-example card">
              <div className="price-amount">30 درهم</div>
              <div className="price-quantity">1,000 متابع</div>
            </div>
            <div className="price-example card">
              <div className="price-amount">250 درهم</div>
              <div className="price-quantity">10,000 متابع</div>
            </div>
          </div>
          <Link to="/products" className="btn btn-primary">
            عرض جميع الأسعار
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
