import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { login as loginApi } from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "L'email est requis";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await loginApi(formData.email, formData.password);

      // succès, redirection
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors({ global: "Email ou mot de passe incorrect" });
      } else if (error.response?.status === 403) {
        setErrors({
          global:
            error.response?.data?.message ||
            "Votre compte est inactif et en attente d'activation.",
        });
      } else {
        setErrors({
          global:
            error.response?.data?.message ||
            "Erreur serveur, veuillez reessayer plus tard.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <img
            src="/images/logonew.png"
            alt="NARAF"
            className="mx-auto h-40 w-auto object-contain"
          />
          <h1 className="text-2xl font-bold">Connexion</h1>
        </div>

        {errors.global && (
          <div className="mb-4 text-red-600 flex items-center gap-2">
            <AlertCircle size={18} />
            {errors.global}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                placeholder="votre@email.com"
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                placeholder="Mot de passe"
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full pl-10 pr-10 py-3 border rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl flex justify-center items-center gap-2"
          >
            {isLoading ? (
              "Connexion..."
            ) : (
              <>
                <LogIn size={18} />
                Se connecter
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/register" className="text-blue-600">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

