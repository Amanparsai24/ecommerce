import React, { useState } from 'react';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = (event) => {
    event.preventDefault();

    fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then(response => response.json())
      .then(data => {
        if (data.isEmailSent) {
          setIsEmailSent(true);
        } else {
          console.error('Failed to send password reset email');
        }
      })
      .catch(error => console.error(error));
  };

  if (isEmailSent) {
    return <p>Password reset instructions sent to your email!</p>;
  }

  return (
    <form onSubmit={handleResetPassword}>
      <label>
        Enter your email address:
        <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
      </label>
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default ResetPassword;
