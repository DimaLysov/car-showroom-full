import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarsByBrand } from '../api/car';
import CarCard from '../components/CarCard';
import '../styles/BrandCarsPage.css';

const BrandCarsPage = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCarsByBrand(brandId)
      .then(setCars)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [brandId]);

  if (loading) return <div>Загрузка автомобилей...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="brandcars-container">
      <button className="brandcars-back-btn main-btn" onClick={() => navigate('/')}>
        Вернуться к главному меню
      </button>
      <h1 className="brandcars-title">Автомобили бренда</h1>
      <div className="brandcars-cars">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default BrandCarsPage;
