import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const { languages, name, capital, area, flags, latlng } = country;
  const [lat, long] = latlng;
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [weather, setWeather] = useState(null);

  const icon = weather ? weather.weather?.[0].icon ?? "" : "";

  console.log("icon", icon);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log("WETHER", response.data);
      });
  }, [lat, long, api_key]);

  console.log("Props country", country);
  const languagesKeys = Object.keys(languages ?? {});
  return (
    <div
      style={{ backgroundColor: "lightgray", margin: "10px", padding: "10px" }}
    >
      <h1>{name?.common}</h1>
      <div>{`Capital ${capital?.[0] ?? ""}`}</div>
      <div>{`Area ${area ?? 0}`}</div>
      <h2>Languages</h2>
      <ul>
        {languagesKeys.map((languageKey) => (
          <li key={languageKey}>{languages[languageKey]}</li>
        ))}
      </ul>
      <img src={flags?.png ?? ""} alt="flag" />
      {weather && (
        <>
          <h2>{`Weather in ${capital}`}</h2>{" "}
          <p>{`Temperature ${weather.main.temp}`}</p>
          {icon && (
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
          )}
          <p>{`Wind ${weather.wind.speed} m/sec`}</p>
        </>
      )}
    </div>
  );
};

export default Country;
