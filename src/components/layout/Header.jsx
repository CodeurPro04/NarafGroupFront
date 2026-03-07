import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BadgeDollarSign,
  Briefcase,
  Building2,
  ChevronDown,
  Compass,
  FileText,
  Hammer,
  Handshake,
  Home,
  Landmark,
  LogIn,
  LogOut,
  Menu,
  Newspaper,
  PanelsTopLeft,
  Pickaxe,
  Rocket,
  Search,
  ShieldCheck,
  UserCircle,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { logout } from "../../api/axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
    setOpenDesktopMenu(null);
    setOpenMobileMenu(null);
    setOpenMobileSubmenu(null);
  }, [location.pathname]);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Erreur deconnexion :", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
      setIsLoggingOut(false);
      navigate("/login");
    }
  }, [isLoggingOut, navigate]);

  const initials =
    `${user?.first_name?.charAt(0) || ""}${user?.last_name?.charAt(0) || ""}`.toUpperCase();

  const navGroups = useMemo(
    () => [
      {
        key: "abi",
        path: "/",
        label: "ABI",
        icon: Home,
        summary:
          "Decouvrez l'univers ABI, sa vision, ses agences et l'ecosysteme qui accompagne tous vos projets immobiliers, construction et investissement.",
        children: [
          {
            path: "/",
            label: "Page d'accueil",
            description: "Retrouvez la vitrine principale et les points forts de la plateforme.",
            icon: Home,
          },
          {
            path: "/house-models",
            label: "Plateforme immobiliere",
            description: "Explorez l'offre globale et les parcours disponibles.",
            icon: PanelsTopLeft,
          },
          {
            path: "/house-models",
            label: "Qui sommes-nous ?",
            description: "Comprenez notre vision, nos engagements et notre histoire.",
            icon: Building2,
          },
          {
            path: "/partnership",
            label: "Nos intervenants",
            description: "Identifiez les acteurs et experts mobilises autour de vos projets.",
            icon: UserRound,
          },
          {
            path: "/partnership",
            label: "Nos agences",
            description: "Retrouvez notre reseau et nos points de presence.",
            icon: Landmark,
          },
          {
            path: "/partnership",
            label: "Nos actualites",
            description: "Suivez les nouveautes, annonces et informations importantes.",
            icon: Newspaper,
          },
        ],
      },
      {
        key: "immobilier",
        path: "/properties",
        label: "IMMOBILIER",
        icon: Search,
        summary:
          "Trouvez un bien, valorisez un patrimoine et accedez a une offre immobiliere structuree pour l'achat, la vente et la location.",
        children: [
          {
            path: "/properties",
            label: "Trouver un bien",
            description: "Parcourez les biens disponibles a la vente et a la location.",
            icon: Search,
          },
          {
            path: "/register?role=proprietaire",
            label: "Devenir proprietaire",
            description: "Publiez vos offres et gerez votre espace dedie.",
            icon: Building2,
          },
          {
            path: "/properties?search=acheter",
            label: "Acheter",
            description: "Selectionnez les meilleures opportunites selon vos objectifs.",
            icon: WalletCards,
          },
          {
            path: "/properties?search=vendre",
            label: "Vendre",
            description: "Mettez votre bien sur le marche avec ABI.",
            icon: BadgeDollarSign,
          },
          {
            path: "/properties?search=location",
            label: "Louer",
            description: "Consultez les solutions locatives disponibles.",
            icon: Compass,
          },
        ],
      },
      {
        key: "construction",
        path: "/construction",
        label: "CONSTRUCTION",
        icon: Hammer,
        summary:
          "Construisez, finalisez ou faites evoluer votre projet avec une offre plus complete, lisible et adaptee a chaque etape.",
        children: [
          {
            path: "/construction",
            label: "Nos offres",
            description: "Explorez les principales categories d'offres construction.",
            icon: Hammer,
            children: [
              { path: "/construction?category=terrain-constructible", label: "Terrain constructible" },
              { path: "/construction?category=maison-terrain", label: "Maison + Terrain" },
              { path: "/construction?category=programme-en-cours", label: "Programme en cours" },
            ],
          },
          {
            path: "/house-models",
            label: "Mon projet sur mesure",
            description: "Definissez un projet adapte a vos besoins et a votre budget.",
            icon: Pickaxe,
          },
          {
            path: "/partnership",
            label: "Nos plans",
            description: "Decouvrez des plans et bases de conception exploitables.",
            icon: FileText,
          },
          {
            path: "/partnership",
            label: "Achever ma construction",
            description: "Finalisez, renovez ou transformez un chantier existant.",
            icon: ShieldCheck,
            children: [
              { path: "/construction?category=terrain-constructible", label: "Finir ma construction" },
              { path: "/construction?category=maison-terrain", label: "Renovation & Modification" },
            ],
          },
        ],
      },
      {
        key: "investissement",
        path: "/investment",
        label: "INVESTISSEMENT",
        icon: Briefcase,
        summary:
          "Analysez les opportunites, comprenez les parcours d'investissement et structurez une strategie de placement claire avec ABI.",
        children: [
          {
            path: "/investment",
            label: "Nos offres",
            description: "Accedez aux opportunites d'investissement actuellement ouvertes.",
            icon: Briefcase,
          },
          {
            path: "/partnership",
            label: "Je veux investir",
            description: "Comprenez les avantages, les mecanismes et les parcours ABI.",
            icon: BadgeDollarSign,
            children: [
              { path: "/investment?focus=pourquoi-investir", label: "Pourquoi investir" },
              { path: "/investment?focus=investir-avec-abi", label: "Investir avec ABI" },
              { path: "/investment?focus=premier-investissement", label: "Faire mon premier investissement" },
            ],
          },
          {
            path: "/profile",
            label: "Ou investir",
            description: "Reperez les meilleures zones et les orientations les plus pertinentes.",
            icon: Compass,
            children: [
              { path: "/investment?focus=nos-conseils", label: "Nos conseils" },
              { path: "/investment?focus=meilleurs-investissements", label: "Nos meilleurs investissements" },
            ],
          },
        ],
      },
    ],
    []
  );

  const isLinkActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path.split("?")[0];
  };

  const isGroupActive = (group) =>
    isLinkActive(group.path) ||
    group.children.some((child) => isLinkActive(child.path));

  const activeDesktopGroup =
    navGroups.find((group) => group.key === openDesktopMenu) || null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#e5e7eb] bg-white shadow-[0_2px_14px_rgba(15,23,42,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[86px]">
          <Link to="/" className="flex items-center gap-3 min-w-[260px] shrink-0">
            <img
              src="/images/logonaraf1.jpeg"
              alt="NARAF Immobilier"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex flex-1 items-center justify-center gap-8">
            {navGroups.map((group) => (
              <div
                key={group.key}
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(group.key)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenDesktopMenu((prev) =>
                      prev === group.key ? null : group.key
                    )
                  }
                  className={`flex items-center gap-2 rounded-[8px] px-3 py-2 text-[15px] font-medium transition ${
                    isGroupActive(group)
                      ? "bg-[#eef5ff] text-[#0d63c9]"
                      : "text-[#6f6f6f] hover:bg-[#f7f9fc] hover:text-[#0d63c9]"
                  }`}
                >
                  <group.icon size={16} className="shrink-0" />
                  <span>{group.label}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openDesktopMenu === group.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex min-w-[360px] items-center justify-end gap-4 pl-8">
            <Link
              to="/partnership"
              className="inline-flex items-center gap-2 rounded-[6px] border border-[#d7deea] bg-white px-4 py-3 text-[14px] font-semibold text-[#2f3b4a] transition hover:border-[#0d63c9] hover:text-[#0d63c9]"
            >
              <Handshake size={16} className="shrink-0" />
              <span>Partenaire</span>
            </Link>
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#0d63c9] px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-[#0a56ad]"
              >
                <LogIn size={16} className="shrink-0" />
                Connexion
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-[6px] px-3 py-2 text-sm text-[#374151] hover:bg-white"
                >
                  <div className="flex h-8 w-8 items-center justify-center bg-[#0d63c9] text-white font-semibold">
                    {initials}
                  </div>
                  <span>
                    {user?.first_name} {user?.last_name}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isProfileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 border border-[#dddddd] bg-white py-2 shadow-xl z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="border-b border-[#ededed] px-4 py-3">
                      <p className="text-sm font-semibold">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs text-[#707070]">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm hover:bg-[#f8f8f8]"
                    >
                      <UserCircle size={18} className="mr-2" /> Mon profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      <LogOut size={18} className="mr-2" />
                      {isLoggingOut ? "Deconnexion..." : "Deconnexion"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {activeDesktopGroup && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full border-t border-[#e5e7eb] bg-white shadow-[0_18px_44px_rgba(15,23,42,0.12)]"
          onMouseEnter={() => setOpenDesktopMenu(activeDesktopGroup.key)}
          onMouseLeave={() => setOpenDesktopMenu(null)}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="rounded-[8px] border border-[#e5e7eb] bg-white px-10 py-8">
              <div className="grid min-h-[360px] grid-cols-[300px_minmax(0,1fr)] gap-[72px] items-start">
                <div className="pt-2">
                  <h2 className="text-[18px] font-medium text-[#111111]">
                    {activeDesktopGroup.label}
                  </h2>
                  <p className="mt-10 max-w-[285px] text-[17px] leading-[1.78] text-[#171717]">
                    {activeDesktopGroup.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                  {activeDesktopGroup.children.map((child) => {
                    const Icon = child.icon || activeDesktopGroup.icon;
                    return (
                      <div key={child.label} className="min-w-0">
                        <Link to={child.path} className="group block">
                          <div className="flex items-start gap-4">
                            <span className="mt-[2px] inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[6px] border border-[#bfc3c9] bg-[#f7f7f8] text-[#141414]">
                              <Icon className="h-[16px] w-[16px]" />
                            </span>
                            <div className="min-w-0">
                              <p
                                className={`text-[15px] font-semibold leading-6 transition ${
                                  isLinkActive(child.path)
                                    ? "text-[#0d63c9]"
                                    : "text-[#111111] group-hover:text-[#0d63c9]"
                                }`}
                              >
                                {child.label}
                              </p>
                              <p className="mt-1 max-w-[360px] text-[14px] leading-6 text-[#757575]">
                                {child.description ||
                                  "Accedez a cette rubrique pour explorer les contenus associes."}
                              </p>
                            </div>
                          </div>
                        </Link>

                        {child.children && (
                          <div className="ml-[54px] mt-3 text-[13px] leading-5">
                            {child.children.map((nestedChild, index) => (
                              <span key={`${nestedChild.path}-${nestedChild.label}`}>
                                <Link
                                  to={nestedChild.path}
                                  className={`transition ${
                                    isLinkActive(nestedChild.path)
                                      ? "font-medium text-[#0d63c9]"
                                      : "text-[#666666] hover:text-[#0d63c9]"
                                  }`}
                                >
                                  {nestedChild.label}
                                </Link>
                                {index < child.children.length - 1 && (
                                  <span className="px-1 text-[#9aa0a6]">,</span>
                                )}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}

      {isMenuOpen && (
        <div className="lg:hidden border-t border-[#e5e7eb] bg-white shadow-md">
          <nav className="flex flex-col gap-2 p-4">
            {navGroups.map((group) => (
              <div key={group.key} className="border border-gray-100">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileMenu((prev) =>
                      prev === group.key ? null : group.key
                    )
                  }
                  className={`flex w-full items-center justify-between gap-3 px-3 py-3 text-left ${
                    isGroupActive(group)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <group.icon size={18} />
                    {group.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openMobileMenu === group.key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMobileMenu === group.key && (
                  <div className="border-t border-gray-100 bg-gray-50">
                    {group.children.map((child) =>
                      child.children ? (
                        <div
                          key={child.label}
                          className="border-b border-gray-100 last:border-b-0"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMobileSubmenu((prev) =>
                                prev === child.label ? null : child.label
                              )
                            }
                            className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 hover:bg-white"
                          >
                            {child.label}
                            <ChevronDown
                              size={16}
                              className={`transition-transform ${
                                openMobileSubmenu === child.label
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                          {openMobileSubmenu === child.label && (
                            <div className="pb-2">
                              {child.children.map((nestedChild) => (
                                <Link
                                  key={nestedChild.path}
                                  to={nestedChild.path}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="block px-8 py-2 text-sm text-gray-600 hover:bg-white"
                                >
                                  {nestedChild.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-white"
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}

            {!isAuthenticated ? (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
              >
                <LogIn size={18} /> Connexion
              </button>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2"
                >
                  <UserCircle size={18} /> Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-red-600"
                >
                  <LogOut size={18} /> Deconnexion
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
