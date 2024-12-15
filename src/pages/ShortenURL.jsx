import React, { useState, useEffect } from 'react';
import { shortenUrl, getUserUrls, getUserName } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../styles/shortenURL.css';

const ShortenURL = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [userUrls, setUserUrls] = useState([]);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Будь ласка, введіть URL');
      return;
    }

    setError('');
    setShortenedUrl('');

    try {
      const data = await shortenUrl(url);
      setShortenedUrl(data.short);
      fetchUserUrls();  // Оновлення списку URL-адрес після створення нового посилання
    } catch (err) {
      console.error('Детальна помилка:', err);
      setError(err.response?.data?.message || err.message || 'Щось пішло не так');
    }
  };

  const fetchUserUrls = async () => {
    try {
      const data = await getUserUrls();  // Отримуємо URL-адреси тільки для поточного користувача
      console.log('Отримані URL:', data);
      setUserUrls(data);  // Зберігаємо лише посилання поточного користувача
    } catch (err) {
      console.error('Помилка при отриманні URL користувача:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await getUserName();
        setUserName(user.full_name);
      } catch (error) {
        console.error('Не вдалося отримати ім\'я користувача:', error);
      }
    };

    fetchUserName();
    fetchUserUrls();  // Оновлюємо список посилань при кожному заході на сторінку
  }, []);

  const handleViewAll = () => {
    navigate('/all-urls');
  };

  return (
    <div className="shorten-url-container">
      <nav className="navigate">
        <div className="logo">🔗 URL Shortener</div>
        <div className="langandexit">
          <div className="language-switch">
            <span role="img" aria-label="language"></span>
            {userName ? `Привіт, ${userName}` : ''}
          </div>
          <div onClick={handleLogout} className="exit-button">EXIT</div>
        </div>
      </nav>
  
      <div className="main-content">
        <div className="shorten-box">
          <h1>
            Створіть своє коротке <span>посилання</span> <span>🔗</span>
          </h1>
          <form onSubmit={handleSubmit} className="shorten-form">
            <input
              type="text"
              placeholder="Введіть URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`shorten-input ${error ? 'input-error' : ''}`}
            />
            <button type="submit" className="shorten-button">
              СКОРОТИТИ ⚡
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
          {shortenedUrl && (
            <div className="success-message">
              Ваше коротке посилання:{' '}
              <a
                href={`http://localhost:8000/${shortenedUrl}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {shortenedUrl}
              </a>
            </div>
          )}
          <p className="info-text">
            Скорочення URL-посилань — це інструмент, завдяки якому ваш вміст виглядає професійно.
          </p>
        </div>
  
        <div className="user-urls">
          <h2>Ваші скорочені посилання:</h2>
          {userUrls.length > 0 ? (
            <ul>
              {userUrls.slice(0, 3).map((url, index) => (
                <li key={index}>
                  <p><strong>Скорочене посилання:</strong> <a href={`http://localhost:8000/${url.short}`} target="_blank" rel="noopener noreferrer">{url.short}</a></p>
                </li>
              ))}
            </ul>
          ) : (
            <p>У вас ще немає скорочених посилань</p>
          )}
          {userUrls.length >= 0 && (
            <button className="toggle-button" onClick={handleViewAll}>
              Показати всі...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortenURL;
