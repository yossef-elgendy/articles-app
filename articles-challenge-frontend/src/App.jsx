import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './pages/Home/Home';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './styles/button.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NotificationList from './components/NotificationList/NotificationList';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="app">
            <Header />
              <main className='content' >
                <NotificationList />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            <Footer />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
