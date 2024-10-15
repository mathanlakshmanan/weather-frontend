import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import CityImg from './assets/City.png';
import Cloudy from './assets/cloudy.png';
import Coordinate from './assets/coordinate.png';
import Humidity from './assets/humidity.png';
import Visibility from './assets/visibility.png';
import Windy from './assets/windy.png';
import Pressure from './assets/pressure.png';
import Sun from './assets/sun.png';
import { Circles } from 'react-loader-spinner';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [loader, setLoader] = useState(false);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();

  useEffect(() => {
    document.body.style.backgroundImage = "linear-gradient(327deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(9,9,121,1) 100%)";    
  }, []);

  const weatherFun = async () => {
    
    setWeather([]);
    const err = document.getElementById("error") || null;
    if (city.length === 0) {
      err.innerText = "Please Enter City First !!!";
      return;
    }
    setLoader(true);
    err.innerText = "";
    const result = await axios.post("https://weather-backend-sv6y.onrender.com/weather", {
      city: city,
    });

    setWeather(result.data.weather);
    console.log("mathan", result.data.weather);
    
    if(result){
      setLoader(false);
      const sunrisedata = new Date(parseInt(result.data.weather.sys.sunrise+'000'));
      let sunrise = sunrisedata.toLocaleTimeString();
      setSunrise(sunrise);
      const sunsetdata = new Date(parseInt(result.data.weather.sys.sunset+'000'));
      let sunset = sunsetdata.toLocaleTimeString();
      setSunset(sunset);
    }
  };

  return (
   <>
      <div className="bg-dark p-5 text-white">
        <h1 className="mb-3 text-center">Weather Checker</h1>
        <div className="row justify-content-around mb-5">
          <div className="w-50 mobileInput mb-3">
            <input
              type="text"
              className="form-control"
              id="weatherInput"
              onChange={(e) => setCity(e.target.value)}
              alt="weatherInput"
              placeholder="Enter The Your City"
            />
            <div id="error"></div>
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
        {loader ?
        <div className='d-flex justify-content-around'>
          <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
        </div>
        : 
        Object.keys(weather).length > 0 ? <>

<div className='row'>
{weather?.weather?.map((data) => {
              return (
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                <div key={data?.id} className="card-border">
                  <div className="">
                    <img
                      src={`https://openweathermap.org/img/wn/${data?.icon}@2x.png`}
                      className="h-100 w-100"
                      alt='weatherimage'
                    />
                  </div>
                  <div className="align-content-center">
                    <div>{data?.main}</div>
                    <div>{data?.description}</div>
                    <h4>{((weather.main.temp - 32) * 5/9).toFixed(0)}℃</h4>
                  </div>
                </div>
                </div>
              );
            })}
        </div>

        <hr />

        <div className="row">
          
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
          <div className="card-border">
            <div className="">
              <img src={CityImg} className="h-100 w-100" alt="city" />
              <div className="mt-1">City</div>
            </div>
            <div className="">
              <div>{weather?.name} </div>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img
                  src={Sun}
                  className="h-100 w-100"
                  alt="windy"
                />
                <div className="">Sunrise</div>
              </div>
              <div className="">
                <div>{sunrise}</div>
              </div>
            </div>
          </div>


          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img
                  src={Sun}
                  className="h-100 w-100"
                  alt="windy"
                />
                <div className="">Sunset</div>
              </div>
              <div className="">
                <div>{sunset}</div>
              </div>
            </div>
          </div>
          
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img src={Windy} className="h-100 w-100" alt="windy" />
                <div className="">Windy</div>
              </div>
              <div className="">
                <div>Speed: {weather?.wind?.speed} km/h</div>
                <div>degree: {weather?.wind?.deg} ℃</div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img src={Cloudy} className="h-100 w-100" alt="windy" />
                <div className="">Clouds</div>
              </div>
              <div className="">
                <div>Cloud Cover: {weather?.clouds?.all} %</div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img
                  src={Humidity}
                  className="h-100 w-100"
                  alt="windy"
                />
                <div className="">Humidity</div>
              </div>
              <div className="">
                <div>Humidity: {weather?.main?.humidity} %</div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img
                  src={Coordinate}
                  className="h-100 w-100"
                  alt="windy"
                />
                <div className="">Coordinate</div>
              </div>
              <div className="">
                <div>Latitude: {weather?.coord?.lat} </div>
                <div>Longitude: {weather?.coord?.lon} </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img
                  src={Visibility}
                  className="h-100 w-100"
                  alt="windy"
                />
                <div className="">Visibility</div>
              </div>
              <div className="">
                <div>{weather?.visibility / 1000} KM</div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-border">
              <div className="mb-2">
                <img
                  src={Pressure}
                  className="h-100 w-100"
                  alt="windy"
                />
                <div className="">Pressure</div>
              </div>
              <div className="">
                <div>{weather?.main?.pressure} hPa</div>
              </div>
            </div>
          </div>

          
        </div> </>: ""}
      </div>
    </>
  );
}

export default App;
