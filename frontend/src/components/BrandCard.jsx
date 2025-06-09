import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BrandCard.css';

const BrandCard = ({ brand }) => {
  const navigate = useNavigate();
  return (
    <div
      className="brand-card"
      onClick={() => navigate(`/brand/${brand.id}`)}
    >
      <img src={brand.image_url} alt={brand.name} />
      <h3>{brand.name}</h3>
    </div>
  );
};

export default BrandCard;
