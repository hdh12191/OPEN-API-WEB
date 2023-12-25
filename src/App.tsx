import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
