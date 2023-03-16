import React, { useState } from 'react';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const passwordData = { currentPassword, newPassword };

    fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwordData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleChangePassword}>
      <label>
        Current Password:
        <input type="password" value={currentPassword} onChange={event => setCurrentPassword(event.target.value)} />
      </label>
      <label>
        New Password:
        <input type="password" value={newPassword} onChange={event => setNewPassword(event.target.value)} />
      </label>
      <label>
        Confirm New Password:
        <input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
      </label>
      <button type="submit">Change Password</button>
    </form>
  );
}

export default ChangePassword;
