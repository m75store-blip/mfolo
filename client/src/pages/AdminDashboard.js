import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}`, { status });
      fetchOrders();
      alert('تم تحديث حالة الطلب بنجاح');
    } catch (error) {
      alert(error.response?.data?.message || 'حدث خطأ أثناء تحديث حالة الطلب');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'In Review': { class: 'badge-review', text: 'قيد المراجعة' },
      'Redeem': { class: 'badge-redeem', text: 'تم الموافقة' },
      'Rejected': { class: 'badge-rejected', text: 'مرفوض' }
    };
    const statusInfo = statusMap[status] || { class: 'badge-review', text: status };
    return <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">لوحة التحكم الإدارية</h1>
          <p className="page-subtitle">إدارة الطلبات والمستخدمين</p>
        </div>

        <div className="admin-stats">
          <div className="stat-card card">
            <div className="stat-icon">📦</div>
            <div className="stat-value">{orders.length}</div>
            <div className="stat-label">إجمالي الطلبات</div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">⏳</div>
            <div className="stat-value">{orders.filter(o => o.status === 'In Review').length}</div>
            <div className="stat-label">قيد المراجعة</div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{orders.filter(o => o.status === 'Redeem').length}</div>
            <div className="stat-label">مقبولة</div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">❌</div>
            <div className="stat-value">{orders.filter(o => o.status === 'Rejected').length}</div>
            <div className="stat-label">مرفوضة</div>
          </div>
        </div>

        <div className="admin-filters">
          <button 
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >
            جميع الطلبات
          </button>
          <button 
            onClick={() => setFilter('In Review')}
            className={`filter-btn ${filter === 'In Review' ? 'active' : ''}`}
          >
            قيد المراجعة
          </button>
          <button 
            onClick={() => setFilter('Redeem')}
            className={`filter-btn ${filter === 'Redeem' ? 'active' : ''}`}
          >
            مقبولة
          </button>
          <button 
            onClick={() => setFilter('Rejected')}
            className={`filter-btn ${filter === 'Rejected' ? 'active' : ''}`}
          >
            مرفوضة
          </button>
        </div>

        <div className="admin-orders card">
          <h2>الطلبات</h2>
          
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <p>لا توجد طلبات</p>
            </div>
          ) : (
            <div className="admin-orders-list">
              {filteredOrders.map((order) => (
                <div key={order._id} className="admin-order-item">
                  <div className="order-header">
                    <div>
                      <strong>طلب #{order._id.slice(-8)}</strong>
                      <span className="user-name"> - {order.userId?.name || 'مستخدم'}</span>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="order-info-grid">
                    <div className="info-item">
                      <label>اسم المستخدم:</label>
                      <span>{order.username}</span>
                    </div>
                    <div className="info-item">
                      <label>الكمية:</label>
                      <span>{order.quantity.toLocaleString('ar-SA')} متابع</span>
                    </div>
                    <div className="info-item">
                      <label>السعر:</label>
                      <span>{order.price.toLocaleString('ar-SA')} درهم</span>
                    </div>
                    <div className="info-item">
                      <label>طريقة الدفع:</label>
                      <span>{order.paymentMethod}</span>
                    </div>
                    <div className="info-item">
                      <label>حساب الدفع:</label>
                      <span>{order.paymentAccount}</span>
                    </div>
                    <div className="info-item">
                      <label>البريد الإلكتروني:</label>
                      <span>{order.userId?.email || 'غير متوفر'}</span>
                    </div>
                    <div className="info-item">
                      <label>التاريخ:</label>
                      <span>
                        {new Date(order.createdAt).toLocaleDateString('ar-SA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  {order.status === 'In Review' && (
                    <div className="order-actions">
                      <button
                        onClick={() => updateOrderStatus(order._id, 'Redeem')}
                        className="btn btn-primary"
                      >
                        الموافقة
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order._id, 'Rejected')}
                        className="btn btn-danger"
                      >
                        الرفض
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
