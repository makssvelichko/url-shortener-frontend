import React, { useState, useEffect } from 'react';
import { getUserUrls } from '../services/authService';
import '../styles/allUrls.css';
import { useNavigate } from 'react-router-dom';

const AllUrlsPage = () => {
  const [userUrls, setUserUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUserUrls = async () => {
    try {
      const data = await getUserUrls();
      setUserUrls(data);
      setLoading(false);
    } catch (err) {
      console.error('Помилка при отриманні URL користувача:', err);
      setError('Не вдалося завантажити посилання. Спробуйте пізніше.');
      setLoading(false);
    }
  };

  const formatDate = (isoDateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(isoDateString).toLocaleDateString('uk-UA', options);
  };

  useEffect(() => {
    fetchUserUrls();
  }, []);

  if (loading) {
    return <div className="loading">Завантаження...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="all-urls-container">
        <nav className="navigate">
        <div className="logo">🔗 URL Shortener</div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Назад
        </button>
      </nav>
      <h1 className='h1-allurl'>Всі скорочені посилання</h1>
      {userUrls.length > 0 ? (
        <ul className="urls-list">
          {userUrls.map((url, index) => (
            <li key={index} className="url-item">
              <p><strong>Скорочене посилання:</strong> <a href={`http://localhost:8000/${url.short}`} target="_blank" rel="noopener noreferrer">{url.short}</a></p>
              <p><strong>Дата створення:</strong> {formatDate(url.created_at)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>У вас ще немає скорочених посилань.</p>
      )}
    </div>
  );
};

export default AllUrlsPage;
