import { useEffect, useState } from "react";
import { getCountryByCode, getSelectedCountryCode } from "../utils/countries";

// Suit le pays choisi dans la navbar (localStorage + evenement "country:changed"),
// pour permettre aux pages de liste de se rafraichir sans recharger toute la page.
export const useSelectedCountry = () => {
  const [countryCode, setCountryCode] = useState(() => getSelectedCountryCode());

  useEffect(() => {
    const handleChange = (event) => {
      setCountryCode(event?.detail ?? getSelectedCountryCode());
    };
    window.addEventListener("country:changed", handleChange);
    return () => window.removeEventListener("country:changed", handleChange);
  }, []);

  return {
    countryCode,
    country: getCountryByCode(countryCode),
  };
};

export default useSelectedCountry;
