import { BrowserRouter } from "react-router-dom";
import './App.css';
import './responsive.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminRoutes from './Admin/AdminRoutes';
import WebsiteRoutes from './Website/WebsiteRoutes';
import OpenRoutes from './OpenRoutes';
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          {localStorage.getItem('loginType') && localStorage.getItem('loginType') === 'admin' ? <AdminRoutes /> : (localStorage.getItem('loginType') && localStorage.getItem('loginType') === 'user' ? <WebsiteRoutes /> : <OpenRoutes />)}
          {/* <OpenRoutes /> */}
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
