import React, { useState } from 'react';

function VerifyOTP() {
  const [otp, setOTP] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyOTP = (event) => {
    event.preventDefault();

    fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp })
    })
      .then(response => response.json())
      .then(data => {
        if (data.isVerified) {
          setIsVerified(true);
        } else {
          console.error('OTP verification failed');
        }
      })
      .catch(error => console.error(error));
  };

  if (isVerified) {
    return <p>OTP verified successfully!</p>;
  }

  return (
    <form onSubmit={handleVerifyOTP}>
      <label>
        Enter OTP:
        <input type="text" value={otp} onChange={event => setOTP(event.target.value)} />
      </label>
      <button type="submit">Verify OTP</button>
    </form>
  );
}

export default VerifyOTP;
