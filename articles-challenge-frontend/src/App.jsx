import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotificationList from './components/NotificationList/NotificationList';
import Home from './pages/Home/Home';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MyProfilePage from './pages/MyProfilePage/MyProfilePage';
import './styles/button.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
                  <Route path="/profile" element={<MyProfilePage />} />
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
