// src/components/pages/Profile.jsx
import React from 'react';
import Sidebar from '../layout/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import '../../assets/styles/colors.css';


const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <Sidebar />
      <main>
        <h1>Profile</h1>
        {user ? (
          <div className="profile-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Loading profile information...</p>
        )}
      </main>
    </div>
  );
};

export default Profile;
