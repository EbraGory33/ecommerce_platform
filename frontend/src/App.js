// src/App.js
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import './App.css';
import { store } from "./store/store.js";
import { Provider } from "react-redux";

function App() {

  return (
    <Router>
      <Provider store={store}>
        <AppRoutes />
      </Provider>  
    </Router>
  );
}

export default App;
