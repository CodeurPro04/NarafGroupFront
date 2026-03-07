// src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Construction from './pages/Construction';
import ConstructionDetails from './pages/ConstructionDetails';
import Investment from './pages/Investment';
import InvestmentDetails from './pages/InvestmentDetails';
import HouseModels from './pages/HouseModels';
import HouseModelDetails from './pages/HouseModelDetails';
import Partnership from './pages/Partnership';
import PartnerDetails from './pages/PartnerDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Profile from './pages/Profile';
import Maintenance from './pages/Maintenance';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './index.css';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};


function App() {
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    return <Maintenance launchDate="27 Mars 2026" />;
  }

  return (
    <Router>
      <div className="app min-h-screen flex flex-col">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:uuid" element={<PropertyDetails />} />
            <Route path="/construction" element={<Construction />} />
            <Route path="/construction/:uuid" element={<ConstructionDetails />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/investment/:uuid" element={<InvestmentDetails />} />
            <Route path="/house-models" element={<HouseModels />} />
            <Route path="/house-models/:uuid" element={<HouseModelDetails />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/partners/:uuid" element={<PartnerDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/success" element={<RegisterSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/legal" element={<LegalNotice />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
