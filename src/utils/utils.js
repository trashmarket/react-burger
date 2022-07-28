const sort = (item, type) => {
    if (item.type === type) return item;
};

const checkResponse = (response) => {
  if (response.ok) return response.json();
  return Promise.reject(`Ошибка: ${response.status}`);
};

export {sort, checkResponse}