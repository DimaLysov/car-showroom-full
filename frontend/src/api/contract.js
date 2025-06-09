const BASE_URL = process.env.REACT_APP_PATH_URL_API;


export const getContracts = async () => {
    const response = await fetch(`${BASE_URL}/contract/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных контрактов');
    }
    return await response.json();
  };

export const addContract = async (requestBody) => {
  const response = await fetch(`${BASE_URL}/contract/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error(`Ошибка при добавлении контракта: ${response.statusText}`);
}
  return await response.json();
};

export const updateContract = async (id, requestBody) => {
  const response = await fetch(`${BASE_URL}/contract/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error('Ошибка при обновлении контракта');
  }
  return await response.json();
};

export const deleteContract = async (id) => {
  const response = await fetch(`${BASE_URL}/contract/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Ошибка при удалении контракта');
  }
  return;
};