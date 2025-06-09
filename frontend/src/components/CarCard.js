import React, { useState } from 'react';
import { addContract } from '../api/contract';
import '../styles/CarCard.css';

const PAYMENT_METHODS = [
  'наличкой',
  'картой',
  'криптой',
];

const CarCard = ({ car }) => {
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showSelect, setShowSelect] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('наличкой');

  const handleAddClick = () => {
    setShowSelect(true);
    setSuccess(false);
    setError(null);
  };

  const handleAddContract = async () => {
    setAdding(true);
    setError(null);
    setSuccess(false);
    try {
      await addContract({ car: car.id, payment_method: paymentMethod });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
      setShowSelect(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="car-card">
      <img src={car.image_url} alt={car.model} />
      <h3>{car.model}</h3>
      <div>Год: {car.year}</div>
      <div>Цена: {car.price} ₽</div>
      {showSelect ? (
        <div className="payment-select-box">
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
            {PAYMENT_METHODS.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
          <div className="payment-btns">
            <button onClick={handleAddContract} disabled={adding}>
              {adding ? 'Добавление...' : 'Подтвердить'}
            </button>
            <button onClick={() => setShowSelect(false)} disabled={adding}>Отмена</button>
          </div>
        </div>
      ) : (
        <button onClick={handleAddClick} disabled={adding}>
          {'Добавить в контракт'}
        </button>
      )}
      {success && <div className="success">Машина добавлена в контракт!</div>}
      {error && <div className="error">Ошибка: {error}</div>}
    </div>
  );
};

export default CarCard;
