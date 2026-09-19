import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Globe,
  Building,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Shield,
  ChevronDown,
  Home,
  HardHat,
  TrendingUp } from
"lucide-react";
import { register } from "../api/axios";
import { AFRICAN_COUNTRIES, getSelectedCountryCode, setSelectedCountryCode } from "../utils/countries";

const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (score <= 2) return { level: "Faible", color: "red", percent: 40 };
    if (score <= 3) return { level: "Moyen", color: "yellow", percent: 70 };
    return { level: "Fort", color: "green", percent: 100 };
  };

  const strength = getStrength();

  return (
    <div className="mt-2 space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600">Force du mot de passe</span>
        <span
          className={`font-semibold ${
          strength.color === "red" ?
          "text-red-600" :
          strength.color === "yellow" ?
          "text-yellow-600" :
          "text-green-600"}`
          }>

          {strength.level}
        </span>
      </div>
      <div className="w-full bg-gray-200 h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
          strength.color === "red" ?
          "bg-red-500" :
          strength.color === "yellow" ?
          "bg-yellow-500" :
          "bg-green-500"}`
          }
          style={{ width: `${strength.percent}%` }} />

      </div>
    </div>);

};

const UserTypeCard = ({ type, isSelected, onSelect }) =>
<button
  type="button"
  onClick={() => onSelect(type.value)}
  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:scale-[1.02] ${
  isSelected ?
  `border-${type.color}-600 bg-${type.color}-50 shadow-lg` :
  "border-gray-200 hover:border-gray-300 hover:shadow-md"}`
  }>

    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div
        className={`p-3 rounded-xl ${
        isSelected ?
        `bg-${type.color}-100 text-${type.color}-600` :
        "bg-gray-100 text-gray-600"}`
        }>

          {type.icon}
        </div>
      </div>

      <div>
        <h3
        className={`text-lg font-semibold ${
        isSelected ? `text-${type.color}-900` : "text-gray-900"}`
        }>

          {type.label}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
      </div>
    </div>
  </button>;


