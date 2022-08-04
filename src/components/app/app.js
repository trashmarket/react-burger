import AppHeader from "../../components/app-header/app-header";
import Main from "../../components/main/main";
import { Provider } from "react-redux";
import { store } from '../../services/store'

function App() {
  return (
    <Provider store={store}>
      <AppHeader />
      <Main />
    </Provider>
  );
}

export default App;
