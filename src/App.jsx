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
        <main className="flex-grow pt-[108px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/abi/plateforme-immobiliere" element={<AbiRealEstatePlatformPage />} />
            <Route path="/investment/je-veux-investir" element={<AbiInvestPage />} />
            <Route
              path="/investment/ou-investir"
              element={
                <AbiComingSoonPage
                  title="Ou investir est en mise en veille"
                  description="Cette rubrique est temporairement en mise en veille pendant la preparation d'un contenu plus clair pour orienter les decisions d'investissement."
                  accent="blue"
                />
              }
            />
            <Route
              path="/investment/ou-investir/nos-conseils"
              element={
                <AbiComingSoonPage
                  title="Nos conseils sont en mise en veille"
                  description="Cette page est temporairement indisponible le temps de finaliser une version plus utile et mieux structuree des conseils ABI."
                  accent="blue"
                />
              }
            />
            <Route
              path="/investment/ou-investir/meilleurs-investissements"
              element={
                <AbiComingSoonPage
                  title="Cette page est en mise en veille"
                  description="La rubrique sur les meilleurs investissements est temporairement en mise en veille pendant la refonte de son contenu."
                  accent="blue"
                />
              }
            />
            <Route
              path="/investment/je-veux-investir/pourquoi-investir"
              element={
                <AbiComingSoonPage
                  title="Pourquoi investir est en mise en veille"
                  description="Cette page est temporairement en mise en veille le temps de proposer un contenu plus clair, plus pedagogique et mieux structure."
                  accent="blue"
                />
              }
            />
            <Route
              path="/investment/je-veux-investir/investir-avec-abi"
              element={
                <AbiComingSoonPage
                  title="Investir avec ABI est en mise en veille"
                  description="Cette page est temporairement indisponible pendant la refonte de l'experience et la clarification de la methode ABI."
                  accent="blue"
                />
              }
            />
            <Route path="/investment/je-veux-investir/premier-investissement" element={<AbiFirstInvestmentPage />} />
            <Route path="/construction/mon-projet-sur-mesure" element={<AbiCustomConstructionPage />} />
            <Route
              path="/construction/nos-plans"
              element={
                <AbiComingSoonPage
                  title="Nos plans sont en mise en veille"
                  description="Cette page est temporairement en mise en veille pendant la preparation d'une presentation plus claire et plus utile de nos plans."
                  accent="sand"
                />
              }
            />
            <Route
              path="/construction/achever-ma-construction"
              element={
                <AbiComingSoonPage
                  title="Achever ma construction est en mise en veille"
                  description="Cette rubrique revient bientot avec un parcours mieux structure pour finaliser, reprendre ou corriger un chantier existant."
                  accent="sand"
                />
              }
            />
            <Route
              path="/construction/offres/terrain-constructible"
              element={
                <AbiComingSoonPage
                  title="Cette offre est en mise en veille"
                  description="La presentation Terrain constructible est temporairement indisponible le temps de finaliser une version plus claire et plus complete."
                  accent="sand"
                />
              }
            />
            <Route
              path="/construction/offres/maison-terrain"
              element={
                <AbiComingSoonPage
                  title="Cette offre est en mise en veille"
                  description="La presentation Maison + Terrain est temporairement indisponible pendant la preparation d'un contenu plus structure."
                  accent="sand"
                />
              }
            />
            <Route
              path="/construction/offres/programme-en-cours"
              element={
                <AbiComingSoonPage
                  title="Cette offre est en mise en veille"
                  description="La page Programme en cours est temporairement en mise en veille le temps de proposer une lecture plus lisible des projets."
                  accent="sand"
                />
              }
            />
            <Route
              path="/construction/achever/finir-ma-construction"
              element={
                <AbiComingSoonPage
                  title="Finir ma construction est en mise en veille"
                  description="Cette page sera bientot de retour avec un parcours plus clair pour accompagner la finalisation des chantiers."
                  accent="sand"
                />
              }
            />
            <Route
              path="/construction/achever/renovation-modification"
              element={
                <AbiComingSoonPage
                  title="Renovation & Modification est en mise en veille"
                  description="Cette page est temporairement indisponible pendant la refonte de son contenu et de son experience utilisateur."
                  accent="sand"
                />
              }
            />
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
              path="/abi/club-abi-diaspora"
              element={
                <AbiComingSoonPage
                  eyebrow="Club ABI Diaspora"
                  title="Club ABI Diaspora arrive bientot"
                  description="Cette rubrique dediee a la diaspora ABI est actuellement en mise en veille le temps de finaliser une experience plus claire et plus utile."
                  accent="blue"
                />
              }
            />
            <Route
              path="/abi/club-abi"
              element={
                <AbiComingSoonPage
                  eyebrow="Club Pro"
                  title="Club Pro sera disponible bientot"
                  description="La page Club Pro est en mise en veille pendant la preparation d'un contenu plus structure et mieux aligne sur les besoins des professionnels."
                  accent="sand"
                />
              }
            />
            <Route
              path="/abi/nos-actualites"
              element={
                <AbiComingSoonPage
                  eyebrow="Actualites ABI"
                  title="La rubrique actualites est en mise en veille"
                  description="Nous preparons une nouvelle version de cet espace pour proposer des actualites plus lisibles, plus utiles et mieux integrees au parcours ABI."
                  accent="blue"
                />
              }
            />
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
