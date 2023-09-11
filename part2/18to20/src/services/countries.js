import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const getCountries = async () => {
  const request = axios.get(baseUrl + "all");
  return request.then((response) => response.data);
};

const getCountry = async (input) => {
  const request = axios.get(baseUrl + "name/" + input);
  return request.then((response) => response.data);
};

export default {
  getCountry,
  getCountries,
};