const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [manualUserType, setManualUserType] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: getSelectedCountryCode() || "CI",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    agency: "",
    terms: false
  });
  const [interests, setInterests] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const queryUserType = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get("role");
    const roleToUserType = {
      proprietaire: "owner",
      owner: "owner",
      agent: "agent",
      visiteur: "visitor",
      visitor: "visitor"
    };

    return roleToUserType[role] || null;
  }, [location.search]);

  const userType = manualUserType || queryUserType || "visitor";

  useEffect(() => {
    const noticeText = location.state?.messageText;
    if (!noticeText) return;

    setMessage({
      type: location.state?.messageType || "info",
      text: noticeText
    });

    navigate(location.pathname + location.search, { replace: true, state: {} });
  }, [location.pathname, location.search, location.state, navigate]);

  const userTypes = [
  {
    value: "visitor",
    label: "Visiteur",
    icon: <User size={24} />,
    description: "Consulter les biens et sauvegarder vos favoris",
    color: "blue"
  },
  {
    value: "owner",
    label: "Propriétaire",
    icon: <Building size={24} />,
    description: "Publier et gérer vos propriétés",
    color: "emerald"
  },
  {
    value: "agent",
    label: "Agent",
    icon: <Briefcase size={24} />,
    description: "Professionnel de l'immobilier",
    color: "purple"
  }];


  const validateForm = () => {
    const newErrors = {};

    // Validation prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Le prénom doit contenir au moins 2 caractères";
    }

    // Validation nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Le nom doit contenir au moins 2 caractères";
    }

    // Validation email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    // Validation téléphone
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^[+]?[0-9\s()-]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Format de téléphone invalide";
    }

    if (!formData.countryCode) {
      newErrors.countryCode = "Le pays est requis";
    }

    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 caractères";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir des minuscules";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir des majuscules";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir des chiffres";
    }

    // Validation confirmation mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmez votre mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    // Validation conditions générales
    if (!formData.terms) {
      newErrors.terms = "Vous devez accepter les conditions";
    }

    // Validation intérêts (visiteur)
    if (userType === "visitor" && interests.length === 0) {
      newErrors.interests = "Sélectionnez au moins un centre d'intérêt";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setMessage({ type: "", text: "" });

    // Validation du formulaire
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      setMessage({
        type: "error",
        text: "Veuillez corriger les erreurs du formulaire"
      });
      return;
    }

    try {
      // Mapper userType vers les valeurs attendues par Laravel
      const roleMapping = {
        visitor: "visiteur",
        owner: "proprietaire",
        agent: "agent"
      };

      // Préparer les données pour l'API Laravel
      const registrationData = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        country_code: formData.countryCode,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: roleMapping[userType],
        ...(userType === "visitor" && interests.length > 0 ? { interests } : {}),
      };

      // Appel API avec la fonction register qui gère CSRF
      const response = await register(registrationData);

      // Vérifier le succès
      if (response.success) {
        const requiresActivation =
        response.data?.requires_activation ||
        response.data?.user?.is_active === false;
        if (requiresActivation) {
          if (isMaintenanceMode) {
            navigate("/", { replace: true });
            return;
          }
          navigate(
            `/register/success?role=${encodeURIComponent(
              roleMapping[userType]
            )}`,
            { replace: true }
          );
          return;
        }

        setMessage({
          type: "success",
          text: "Inscription reussie ! Redirection..."
        });

        // Redirection vers la page d'accueil apres 1.5s
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      } else {
        setMessage({
          type: "error",
          text: response.message || "Une erreur s'est produite"
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

      // Gestion des erreurs de validation Laravel (422)
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const serverErrors = {};
        const laravelErrors = error.response.data.errors;

        // Mapper les erreurs Laravel vers les champs du formulaire
        const errorMapping = {
          first_name: "firstName",
          last_name: "lastName",
          email: "email",
          phone: "phone",
          password: "password",
          license_number: "licenseNumber",
          agency: "agency",
          role: "role",
          interests: "interests"
        };

        Object.keys(laravelErrors).forEach((key) => {
          const frontendKey = errorMapping[key] || key;
          serverErrors[frontendKey] = laravelErrors[key][0];
        });

        setErrors(serverErrors);
        setMessage({
          type: "error",
          text: "Veuillez corriger les erreurs signalées"
        });
      }
      // Erreur générale
      else if (error.response?.data?.message) {
        setMessage({
          type: "error",
          text: error.response.data.message
        });
      }
      // Erreur réseau ou autre
      else if (error.message) {
        setMessage({
          type: "error",
          text: "Erreur de connexion. Vérifiez votre connexion internet."
        });
      } else {
        setMessage({
          type: "error",
          text: "Erreur lors de l'inscription. Veuillez réessayer."
        });
      }

      console.error("Erreur inscription:", error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "countryCode") {
      setSelectedCountryCode(value);
    }

    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Effacer le message d'erreur général
    if (message.type === "error") {
      setMessage({ type: "", text: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center py-20">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-32 h-32">

            <img
              src="/images/logonaraf.png"
              alt="Naraf Groupe logo"
              className="h-14 w-auto object-contain" />

          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            Rejoignez-nous
          </h1>
          <p className="text-gray-600">Créez votre compte selon votre profil</p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Sélectionnez votre profil
          </h2>
          <p className="text-gray-600 mb-6">
            Choisissez le type de compte qui correspond à vos besoins
          </p>

          {userType !== "visitor" &&
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Votre compte sera activé par un administrateur avant votre première connexion.
            </div>
          }


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userTypes.map((type) =>
            <UserTypeCard
              key={type.value}
              type={type}
              isSelected={userType === type.value}
              onSelect={setManualUserType} />

            )}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-2xl p-8 border border-gray-200">
          {/* Message de succès/erreur */}
          {message.text &&
          <div
            className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
            message.type === "success" ?
            "bg-green-50 border border-green-200" :
            message.type === "info" ?
            "bg-blue-50 border border-blue-200" :
            "bg-red-50 border border-red-200"}`
            }>

              {message.type === "success" ?
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" /> :
            message.type === "info" ?
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" /> :

            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            }
              <p
              className={`text-sm font-medium ${
              message.type === "success" ?
              "text-green-800" :
              message.type === "info" ?
              "text-blue-800" :
              "text-red-800"}`
              }>

                {message.text}
              </p>
            </div>
          }

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Votre prénom"
                      value={formData.firstName}
                      onChange={(e) =>
                      handleChange("firstName", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-200 outline-none transition-all ${
                      errors.firstName ?
                      "border-red-500 focus:border-red-500" :
                      "border-gray-200 focus:border-blue-500 hover:border-gray-300"}`
                      }
                      disabled={isLoading}
                      autoFocus />

                    {errors.firstName &&
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    }
                  </div>
                  {errors.firstName &&
                  <p className="mt-2 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  }
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-200 outline-none transition-all ${
                      errors.lastName ?
                      "border-red-500 focus:border-red-500" :
                      "border-gray-200 focus:border-blue-500 hover:border-gray-300"}`
                      }
                      disabled={isLoading} />

                    {errors.lastName &&
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    }
                  </div>
                  {errors.lastName &&
                  <p className="mt-2 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  }
                </div>
              </div>
            </div>

            {/* Coordonnées */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-200 outline-none transition-all ${
                    errors.email ?
                    "border-red-500 focus:border-red-500" :
                    "border-gray-200 focus:border-blue-500 hover:border-gray-300"}`
                    }
                    disabled={isLoading} />

                  {errors.email &&
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  }
                </div>
                {errors.email &&
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                }
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="+225 01 23 45 67 89"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-200 outline-none transition-all ${
                    errors.phone ?
                    "border-red-500 focus:border-red-500" :
                    "border-gray-200 focus:border-blue-500 hover:border-gray-300"}`
                    }
                    disabled={isLoading} />

                  {errors.phone &&
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  }
                </div>
                {errors.phone &&
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                }
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pays de rattachement
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={formData.countryCode}
                    onChange={(e) => handleChange("countryCode", e.target.value)}
                    className={`w-full appearance-none pl-12 pr-10 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-200 outline-none transition-all bg-white truncate ${
                    errors.countryCode ?
                    "border-red-500 focus:border-red-500" :
                    "border-gray-200 focus:border-blue-500 hover:border-gray-300"}`
                    }
                    disabled={isLoading}>
                    {AFRICAN_COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.countryCode &&
                <p className="mt-2 text-sm text-red-600">{errors.countryCode}</p>
                }
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sécurité du compte
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 8 caractères"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-200 outline-none transition-all ${
                      errors.password ?
                      "border-red-500 focus:border-red-500" :
                      "border-gray-200 focus:border-blue-500 hover:border-gray-300"}`
                      }
                      disabled={isLoading} />

                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}>

                      {showPassword ?
                      <EyeOff className="h-5 w-5 text-gray-400" /> :

                      <Eye className="h-5 w-5 text-gray-400" />
                      }
                    </button>
                  </div>
                  <PasswordStrength password={formData.password} />
                  {errors.password &&
                  <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  }
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmez votre mot de passe"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                      handleChange("confirmPassword", e.target.value)
                      }
                      className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-200 outline-none transition-all ${
                      errors.confirmPassword ?
                      "border-red-500 focus:border-red-500" :
                      "border-gray-200 focus:border-blue-500 hover:border-gray-300"}`
                      }
                      disabled={isLoading} />

                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
                      onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}>

                      {showConfirmPassword ?
                      <EyeOff className="h-5 w-5 text-gray-400" /> :

                      <Eye className="h-5 w-5 text-gray-400" />
                      }
                    </button>
                  </div>
                  {errors.confirmPassword &&
                  <p className="mt-2 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  }
                </div>
              </div>
            </div>

            {/* Intérêts — visible uniquement pour les visiteurs */}
            {userType === "visitor" && (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Quels sont vos centres d&apos;intérêt ? <span className="text-blue-600">*</span>
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Sélectionnez au moins un domaine — nous personnaliserons votre expérience.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: "immobilier",    label: "Immobilier",    desc: "Acheter, vendre ou louer un bien",            icon: Home,     color: "blue" },
                    { value: "construction",  label: "Construction",  desc: "Construire ou rénover un projet",             icon: HardHat,  color: "amber" },
                    { value: "investissement",label: "Investissement",desc: "Investir et faire fructifier son capital",    icon: TrendingUp, color: "emerald" },
                  ].map((interest) => {
                    const selected = interests.includes(interest.value);
                    const toggle = () => setInterests(prev =>
                      selected ? prev.filter(i => i !== interest.value) : [...prev, interest.value]
                    );
                    const Icon = interest.icon;
                    const iconColorClass =
                      interest.color === "blue" ? "text-blue-600"
                      : interest.color === "amber" ? "text-amber-600"
                      : "text-emerald-600";
                    return (
                      <button
                        key={interest.value}
                        type="button"
                        onClick={toggle}
                        className={`relative p-4 border-2 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] ${
                          selected
                            ? interest.color === "blue"    ? "border-blue-500 bg-blue-50"
                            : interest.color === "amber"   ? "border-amber-500 bg-amber-50"
                            : "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {selected && (
                          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                            <CheckCircle size={12} className="text-white" />
                          </span>
                        )}
                        <Icon size={24} className={`mb-2 ${iconColorClass}`} />
                        <p className="text-sm font-semibold text-gray-900">{interest.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{interest.desc}</p>
                      </button>
                    );
                  })}
                </div>
                {interests.length === 0 && errors.interests && (
                  <p className="text-sm text-red-600">{errors.interests}</p>
                )}
              </div>
            )}

            {/* Terms */}
            <div className="flex items-start">
              <label className="flex items-start cursor-pointer group">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => handleChange("terms", e.target.checked)}
                    className="sr-only"
                    disabled={isLoading} />

                  <div
                    className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${
                    formData.terms ?
                    "bg-blue-600 border-blue-600 group-hover:bg-blue-700 group-hover:border-blue-700" :
                    "border-gray-300 group-hover:border-gray-400"}`
                    }>
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-700">
                  J'accepte les{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors">

                    Conditions Générales
                  </Link>{" "}
                  et la{" "}
                  <Link
                    to="/privacy"
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors">

                    Politique de Confidentialité
                  </Link>
                </span>
              </label>
            </div>
            {errors.terms &&
            <p className="mt-2 text-sm text-red-600">{errors.terms}</p>
            }

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group">

              {isLoading ?
              <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
                  Création du compte...
                </> :

              <>
                  <Shield size={20} />
                  Créer mon compte {userType === "visitor" && "Visiteur"}
                  {userType === "owner" && "Propriétaire"}
                  {userType === "agent" && "Agent"}
                </>
              }
            </button>
          </form>

          {/* Divider */}
          <div className="my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">
                  Déjà un compte ?
                </span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-block w-full py-3.5 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 font-semibold transition-all">

              Se connecter à NARAF
            </Link>
          </div>
        </div>
      </div>
    </div>);

};

export default Register;
