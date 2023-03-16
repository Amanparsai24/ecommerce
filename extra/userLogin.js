import React, { useState } from 'react';

function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    const loginData = { username, password };

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default UserLogin;
