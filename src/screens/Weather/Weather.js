import { Typography, CssBaseline, Box, Toolbar, Grid, TextField, Button } from "@mui/material";
import React, {useState} from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import axios from "axios";
import DayForecast from "./DayForecast";
import HourlyForecast from "./HourlyForecast";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Weather = () => {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [showHourlyData, setShowHourlyData] = useState(false);
  const [hourlyData, setHourlyData] = useState([]);
  const APIKEY = 'cfe00c1bf18f3badfb25075206369878';

  const handleSearch = async () => {
   
   
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKEY}`)
      .then((response) => {
        console.log('AAAAAAAAA', response.data)
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    }  

  const groupForecastByDay = () => {
    const groupedForecast = {};

    if (weatherData && weatherData.list) {
      weatherData.list.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0];

        if (!groupedForecast[date]) {
          groupedForecast[date] = [];
        }

        groupedForecast[date].push(forecast);
      });
    }

    return groupedForecast;
  };

  const groupedForecast = groupForecastByDay();

    return (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Topbar />
          <Sidebar />
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <Typography variant="h5" fontWeight='bold'>
                Weather
            </Typography>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 2 }}
            >
          <Grid item>
            <TextField
              label="Enter City"
              variant="outlined"
              value={city}
              size="small"
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleSearch}>
              Get Weather
            </Button>
          </Grid>
        </Grid>
        <Box
          component='div'
          sx={{
            mt: 4,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {weatherData && groupedForecast && (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
                Weather Forecast for {weatherData.city.name},{" "}
                {weatherData.city.country}
              </Typography>
              <Typography>
                For Upcoming 5 days
              </Typography>
              {showHourlyData && (
                <>
                <div style={{display: 'flex', position: 'absolute', left: '23vw', top: '53vh', color: '#5B50FF', cursor: 'pointer'}} onClick={()=> setShowHourlyData(false)}>
                <ArrowBackIcon/>
                <Typography>
                  Back to Daily Forecast
                </Typography>
                </div>
             
              <Typography>
                Hourly forecast for every 3 hr of {hourlyData[0].dt_txt.split(" ")[0]}
              </Typography>
              </>
              )}
              <Grid container spacing={2} sx={{ mt: 2 }}>
              {showHourlyData? (
                    <HourlyForecast forecasts={hourlyData}/>
                  ) : (
                    <>
                {Object.keys(groupedForecast).map((date) => (
                    <DayForecast
                    key={date}
                    date={date}
                    forecasts={groupedForecast[date]}
                    setShowHourlyData={setShowHourlyData}
                    setHourlyData={setHourlyData}
                  />
                  
                ))}
                </>
                )}
              </Grid>
            </>
          )}
        </Box>
          </Box>
        </Box>
    )
}

export default Weather