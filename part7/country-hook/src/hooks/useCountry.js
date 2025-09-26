import { useEffect, useState } from "react";
import axios from "axios";

export const useCountry = (text) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    if (!text) {
      return;
    }
    const path = `https://studies.cs.helsinki.fi/restcountries/api/name/${text}`;

    const get = async () => {
      try {
        const result = await axios.get(path);
        console.log("data", result.data, text);
        setCountry({ ...result, found: true });
      } catch {
        setCountry({ data: { found: false } });
      }
    };

    get();
  }, [text]);

  return country;
};
