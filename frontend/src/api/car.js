const BASE_URL = process.env.REACT_APP_PATH_URL_API;

export const getCarsByBrand = async (id) => {
    const response = await fetch(`${BASE_URL}/car/by-brand/${id}/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных автомобилей по бренду');
    }
    return await response.json();
  };