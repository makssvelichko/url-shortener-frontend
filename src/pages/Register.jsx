import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(username, password, fullName, setError, navigate);
  };

  return (
    <div>
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логін:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Повне ім'я:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default Register;
