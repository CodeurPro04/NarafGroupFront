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
import AbiAboutPage from './pages/AbiAboutPage';
import AbiRealEstatePlatformPage from './pages/AbiRealEstatePlatformPage';
import AbiInvestPage from './pages/AbiInvestPage';
import AbiFirstInvestmentPage from './pages/AbiFirstInvestmentPage';
import AbiCustomConstructionPage from './pages/AbiCustomConstructionPage';
import AbiComingSoonPage from './pages/AbiComingSoonPage';
import AbiSubmenuPage from './pages/AbiSubmenuPage';
import ShowcaseArticlesList from './pages/ShowcaseArticlesList';
import ShowcaseArticleDetails from './pages/ShowcaseArticleDetails';
import { submenuPages } from './data/submenuPages';
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
            <Route path="/abi/plateforme-immobiliere" element={<AbiRealEstatePlatformPage />} />
            <Route path="/investment/je-veux-investir" element={<AbiInvestPage />} />
            <Route path="/investment/je-veux-investir/premier-investissement" element={<AbiFirstInvestmentPage />} />
            <Route path="/construction/mon-projet-sur-mesure" element={<AbiCustomConstructionPage />} />
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
            <Route path="/articles/:sectionKey" element={<ShowcaseArticlesList />} />
            <Route path="/articles/:sectionKey/:articleSlug" element={<ShowcaseArticleDetails />} />
            <Route path="/abi/qui-sommes-nous" element={<AbiAboutPage />} />
            <Route
              path="/abi/club"
              element={
                <AbiComingSoonPage
                  eyebrow="ABI Club"
                  title="ABI Club arrive bientot"
                  description="Une page dediee aux avantages, services et privileges de l'univers ABI Club est en preparation."
                  accent="blue"
                />
              }
            />
            <Route
              path="/abi/parrainage"
              element={
                <AbiComingSoonPage
                  eyebrow="Parrainage ABI"
                  title="Mon espace de parrainage sera disponible bientot"
                  description="Le parcours de parrainage ABI est en cours de conception pour offrir une experience plus simple, plus lisible et plus efficace."
                  accent="sand"
                />
              }
            />
            {submenuPages.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={<AbiSubmenuPage page={page} />}
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
