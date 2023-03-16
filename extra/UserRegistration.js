import React, { useState } from 'react';

function UserRegistration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegistration = (event) => {
    event.preventDefault();

    const userData = { username, password, email };

    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleRegistration}>
      <label>
        Username:
        <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

export default UserRegistration;
