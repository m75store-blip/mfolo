import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'In Review': { class: 'badge-review', text: 'قيد المراجعة' },
      'Redeem': { class: 'badge-redeem', text: 'تم الموافقة' },
      'Rejected': { class: 'badge-rejected', text: 'تم رفض الطلب' }
    };
    const statusInfo = statusMap[status] || { class: 'badge-review', text: status };
    return <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">حسابي</h1>
          <p className="page-subtitle">إدارة طلباتي وبياناتي</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar card">
            <div className="user-info">
              <div className="user-avatar">👤</div>
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
            </div>
            <div className="sidebar-actions">
              <Link to="/order" className="btn btn-primary">
                إنشاء طلب جديد
              </Link>
            </div>
          </div>

          <div className="profile-main">
            <div className="orders-section card">
              <div className="section-header">
                <h2>طلباتي</h2>
                <span className="orders-count">({orders.length})</span>
              </div>

              {orders.length === 0 ? (
                <div className="empty-state">
                  <p>لا توجد طلبات بعد</p>
                  <Link to="/order" className="btn btn-primary">
                    إنشاء أول طلب
                  </Link>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order._id} className="order-item">
                      <div className="order-header">
                        <div className="order-id">
                          <strong>طلب #{order._id.slice(-8)}</strong>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      
                      <div className="order-details">
                        <div className="detail-row">
                          <span className="detail-label">اسم المستخدم:</span>
                          <span className="detail-value">{order.username}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">الكمية:</span>
                          <span className="detail-value">{order.quantity.toLocaleString('ar-SA')} متابع</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">السعر:</span>
                          <span className="detail-value">{order.price.toLocaleString('ar-SA')} درهم</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">طريقة الدفع:</span>
                          <span className="detail-value">{order.paymentMethod}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">التاريخ:</span>
                          <span className="detail-value">
                            {new Date(order.createdAt).toLocaleDateString('ar-SA', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        {order.status === 'Rejected' && (
                          <div className="rejection-message">
                            تم رفض الطلب
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
