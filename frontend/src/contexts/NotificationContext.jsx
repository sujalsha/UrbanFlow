// src/contexts/NotificationContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { fetchNotificationsApi } from '../api/notificationsApi';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await fetchNotificationsApi(1); // Example user ID
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
