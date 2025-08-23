import { useState, useEffect } from "react";
import Country from "./components/Country";
import axios from "axios";

function App() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const MAX_COUNTRIES = 10;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const data = response.data;
        console.log("data", data);
        setCountries(data);
      });
  }, []);

  useEffect(() => {
    if (!countries) {
      return;
    }

    if (selectedCountry) {
      const selectedCountryLowCase = selectedCountry.toLowerCase();
      const foundCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(selectedCountryLowCase)
      );
      console.log("foundCountries", foundCountries.length);
      setSelectedCountries(
        foundCountries.map((foundCountry) => {
          return {
            ...foundCountry,
            isDetailsShown: false,
          };
        })
      );
      return;
    } else {
      setSelectedCountries([]);
    }
  }, [countries, selectedCountry]);

  const handleChange = (event) => {
    const value = event.target.value;
    console.log("value", value);
    setSelectedCountry(event.target.value);
  };

  if (!countries) {
    return null;
  }

  const isOne = selectedCountries.length === 1;
  const isMany =
    selectedCountries.length <= MAX_COUNTRIES && selectedCountries.length > 1;
  const isTooMany = selectedCountries.length > MAX_COUNTRIES;
  const isNo = selectedCountries.length === 0;

  const handleShowClick = (index) => {
    const newSelectedCountries = [...selectedCountries];
    newSelectedCountries[index].isDetailsShown =
      !newSelectedCountries[index].isDetailsShown;

    console.log("newSelectedCountries", newSelectedCountries);

    setSelectedCountries(newSelectedCountries);
  };

  return (
    <div>
      find countries
      <input onChange={handleChange} value={selectedCountry} />
      {isMany &&
        selectedCountries.map((country, index) => (
          <div key={country.name.common}>
            <p>
              {country.name.common}{" "}
              <button onClick={() => handleShowClick(index)}>
                {country.isDetailsShown ? "Hide" : "Show"}
              </button>
            </p>
            {country.isDetailsShown && <Country country={country} />}
          </div>
        ))}
      {isOne && <Country country={selectedCountries[0]} />}
      {isTooMany && (
        <div>
          {`Too many matches (${selectedCountries.length}), specify another filter`}
        </div>
      )}
      {isNo && <div>No matches</div>}
    </div>
  );
}

export default App;
