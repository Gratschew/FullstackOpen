import { useState, useEffect } from "react";
import axios from "axios";
import countryService from "./services/countries";
const api_key = import.meta.env.VITE_API_KEY;
const WeatherInfo = ({ weather }) => {
  if (weather == null) return null;
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p>Temperature {weather.current.temp_c} Celsius</p>
      <img src={weather.current.condition.icon}></img>
      <p>Wind {(weather.current.wind_kph * 5) / 8} m/s</p>
    </div>
  );
};

const CountryInfo = ({ country }) => {
  console.log(api_key);
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    fetchWeather(country.name.common);
  }, []);

  const fetchWeather = (name) => {
    const api_url =
      "https://api.weatherapi.com/v1/current.json?q=" +
      name +
      "&key=" +
      api_key;

    axios
      .get(api_url)
      .then((response) => {
        // Check the status code to ensure the request was successful (status code 200)
        if (response.status === 200) {
          const data = response.data;
          setWeather(data);
          console.log("Data from the API:", data);
        } else {
          console.error(
            "API request failed with status code:",
            response.status
          );
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };
  return (
    <>
      <div>
        <p>Capital {country.capital[0]} </p>
        <p>Area {country.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png}></img>
      </div>
      <WeatherInfo weather={weather}></WeatherInfo>
    </>
  );
};

const CountryContainer = ({ countries, handleShowCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countries.length == 1) {
    return <CountryInfo country={countries[0]} />;
  }
  return (
    <div>
      {countries.map((country, index) => (
        <p key={index}>
          {country.name.common}{" "}
          <button
            onClick={() => {
              handleShowCountry(country);
            }}
          >
            show
          </button>
        </p>
      ))}
    </div>
  );
};

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      Find countries <input onChange={handleFilterChange} />
    </div>
  );
};
const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    countryService.getCountries().then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [filter, countries]);

  const handleFilterChange = async (event) => {
    console.log("event.target.value");
    setFilter(event.target.value);
  };
  const handleShowCountry = (country) => {
    setFilter(country.name.common);
  };
  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />

      <CountryContainer
        countries={filteredCountries}
        handleShowCountry={handleShowCountry}
      />
    </div>
  );
};

export default App;
