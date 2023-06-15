import axios from "axios";

const API = "b3f08617ea95ee74d6b368cf78cf8a50";
const fetchData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
  return await axios.get(url);
};
export { fetchData };
