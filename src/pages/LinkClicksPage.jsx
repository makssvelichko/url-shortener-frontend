import React from 'react';
import { useParams } from 'react-router-dom';
import ClicksChart from '../components/ClicksChart';
import '../styles/linkClicksPage.css';
import { useNavigate } from 'react-router-dom';

const LinkClicksPage = () => {
  const { short } = useParams();
  const navigate = useNavigate();

  return (
    <section className='page-chart'>
      <nav className="navigate">
        <div className="logo">🔗 URL Shortener</div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Назад
        </button>
      </nav>
      <div className='graph'>
        <h1>
          Графік кліків для посилання:&nbsp;
          <a 
            href={`http://localhost:8000/${short}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {short}
          </a>
        </h1>
        <ClicksChart short={short} />
      </div>
    </section>
  );
};

export default LinkClicksPage;
