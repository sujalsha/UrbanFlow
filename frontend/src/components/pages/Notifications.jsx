// src/components/pages/Notifications.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../layout/Sidebar';
import { useNotifications } from '../../hooks/useNotifications';
import '../../assets/styles/colors.css';


const Notifications = () => {
  const { notifications, fetchNotifications } = useNotifications();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications().finally(() => setLoading(false));
  }, []);

  return (
    <div className="notifications-container">
      <Sidebar />
      <main>
        <h1>Notifications</h1>
        {loading ? (
          <p>Loading notifications...</p>
        ) : notifications.length > 0 ? (
          notifications.map((note) => (
            <div key={note.id} className="notification-card">
              <h4>{note.title}</h4>
              <p>{note.message}</p>
            </div>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </main>
    </div>
  );
};

export default Notifications;
