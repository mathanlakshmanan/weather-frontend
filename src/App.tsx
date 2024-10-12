import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage = "url('bg.jpg')";
  }, [weather]);

  const weatherFun = async () => {
    
    setWeather([]);
    const err = document.getElementById("error") || null;
    if (city.length == 0) {
      err.innerText = "Please Enter City First !!!";
      return;
    }
    setLoader(true);
    err.innerText = "";
    const result = await axios.post("https://weather-backend-sv6y.onrender.com/weather", {
      city: city,
    });

    setWeather(result.data.weather);

    if(result){
      setLoader(false);
    }
  };

  return (
    <>
      <div className="bg-dark p-5 text-white">
        <h1 className="mb-3 text-center">Weather Checker</h1>
        <div className="row justify-content-around mb-5">
          <div className="w-50">
            <input
              type="text"
              className="form-control"
              id="weatherInput"
              onChange={(e) => setCity(e.target.value)}
              alt="weatherInput"
              placeholder="Enter The Your City"
            />
            <p id="error"></p>
          </div>
          <div className="text-center">
            <input
              type="submit"
              name="weather"
              id="weather"
              onClick={() => weatherFun()}
              className="btn btn-primary"
            />
          </div>
        </div>

        {Object.keys(weather).length > 0 ? <>
        <div className="text-center">
          <div className="card-border">
            <div className="mb-2">
              <img src="../public/City.png" className="h-150 w-100" alt="windy" />
              <p className="">City</p>
            </div>
            <div className="">
              <p>{weather?.name} </p>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          
            {weather?.weather?.map((data: any) => {
              return (
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                <div key={data?.id} className="card-border">
                  <div className="">
                    <img
                      src={`https://openweathermap.org/img/wn/${data?.icon}@2x.png`}
                      className="h-150 w-100"
                    />
                  </div>
                  <div className="align-content-center">
                    <p>{data?.main}</p>
                    <p>{data?.description}</p>
                  </div>
                </div>
                </div>
              );
            })}
          
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img src="../public/windy.png" className="h-100 w-100" alt="windy" />
                <p className="">Windy</p>
              </div>
              <div className="">
                <p>Speed: {weather?.wind?.speed} km/h</p>
                <p>degree: {weather?.wind?.deg} ℃</p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img src="../public/cloudy.png" className="h-100 w-100" alt="windy" />
                <p className="">Clouds</p>
              </div>
              <div className="">
                <p>Cloud Cover: {weather?.clouds?.all} %</p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img
                  src="../public/humidity.png"
                  className="h-100 w-100"
                  alt="windy"
                />
                <p className="">Humidity</p>
              </div>
              <div className="">
                <p>Humidity: {weather?.main?.humidity} %</p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img
                  src="../public/coordinate.png"
                  className="h-100 w-100"
                  alt="windy"
                />
                <p className="">Coordinate</p>
              </div>
              <div className="">
                <p>Latitude: {weather?.coord?.lat} </p>
                <p>Longitude: {weather?.coord?.lon} </p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img
                  src="../public/visibility.png"
                  className="h-150 w-100"
                  alt="windy"
                />
                <p className="">Visibility</p>
              </div>
              <div className="">
                <p>{weather?.visibility / 1000} KM</p>
              </div>
            </div>
          </div>
        </div> </>: ""}
      </div>
    </>
  );
}

export default App;
