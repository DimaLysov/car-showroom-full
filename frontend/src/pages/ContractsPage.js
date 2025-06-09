import React, { useEffect, useState } from 'react';
import { getContracts, updateContract, deleteContract } from '../api/contract';
import { useNavigate } from 'react-router-dom';
import '../styles/ContractsPage.css';


const PAYMENT_METHODS = [
  { value: 'cash', label: 'наличкой' },
  { value: 'card', label: 'картой' },
  { value: 'crypt', label: 'криптой' },
];

const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editPayment, setEditPayment] = useState('card');
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = () => {
    setLoading(true);
    getContracts()
      .then(setContracts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  const handleEdit = (contract) => {
    setEditId(contract.id);
    setEditPayment(contract.payment_method);
  };

  const handleUpdate = async (id) => {
    setEditLoading(true);
    try {
      await updateContract(id, { payment_method: editPayment });
      setEditId(null);
      fetchContracts();
    } catch (e) {
      alert('Ошибка при обновлении: ' + e.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить контракт?')) return;
    setDeleteLoading(id);
    try {
      await deleteContract(id);
      fetchContracts();
    } catch (e) {
      alert('Ошибка при удалении: ' + e.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) return <div>Загрузка контрактов...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="contracts-container">
      <button className="contracts-back-btn main-btn" onClick={() => navigate('/')}>Вернуться к главному меню</button>
      <h1 className="contracts-title">Список контрактов</h1>
      <div className="contracts-list">
        {contracts.map(contract => (
          <div key={contract.id} className="contract-card">
            <img src={contract.image_url} alt={contract.model} />
            <h3>{contract.model}</h3>
            <div>Цена: {contract.price} ₽</div>
            <div>Дата: {new Date(contract.date).toLocaleString()}</div>
            {editId === contract.id ? (
              <div className="payment-select-box">
                <select value={editPayment} onChange={e => setEditPayment(e.target.value)}>
                  {PAYMENT_METHODS.map(method => (
                    <option key={method.value} value={method.value}>{method.label}</option>
                  ))}
                </select>
                <div className="payment-btns">
                  <button onClick={() => handleUpdate(contract.id)} disabled={editLoading}>
                    {editLoading ? 'Сохранение...' : 'Сохранить'}
                  </button>
                  <button onClick={() => setEditId(null)} disabled={editLoading}>Отмена</button>
                </div>
              </div>
            ) : (
              <>
                <div>Способ оплаты: {PAYMENT_METHODS.find(m => m.value === contract.payment_method)?.label || contract.payment_method}</div>
                <button onClick={() => handleEdit(contract)}>
                  Изменить
                </button>
                <button onClick={() => handleDelete(contract.id)} disabled={deleteLoading === contract.id}>
                  {deleteLoading === contract.id ? 'Удаление...' : 'Удалить'}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractsPage;
