import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap/dist/js/bootstrap.bundle.js";
import './App.css';
import './responsive.css';
import './index.css';

import WebsiteRoutes from './Website/WebsiteRoutes';
import OpenRoutes from './OpenRoutes';
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          {/* {localStorage.getItem('loginType') && localStorage.getItem('loginType') === 'admin' ? <AdminRoutes /> : (localStorage.getItem('loginType') && localStorage.getItem('loginType') === 'user' ? <WebsiteRoutes /> : <OpenRoutes />)} */}
          {(localStorage.getItem('loginType') && localStorage.getItem('loginType') === 'user' ? <WebsiteRoutes /> : <OpenRoutes />)}
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
