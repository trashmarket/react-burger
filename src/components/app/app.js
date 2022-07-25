import React from "react";

import AppHeader from "../../components/app-header/app-header";
import Main from "../../components/main/main";
import { ItemsContext, CardContext } from "../../services/app-contex.js";

function App() {
  const url = "https://norma.nomoreparties.space/api/ingredients";
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cart, setCart] = React.useState(null)
  React.useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        {
          setError(error);
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <>
      <ItemsContext.Provider value={{ items, setItems }}>
        <CardContext.Provider value={{cart, setCart}}>
          <AppHeader />
          {error && <div>{error.message}</div>}
          {!isLoaded ? <div>...Загрузка</div> : <Main />}
        </CardContext.Provider>
      </ItemsContext.Provider>
    </>
  );
}

export default App;
