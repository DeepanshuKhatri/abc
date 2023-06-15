import { SearchOutlined, CloudOutlined } from "@ant-design/icons";
import { Image, Input, Button, Divider } from "antd";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import "./root.css";
import { fetchData } from "./services/auth.service.js";

const { Text } = Typography;
const date = new Date().toLocaleDateString();
const Root = () => {
  const [city, setCity] = useState("Chandigarh");
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState("");
  const [bg, setBg] = useState(weather.icon);


  function setCityValue(e) {
    setValue(e.target.value);
  }
  function click() {
    setCity(value);
    setValue("");
  }

  useEffect(() => {
    try {
      fetchData(city)
        .then((res) => {
          console.log(res);
          setWeather({
            desc: res.data.weather[0].description,
            icon: res.data.weather[0].icon,
            main:res.data.weather[0].main,
            name:res.data.name,
            humidity: res.data.main.humidity,
            temp: res.data.main.temp,
            temp_max: res.data.main.temp_max,
            temp_min: res.data.main.temp_min,
          });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [city]);
  return (
    <>
      <div className="root">
        <div className="blur"></div>
        <div className="main">
          <div className="image" >
            <div className="display">
            <Text className="city-name">
                {weather.name}
              </Text>
              <Text className="date">
                {new String(weather.desc).toUpperCase()}
              </Text>

              <Text className="date" level={2}>
                {date}
              </Text>
            </div>
          </div>
          <div className="data">
            <div className="upperinput">
              <Input
                className="input"
                allowClear={true}
                value={value}
                prefix={<CloudOutlined />}
                onChange={setCityValue}
              />
              <Button
                className="button"
                onClick={click}
                icon={<SearchOutlined />}
              />
            </div>
            <Divider className="hr" />
            <div className="details">
              <Text className="text">Humidity : {weather.humidity}%</Text>
              <Text className="text">
                Temperature : {Math.round(weather.temp - 273)}℃
              </Text>
              <Text className="text">
                Temp. Max : {Math.round(weather.temp_max - 273)}℃
              </Text>
              <Text className="text">
                Temp. Min : {Math.round(weather.temp_min - 273)}℃
              </Text>
            </div>
            <Divider className="hr" />
            <div className="icon">
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Root;
