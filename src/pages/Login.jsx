import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import axios from "axios"
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setErrors({});

  const newErrors = {};

  if (!formData.email.trim()) {
    newErrors.email = "L'email est requis";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Format d'email invalide";
  }

  if (!formData.password) {
    newErrors.password = "Le mot de passe est requis";
  } else if (formData.password.length < 6) {
    newErrors.password = "Minimum 6 caractères";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setIsLoading(false);
    return;
  }

  // 🔥 APPEL AXIOS
  try {
    const response = await axios.post(
      "http://localhost:8000/api/login",
      {
        email: formData.email,
        password: formData.password
      }
    );

    console.log("Login success:", response.data);

    // Optionnel : stocker l'utilisateur
    localStorage.setItem("user", JSON.stringify(response.data.user));

    setIsLoading(false);
    navigate("/");

  } catch (error) {
    setIsLoading(false);

    if (error.response) {
      // Erreurs Laravel
      if (error.response.status === 401) {
        setErrors({ global: "Email ou mot de passe incorrect" });
      } else if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ global: "Erreur serveur" });
      }
    } else {
      setErrors({ global: "Impossible de contacter le serveur" });
    }
  }
};

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-fade-in">
        {/* Header */}
        <div className="text-center py-20">
          <Link to="/" className="inline-flex items-center justify-center w-20 h-20 rounded-2xl">
            <img
              src="/images/logonaraf.png"
              alt="NARAF Immobilier"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Content de vous revoir
          </h1>
          <p className="text-gray-600">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
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
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full pl-12 pr-10 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-200 outline-none transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  }`}
                  autoFocus
                />
                {errors.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-200 outline-none transition-all ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => handleChange('remember', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${
                    formData.remember 
                      ? 'bg-blue-600 border-blue-600 group-hover:bg-blue-700 group-hover:border-blue-700' 
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}>
                    {formData.remember && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-700">
                  Se souvenir de moi
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Se connecter
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </>
              )}
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
                  Pas encore de compte ?
                </span>
              </div>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <Link 
              to="/register" 
              className="inline-block w-full py-3.5 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 rounded-xl font-semibold transition-all"
            >
              Créer un compte NARAF
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            En vous connectant, vous acceptez nos{' '}
            <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Conditions d'utilisation
            </Link>{' '}
            et notre{' '}
            <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;