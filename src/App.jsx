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
import AbiPlaceholderPage from './pages/AbiPlaceholderPage';
import AbiAboutPage from './pages/AbiAboutPage';
import AbiComingSoonPage from './pages/AbiComingSoonPage';
import ShowcaseArticlesList from './pages/ShowcaseArticlesList';
import ShowcaseArticleDetails from './pages/ShowcaseArticleDetails';
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
            <Route path="/abi/nos-actualites" element={<AbiPlaceholderPage title="Nos actualites" />} />
            <Route path="/abi/nos-intervenants" element={<AbiPlaceholderPage title="Nos intervenants" />} />
            <Route path="/abi/nos-agences" element={<AbiPlaceholderPage title="Nos agences" />} />
            <Route path="/construction/mon-projet-sur-mesure" element={<AbiPlaceholderPage title="Mon projet sur mesure" />} />
            <Route path="/construction/nos-plans" element={<AbiPlaceholderPage title="Nos plans" />} />
            <Route path="/construction/achever-ma-construction" element={<AbiPlaceholderPage title="Achever ma construction" />} />
            <Route path="/construction/offres/terrain-constructible" element={<AbiPlaceholderPage title="Terrain constructible" />} />
            <Route path="/construction/offres/maison-terrain" element={<AbiPlaceholderPage title="Maison + Terrain" />} />
            <Route path="/construction/offres/programme-en-cours" element={<AbiPlaceholderPage title="Programme en cours" />} />
            <Route path="/construction/achever/finir-ma-construction" element={<AbiPlaceholderPage title="Finir ma construction" />} />
            <Route path="/construction/achever/renovation-modification" element={<AbiPlaceholderPage title="Renovation & Modification" />} />
            <Route path="/investment/je-veux-investir" element={<AbiPlaceholderPage title="Je veux investir" />} />
            <Route path="/investment/ou-investir" element={<AbiPlaceholderPage title="Ou investir" />} />
            <Route path="/investment/je-veux-investir/pourquoi-investir" element={<AbiPlaceholderPage title="Pourquoi investir" />} />
            <Route path="/investment/je-veux-investir/investir-avec-abi" element={<AbiPlaceholderPage title="Investir avec ABI" />} />
            <Route path="/investment/je-veux-investir/premier-investissement" element={<AbiPlaceholderPage title="Faire mon premier investissement" />} />
            <Route path="/investment/ou-investir/nos-conseils" element={<AbiPlaceholderPage title="Nos conseils" />} />
            <Route path="/investment/ou-investir/meilleurs-investissements" element={<AbiPlaceholderPage title="Nos meilleurs investissements" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
