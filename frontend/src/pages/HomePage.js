import React, { useEffect, useState } from 'react';
import { getBrands } from '../api/brand';
import BrandCard from '../components/BrandCard';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBrands()
      .then(setBrands)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка брендов...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="homepage-container">
      <button className="homepage-contracts-btn main-btn" onClick={() => navigate('/contracts')}>
        Перейти к контрактам
      </button>
      <h1 className="homepage-title">Выберите бренд автомобиля</h1>
      <div className="homepage-brands">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
